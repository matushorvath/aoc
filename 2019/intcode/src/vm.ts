import * as os from 'os';

interface Op {
    oc: number;
    mds: number[];
};

export class Vm {
    constructor(private id: number, mem: { [addr: string]: bigint }) {
        this.mem = { ...mem };
        this.ip = BigInt(0);
        this.rb = BigInt(0);
    }

    private ip: bigint;
    private mem: { [addr: string]: bigint };
    private rb: bigint;

    private getMem = (addr: bigint) => {
        const addrString = `${addr}`;
        let val = this.mem[addrString];
        if (val === undefined) {
            this.mem[addrString] = val = BigInt(0);
        }
        return val;
    };

    private setMem = (addr: bigint, val: bigint) => {
        const addrString = `${addr}`;
        this.mem[addrString] = val;
    };

    private getOp = () => {
        const ocn = Number(this.getMem(this.ip));
        const oc = ocn % 100;
        const mds = [100, 1000, 10000].map(x => Math.trunc(ocn / x) % 10);

        return { oc, mds };
    };

    private getParam = (o: Op, idx: number) => {
        switch (o.mds[idx]) {
            case 0: { // position mode
                const addr = this.getMem(this.ip + BigInt(idx + 1));
                const val = this.getMem(addr);
                //console.log(this.id, `G [${addr}] -> ${val}`);
                return val;
            }
            case 1: { // immediate mode
                return this.getMem(this.ip + BigInt(idx + 1));
            }
            case 2: { // relative mode
                const raddr = this.getMem(this.ip + BigInt(idx + 1));
                const addr = this.rb + raddr;
                const val = this.getMem(addr);
                //console.log(this.id, `G [rb + ${raddr} = ${addr}] -> ${val}`);
                return val;
            }
            default:
                throw new Error(`mode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)} idx ${idx}`);
        }
    };

    private setParam = (o: Op, idx: number, val: bigint) => {
        switch (o.mds[idx]) {
            case 0: { // position mode
                const addr = this.getMem(this.ip + BigInt(idx + 1));
                this.setMem(addr, val);
                //console.log(this.id, `S [${addr}] <- ${val}`);
                break;
            }
            case 2: { // relative mode
                const raddr = this.getMem(this.ip + BigInt(idx + 1));
                const addr = this.rb + raddr;
                this.setMem(addr, val);
                //console.log(this.id, `S [rb + ${raddr} = ${addr}] <- ${val}`);
                break;
            }
            default:
                throw new Error(`mode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)} idx ${idx}`);
        }
    };

    run = async function* (ins: AsyncGenerator<bigint> = (async function* () {})()): AsyncGenerator<bigint> {
        while (true) {
            const o = this.getOp();
            //console.log(this.id, 'op', this.ip, this.dasmOp(o).asm.replace('\t', ' '), `rb: ${this.rb}`);

            switch (o.oc) {
                case 1: // add
                    this.setParam(o, 2, this.getParam(o, 0) + this.getParam(o, 1));
                    this.ip += BigInt(4);
                    break;
                case 2: // mul
                    this.setParam(o, 2, this.getParam(o, 0) * this.getParam(o, 1));
                    this.ip += BigInt(4);
                    break;
                case 3: { // in
                    const { value, done } = await ins.next();
                    if (done) { console.log(this.id, 'ins done'); return; }
                    //console.log(this.id, 'in', value);
                    this.setParam(o, 0, value);
                    this.ip += BigInt(2);
                    break;
                }
                case 4: { // out
                    const value = this.getParam(o, 0);
                    //console.log(this.id, 'out', value);
                    this.ip += BigInt(2);
                    yield value;
                    break;
                }
                case 5: // jnz
                    if (this.getParam(o, 0) !== BigInt(0)) {
                        this.ip = this.getParam(o, 1)
                        //console.log(this.id, 'jump', this.ip);
                    } else {
                        this.ip += BigInt(3);
                    }
                    break;
                case 6: // jz
                    if (this.getParam(o, 0) === BigInt(0)) {
                        this.ip = this.getParam(o, 1)
                        //console.log(this.id, 'jump', this.ip);
                    } else {
                        this.ip += BigInt(3);
                    }
                    break;
                case 7: // lt
                    this.setParam(o, 2, this.getParam(o, 0) < this.getParam(o, 1) ? BigInt(1) :BigInt(0));
                    this.ip += BigInt(4);
                    break;
                case 8: // eq
                    this.setParam(o, 2, this.getParam(o, 0) === this.getParam(o, 1) ? BigInt(1) : BigInt(0));
                    this.ip += BigInt(4);
                    break;
                case 9: // arb
                    this.rb += this.getParam(o, 0);
                    this.ip += BigInt(2);
                    //console.log(this.id, `rb <- ${this.rb}`);
                    break;
                case 99: // hlt
                    console.log(this.id, 'halt');
                    return;
                default:
                    throw new Error(`opcode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)}`);
            }
        }
    };

    private dasmParam = (o: Op, idx: number, isAddr: boolean = false) => {
        const val = this.getMem(this.ip + BigInt(idx + 1));
        switch (o.mds[idx]) {
            case 0: // position mode
                if (val >= this.memSize.from && val < this.memSize.to) {
                    return { val: `[sym_${val}]`, syms: [`${val}`] };
                } else {
                    return { val: `[${val}]`, syms: [] };
                }
            case 1: // immediate mode
                if (isAddr && val >= this.memSize.from && val < this.memSize.to) {
                    return { val: `sym_${val}`, syms: [`${val}`] };
                } else {
                    return { val: `${val}`, syms: [] };
                }
            case 2: // relative mode
                return { val: `[rb + ${val}]`, syms: [] };
            default:
                return { val: `<unknown>`, syms: [] };
        }
    };

    private dasmOp = (o: Op) => {
        switch (o.oc) {
            case 1: { // add
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1), this.dasmParam(o, 2)];
                return {
                    asm:`add\t${ps[0].val}, ${ps[1].val}, ${ps[2].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms, ...ps[2].syms]),
                    ip: 4
                };
            }
            case 2: { // mul
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1), this.dasmParam(o, 2)];
                return {
                    asm:`mul\t${ps[0].val}, ${ps[1].val}, ${ps[2].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms, ...ps[2].syms]),
                    ip: 4
                };
            }
            case 3: { // in
                const ps = [this.dasmParam(o, 0)];
                return {
                    asm:`in\t${ps[0].val}`,
                    syms: new Set(ps[0].syms),
                    ip: 2
                };
            }
            case 4: {// out
                const ps = [this.dasmParam(o, 0)];
                return {
                    asm:`out\t${ps[0].val}`,
                    syms: new Set(ps[0].syms),
                    ip: 2
                };
            }
            case 5: { // jnz
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1, true)];
                return {
                    asm:`jnz\t${ps[0].val}, ${ps[1].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms]),
                    ip: 3
                };
            }
            case 6: { // jz
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1, true)];
                return {
                    asm:`jz\t${ps[0].val}, ${ps[1].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms]),
                    ip: 3
                };
            }
            case 7: { // lt
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1), this.dasmParam(o, 2)];
                return {
                    asm:`lt\t${ps[0].val}, ${ps[1].val}, ${ps[2].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms, ...ps[2].syms]),
                    ip: 4
                };
            }
            case 8: { // eq
                const ps = [this.dasmParam(o, 0), this.dasmParam(o, 1), this.dasmParam(o, 2)];
                return {
                    asm:`eq\t${ps[0].val}, ${ps[1].val}, ${ps[2].val}`,
                    syms: new Set([...ps[0].syms, ...ps[1].syms, ...ps[2].syms]),
                    ip: 4
                };
            }
            case 9: { // arb
                const ps = [this.dasmParam(o, 0)];
                return {
                    asm:`arb\t${ps[0].val}`,
                    syms: new Set(ps[0].syms),
                    ip: 2
                };
            }
            case 99: { // hlt
                return {
                    asm:`hlt`,
                    syms: new Set<string>(),
                    ip: 1
                };
            }
            default: {
                return {
                    asm:`db\t${this.getMem(this.ip)}`,
                    syms: new Set<string>(),
                    ip: 1
                };
            }
        }
    };

    private memSize = { from: BigInt(0), to: BigInt(0) };

    dasm = (start: bigint = BigInt(0), len: bigint = undefined) => {
        const code: { [ip: string]: string } = {};
        let lbls = new Set<string>();

        this.memSize.from = start || BigInt(0);

        if (len !== undefined) {
            this.memSize.to = start + len;
        } else {
            this.memSize.to = Object.keys(this.mem).reduce((max, val) => max > BigInt(val) ? max : BigInt(val), BigInt(0));
        }

        this.ip = this.memSize.from;
        while (this.ip < this.memSize.to) {
            const o = this.getOp();
            const { asm, syms, ip } = this.dasmOp(o);
            code[`${this.ip}`] = asm;
            lbls = new Set([...lbls, ...syms]);
            this.ip += BigInt(ip);
        }

        return Object.keys(code).map(ip => {
            const o = `\t${code[Number(ip)]}`;
            return lbls.has(ip) ? `sym_${ip}:\n${o}` : o;
        }).join(os.EOL);
    };
}
