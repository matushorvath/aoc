import * as os from 'os';

interface Op {
    oc: number;
    mds: number[];
};

export type Mem = { [addr: string]: bigint };

export class Vm {
    constructor(public id: number, private mem: Mem) {
        this.ip = 0n;
        this.rb = 0n;
    }

    public ip: bigint;
    private rb: bigint;

    dumpMem = (): Mem => {
        return { ...this.mem };
    };

    static cmpMem = (m1: Mem, m2: Mem) => {
        const addrs = new Set([...Object.keys(m1), ...Object.keys(m2)]);
        return new Array(...addrs).filter(a => m1[a] !== m2[a]).map(a => ({ a, m1: m1[a], m2: m2[a] }));
    };

    private getMem = (addr: bigint) => {
        const addrString = `${addr}`;
        let val = this.mem[addrString];
        if (val === undefined) {
            this.mem[addrString] = val = 0n;
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
                throw new Error(`mode error: mem ${this.mem} ip ${this.ip} o ${o} idx ${idx}`);
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
                throw new Error(`mode error: mem ${this.mem} ip ${this.ip} o ${o} idx ${idx}`);
        }
    };

    run = async function* (ins: AsyncGenerator<bigint> = (async function* () {})()): AsyncGenerator<bigint> {
        while (true) {
            const o = this.getOp();
            //console.log(this.id, 'op', this.ip, this.dasmOp(o).asm.replace('\t', ' '), `rb: ${this.rb}`);

            switch (o.oc) {
                case 1: // add
                    this.setParam(o, 2, this.getParam(o, 0) + this.getParam(o, 1));
                    this.ip += 4n;
                    break;
                case 2: // mul
                    this.setParam(o, 2, this.getParam(o, 0) * this.getParam(o, 1));
                    this.ip += 4n;
                    break;
                case 3: { // in
                    const { value, done } = await ins.next();
                    if (done) {
                        //console.log(this.id, 'ins done');
                        return;
                    }
                    //console.log(this.id, 'in', value);
                    this.setParam(o, 0, value);
                    this.ip += 2n;
                    break;
                }
                case 4: { // out
                    const value = this.getParam(o, 0);
                    //console.log(this.id, 'out', value);
                    this.ip += 2n;
                    yield value;
                    break;
                }
                case 5: // jnz
                    if (this.getParam(o, 0) !== 0n) {
                        this.ip = this.getParam(o, 1)
                        //console.log(this.id, 'jump', this.ip);
                    } else {
                        this.ip += 3n;
                    }
                    break;
                case 6: // jz
                    if (this.getParam(o, 0) === 0n) {
                        this.ip = this.getParam(o, 1)
                        //console.log(this.id, 'jump', this.ip);
                    } else {
                        this.ip += 3n;
                    }
                    break;
                case 7: // lt
                    this.setParam(o, 2, this.getParam(o, 0) < this.getParam(o, 1) ? 1n : 0n);
                    this.ip += 4n;
                    break;
                case 8: // eq
                    this.setParam(o, 2, this.getParam(o, 0) === this.getParam(o, 1) ? 1n : 0n);
                    this.ip += 4n;
                    break;
                case 9: // arb
                    this.rb += this.getParam(o, 0);
                    this.ip += 2n;
                    //console.log(this.id, `rb <- ${this.rb}`);
                    break;
                case 99: // hlt
                    //console.log(this.id, 'halt');
                    return;
                default:
                    throw new Error(`opcode error: mem ${this.mem} ip ${this.ip} oc ${o.oc}`);
            }
        }
    };

    private dasmParam = (o: Op, idx: number) => {
        const val = this.getMem(this.ip + BigInt(idx + 1));
        switch (o.mds[idx]) {
            case 0: // position mode
                return `[${val}]`;
            case 1: // immediate mode
                return `${val}`;
            case 2: // relative mode
                return `[rb + ${val}]`;
            default:
                return `<unknown>`;
        }
    };

    private dasmOp = (o: Op) => {
        switch (o.oc) {
            case 1:
                return { asm:`add\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4n };
            case 2: // mul
                return { asm:`mul\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4n };
            case 3: // in
                return { asm:`in\t${this.dasmParam(o, 0)}`, ip: 2n };
            case 4: // out
                return { asm:`out\t${this.dasmParam(o, 0)}`, ip: 2n };
            case 5: // jnz
                return { asm:`jnz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`, ip: 3n };
            case 6: // jz
                return { asm:`jz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`, ip: 3n };
            case 7: // lt
                return { asm:`lt\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4n };
            case 8: // eq
                return { asm:`eq\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4n };
            case 9: // arb
                return { asm:`arb\t${this.dasmParam(o, 0)}`, ip: 2n };
            case 99: // hlt
                return { asm:`hlt`, ip: 1n };
            default:
                return { asm:`db\t${this.getMem(this.ip)}`, ip: 1n };
        }
    };

    dasm = (start: bigint = 0n, len: bigint = undefined) => {
        const code:{ [ip: string]: string } = {};

        let ipFrom = start || 0n;

        let ipTo: bigint;
        if (len !== undefined) {
            ipTo = start + len;
        } else {
            ipTo = Object.keys(this.mem).reduce((max, val) => max > BigInt(val) ? max : BigInt(val), 0n);
        }

        this.ip = ipFrom;
        while (this.ip < ipTo) {
            const o = this.getOp();
            const { asm, ip } = this.dasmOp(o);
            code[`${this.ip}`] = asm;
            this.ip += ip;
        }

        return Object.keys(code).map(ip => `${ip}\t${code[Number(ip)]}`).join(os.EOL);
    };
}
