import * as os from 'os';

interface Op {
    oc: number;
    mds: number[];
};

interface AsmParam {
    ind: boolean,
    rb: boolean,
    val: bigint,
    sym: string
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
            const o = `${ip}\t\t\t${code[Number(ip)]}`;
            return lbls.has(ip) ? `${ip}\tsym_${ip}:\n${o}` : o;
        }).join(os.EOL);
    };

    private asmParam = (ps: AsmParam[], idx: number) => {
        const p = ps[idx];

        const coef = [0, 100, 1000, 10000];
        const mul = p.ind ? (p.rb ? 2 : 0) : 1;

        return {
            oc: BigInt(coef[idx] * mul),
            mem: p.val,
            fixups: !p.sym ? [] : [{ sym: p.sym, ip: this.ip + BigInt(idx + 1) }]
        }
    };

    private asmOp = (op: string, ps: AsmParam[]) => {
        switch (op) {
            case 'add': {
                if (ps.length !== 3 || !ps[2].ind) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1), this.asmParam(ps, 2)];
                return {
                    mem: [BigInt(1) + aps[0].oc + aps[1].oc + aps[2].oc, aps[0].mem, aps[1].mem, aps[2].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups, ...aps[2].fixups]
                };
            }
            case 'mul': {
                if (ps.length !== 3 || !ps[2].ind) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1), this.asmParam(ps, 2)];
                return {
                    mem: [BigInt(2) + aps[0].oc + aps[1].oc + aps[2].oc, aps[0].mem, aps[1].mem, aps[2].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups, ...aps[2].fixups]
                };
            }
            case 'in': {
                if (ps.length !== 1 || !ps[0].ind) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0)];
                return {
                    mem: [BigInt(3) + aps[0].oc, aps[0].mem],
                    fixups: aps[0].fixups
                };
            }
            case 'out': {
                if (ps.length !== 1) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0)];
                return {
                    mem: [BigInt(4) + aps[0].oc, aps[0].mem],
                    fixups: aps[0].fixups
                };
            }
            case 'jnz': {
                if (ps.length !== 2) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1)];
                return {
                    mem: [BigInt(5) + aps[0].oc + aps[1].oc, aps[0].mem, aps[1].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups]
                };
            }
            case 'jz': {
                if (ps.length !== 2) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1)];
                return {
                    mem: [BigInt(6) + aps[0].oc + aps[1].oc, aps[0].mem, aps[1].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups]
                };
            }
            case 'lt': {
                if (ps.length !== 3 || !ps[2].ind) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1), this.asmParam(ps, 2)];
                return {
                    mem: [BigInt(7) + aps[0].oc + aps[1].oc + aps[2].oc, aps[0].mem, aps[1].mem, aps[2].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups, ...aps[2].fixups]
                };
            }
            case 'eq': {
                if (ps.length !== 3 || !ps[2].ind) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0), this.asmParam(ps, 1), this.asmParam(ps, 2)];
                return {
                    mem: [BigInt(8) + aps[0].oc + aps[1].oc + aps[2].oc, aps[0].mem, aps[1].mem, aps[2].mem],
                    fixups: [...aps[0].fixups, ...aps[1].fixups, ...aps[2].fixups]
                };
            }
            case 'arb': {
                if (ps.length !== 1) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0)];
                return {
                    mem: [BigInt(9) + aps[0].oc, aps[0].mem],
                    fixups: aps[0].fixups
                };
            }
            case 'hlt': {
                if (ps.length !== 0) {
                    throw new Error('invalid params');
                }
                return {
                    mem: [BigInt(99)],
                    fixups: []
                };
            }
            case 'db': {
                if (ps.length !== 1) {
                    throw new Error('invalid params');
                }
                const aps = [this.asmParam(ps, 0)];
                return {
                    mem: [aps[0].mem],
                    fixups: aps[0].fixups
                };
            }
            default:
                throw new Error('invalid opcode');
        }
    };

    asm = (code: string) => {
        const lines = code.split(/\r?\n/);

        const fixups: { [sym: string]: bigint[] } = {};
        const syms: { [sym: string]: bigint } = {};

        this.ip = BigInt(0);
        for (let lineno = 0; lineno < lines.length; lineno += 1) {
            const line = lines[lineno];

            const lm = line.match(/^(\w+):|^\t([a-z]+)(\t(.+))?|(^#)|^\s*$/);
            if (!lm) {
                throw new Error(`no line match, line ${lineno}: ${line}`);
            }

            const [_1, sym, op, _2, pss] = lm;

            if (sym !== undefined) {
                if (op !== undefined || pss !== undefined) {
                    throw new Error(`sym line with op or ps, line ${lineno}: ${line}`);
                }
                if (sym in syms) {
                    throw new Error(`duplicate symbol ${sym}, line ${lineno}: ${line}`);
                }
                syms[sym] = this.ip;
            } else if (op !== undefined) {
                if (sym !== undefined) {
                    throw new Error(`op line with sym, line ${lineno}: ${line}`);
                }

                const ps = pss === undefined ? [] : pss.split(', ')
                    .map(p => p.match(/(\[)?(rb \+ )?(\w+)(\])?/))
                    .map(m => ({
                        ind: m[1] !== undefined,
                        rb: m[2] !== undefined,
                        val: (m[3][0] >= '0' && m[3][0] <= '9') ? BigInt(m[3]) : undefined,
                        sym: (m[3][0] >= '0' && m[3][0] <= '9') ? undefined : m[3]
                    }));

                try {
                    //console.log(op, ps);

                    const { mem, fixups: addFixups } = this.asmOp(op, ps);

                    //console.log(mem, addFixups);

                    for (const byte of mem) {
                        this.setMem(this.ip, byte);
                    }
                    for (const fixup of addFixups) {
                        if (fixups[fixup.sym] === undefined) {
                            fixups[fixup.sym] = [fixup.ip]
                        } else {
                            fixups[fixup.sym].push(fixup.ip);
                        }
                    }

                } catch (error) {
                    throw new Error(`${error.message}, line ${lineno}: ${line}`);
                }
            }
        }

        for (const sym of Object.keys(fixups)) {
            if (syms[sym] === undefined) {
                throw new Error(`unknown symbol ${sym}`);
            }
            const val = syms[sym];
            for (const addr of fixups[sym]) {
                this.setMem(addr, val);
            }
        }
    };

    dumpMem = () => {
        const memSize = Object.keys(this.mem).reduce((max, val) => max > BigInt(val) ? max : BigInt(val), BigInt(0));

        const out: BigInt[] = [];
        for (let addr = BigInt(0); addr < memSize; addr += BigInt(1)) {
            out.push(this.getMem(addr));
        }

        console.log(out);
    };
}
