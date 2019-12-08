import * as os from 'os';

interface Op {
    oc: number;
    ops: number[];
    mds: number[];
};

export class Vm {
    constructor(mem: number[]) {
        this.mem = [...mem];
    }

    run = (...ins: number[]) => {
        this.ip = 0;
        this.ins = [...ins];
        this.outs = [];

        this.execute();

        return this.outs;
    }

    private ip: number;
    private mem: number[];
    private ins: number[];
    private outs: number[];

    private getOp = () => {
        const [ocm, ...ops] = this.mem.slice(this.ip, this.ip + 4)
        const oc = ocm % 100;
        const mds = [100, 1000, 10000].map(x => Math.trunc(ocm / x) % 10);

        //console.log('op', { ip: this.ip, oc, ops, mds });

        return { oc, ops, mds };
    };

    private getParam = (o: Op, idx: number) => {
        switch (o.mds[idx]) {
            case 0: // position mode
                return this.mem[o.ops[idx]];
            case 1: // immediate mode
                return o.ops[idx];
            default:
                throw new Error(`mode error: mem ${JSON.stringify(this.mem)} ip ${JSON.stringify(this.ip)} o ${JSON.stringify(o)} idx ${idx}`);
        }
    };

    private execute = () => {
        while (true) {
            const o = this.getOp();

            switch (o.oc) {
                case 1: // add
                    this.mem[o.ops[2]] = this.getParam(o, 0) + this.getParam(o, 1);
                    this.ip += 4;
                    break;
                case 2: // mul
                    this.mem[o.ops[2]] = this.getParam(o, 0) * this.getParam(o, 1);
                    this.ip += 4;
                    break;
                case 3: // in
                    this.mem[o.ops[0]] = this.ins.shift();
                    this.ip += 2;
                    break;
                case 4: // out
                    const v = this.getParam(o, 0);
                    console.log('out', v);
                    this.outs.push(v);
                    this.ip += 2;
                    break;
                case 5: // jnz
                    if (this.getParam(o, 0) !== 0) {
                        this.ip = this.getParam(o, 1)
                    } else {
                        this.ip += 3;
                    }
                    break;
                case 6: // jz
                    if (this.getParam(o, 0) === 0) {
                        this.ip = this.getParam(o, 1)
                    } else {
                        this.ip += 3;
                    }
                    break;
                case 7: // lt
                    this.mem[o.ops[2]] = this.getParam(o, 0) < this.getParam(o, 1) ? 1 : 0;
                    this.ip += 4;
                    break;
                case 8: // eq
                    this.mem[o.ops[2]] = this.getParam(o, 0) === this.getParam(o, 1) ? 1 : 0;
                    this.ip += 4;
                    break;
                case 99: // hlt
                    console.log('all outs', this.outs);
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
            default:
                return `<unknown>`;
        }
    };

    dasm = (start: number = 0, len: number = undefined) => {
        const code: { [ip: number]: string } = {};

        let ipFrom = start || 0;
        let ipTo = (start + len) || this.mem.length;

        this.ip = ipFrom;
        while (this.ip < ipTo) {
            const o = this.getOp();
            switch (o.oc) {
                case 1:
                    code[this.ip] = `add\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`
                    this.ip += 4;
                    break;
                case 2: // mul
                    code[this.ip] = `mul\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`
                    this.ip += 4;
                    break;
                case 3: // in
                    code[this.ip] = `in\t${this.dasmParam(o, 0)}`
                    this.ip += 2;
                    break;
                case 4: // out
                    code[this.ip] = `out\t${this.dasmParam(o, 0)}`
                    this.ip += 2;
                    break;
                case 5: // jnz
                    code[this.ip] = `jnz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`
                    this.ip += 3;
                    break;
                case 6: // jz
                    code[this.ip] = `jz\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 2)}`
                    this.ip += 3;
                    break;
                case 7: // lt
                    code[this.ip] = `lt\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`
                    this.ip += 4;
                    break;
                case 8: // eq
                    code[this.ip] = `eq\t${this.dasmParam(o, 0)}, ${this.dasmParam(o, 1)}, ${this.dasmParam(o, 2)}`
                    this.ip += 4;
                    break;
                case 99: // hlt
                    code[this.ip] = `hlt`
                    this.ip += 1;
                    break;
                default:
                    code[this.ip] = `db\t${this.mem[this.ip]}`
                    this.ip += 1;
            }
        }

        return Object.keys(code).map(ip => `${ip}\t${code[Number(ip)]}`).join(os.EOL);
    };
}
