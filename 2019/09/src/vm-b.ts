import * as os from 'os';

interface Op {
    oc: number;
    ops: bigint[];
    mds: number[];
};

export class Vm {
    constructor(private id: number, mem: { [addr: string]: bigint }) {
        this.mem = { ...mem };
        this.ip = BigInt(0);
        this.rb = BigInt(0);
    }

    run = (ins: bigint[]) => {
        //if (ins.length) console.log(this.id, 'ins', ins);

        this.ins = ins;
        this.outs = [];

        this.execute();

        //if (this.outs.length) console.log(this.id, 'outs', this.outs);
        //console.log(this.id, 'mem', this.mem);

        return this.outs;
    }

    private ip: bigint;
    private mem: { [addr: string]: bigint };
    private ins: bigint[];
    private outs: bigint[];
    private rb: bigint;
    halted: boolean = false;

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
        const [ocm, ...ops] = [0, 1, 2, 3].map(i => this.getMem(this.ip + BigInt(i)));
        const ocn = Number(ocm);
        const oc = ocn % 100;
        const mds = [100, 1000, 10000].map(x => Math.trunc(ocn / x) % 10);

        return { oc, ops, mds };
    };

    private getParam = (o: Op, idx: number) => {
        let addr, val;

        switch (o.mds[idx]) {
            case 0: // position mode
                addr = o.ops[idx];
                val = this.getMem(addr);
                //console.log(this.id, `G [${addr}] -> ${val}`);
                return val;
            case 1: // immediate mode
                return o.ops[idx];
            case 2: // relative mode
                addr = this.rb + o.ops[idx];
                val = this.getMem(addr);
                //console.log(this.id, `G [rb + ${o.ops[idx]} = ${addr}] -> ${val}`);
                return val;
            default:
                throw new Error(`mode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)} idx ${idx}`);
        }
    };

    private setParam = (o: Op, idx: number, val: bigint) => {
        let addr;
        switch (o.mds[idx]) {
            case 0: // position mode
                addr = o.ops[idx];
                this.setMem(addr, val);
                //console.log(this.id, `S [${addr}] <- ${val}`);
                break;
            case 2: // relative mode
                addr = this.rb + o.ops[idx];
                this.setMem(addr, val);
                //console.log(this.id, `S [rb + ${o.ops[idx]} = ${addr}] <- ${val}`);
                break;
            default:
                throw new Error(`mode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)} idx ${idx}`);
        }
    };

    private execute = () => {
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
                case 3: // in
                    if (this.ins.length === 0) { console.log(this.id, 'no in'); return; }
                    console.log(this.id, 'in', this.ins);
                    this.setParam(o, 0, this.ins.shift());
                    this.ip += BigInt(2);
                    break;
                case 4: // out
                    const v = this.getParam(o, 0);
                    this.outs.push(v);
                    console.log(this.id, 'out', v, this.outs);
                    this.ip += BigInt(2);
                    break;
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
                    console.log('all outs', this.outs);
                    this.halted = true;
                    return;
                default:
                    throw new Error(`opcode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)}`);
            }
        }
    };

    private dasmParam = (o: Op, idx: number) => {
        switch (o.mds[idx]) {
            case 0: // position mode
                return `[${o.ops[idx]}]`;
            case 1: // immediate mode
                return `${o.ops[idx]}`;
            case 2: // relative mode
                return `[rb + ${o.ops[idx]}]`;
            default:
                return `<unknown>`;
        }
    };

    private dasmOp = (o: Op) => {
        switch (o.oc) {
            case 1:
                return { asm:`add\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4 };
            case 2: // mul
                return { asm:`mul\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4 };
            case 3: // in
                return { asm:`in\t${this.dasmParam(o, 0)}`, ip: 2 };
            case 4: // out
                return { asm:`out\t${this.dasmParam(o, 0)}`, ip: 2 };
            case 5: // jnz
                return { asm:`jnz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`, ip: 3 };
            case 6: // jz
                return { asm:`jz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`, ip: 3 };
            case 7: // lt
                return { asm:`lt\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4 };
            case 8: // eq
                return { asm:`eq\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`, ip: 4 };
            case 9: // arb
                return { asm:`arb\t${this.dasmParam(o, 0)}`, ip: 2 };
            case 99: // hlt
                return { asm:`hlt`, ip: 1 };
            default:
                return { asm:`db\t${this.getMem(this.ip)}`, ip: 1 };
        }
    };

    dasm = (start: bigint = BigInt(0), len: bigint = undefined) => {
        const code:{ [ip: string]: string } = {};

        let ipFrom = start || BigInt(0);

        let ipTo: BigInt;
        if (len !== undefined) {
            ipTo = start + len;
        } else {
            ipTo = Object.keys(this.mem).reduce((max, val) => max > BigInt(val) ? max : BigInt(val), BigInt(0));
        }

        this.ip = ipFrom;
        while (this.ip < ipTo) {
            const o = this.getOp();
            const { asm, ip } = this.dasmOp(o);
            code[`${this.ip}`] = asm;
            this.ip += BigInt(ip);
        }

        return Object.keys(code).map(ip => `${ip}\t${code[Number(ip)]}`).join(os.EOL);
    };
}
