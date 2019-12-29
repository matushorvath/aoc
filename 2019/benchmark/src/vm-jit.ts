interface Op {
    oc: number;
    mds: number[];
};

export type Mem = number[];

const ops: { [oc: number]: [Function, number, boolean?] } = {
        1: [function() { this.spos(3, this.gpos(1) + this.gpos(2)); }, 4],
      101: [function() { this.spos(3, this.gimm(1) + this.gpos(2)); }, 4],
      201: [function() { this.spos(3, this.grel(1) + this.gpos(2)); }, 4],
     1001: [function() { this.spos(3, this.gpos(1) + this.gimm(2)); }, 4],
     1101: [function() { this.spos(3, this.gimm(1) + this.gimm(2)); }, 4],
     1201: [function() { this.spos(3, this.grel(1) + this.gimm(2)); }, 4],
     2001: [function() { this.spos(3, this.gpos(1) + this.grel(2)); }, 4],
     2101: [function() { this.spos(3, this.gimm(1) + this.grel(2)); }, 4],
     2201: [function() { this.spos(3, this.grel(1) + this.grel(2)); }, 4],
    20001: [function() { this.srel(3, this.gpos(1) + this.gpos(2)); }, 4],
    20101: [function() { this.srel(3, this.gimm(1) + this.gpos(2)); }, 4],
    20201: [function() { this.srel(3, this.grel(1) + this.gpos(2)); }, 4],
    21001: [function() { this.srel(3, this.gpos(1) + this.gimm(2)); }, 4],
    21101: [function() { this.srel(3, this.gimm(1) + this.gimm(2)); }, 4],
    21201: [function() { this.srel(3, this.grel(1) + this.gimm(2)); }, 4],
    22001: [function() { this.srel(3, this.gpos(1) + this.grel(2)); }, 4],
    22101: [function() { this.srel(3, this.gimm(1) + this.grel(2)); }, 4],
    22201: [function() { this.srel(3, this.grel(1) + this.grel(2)); }, 4],

        2: [function() { this.spos(3, this.gpos(1) * this.gpos(2)); }, 4],
      102: [function() { this.spos(3, this.gimm(1) * this.gpos(2)); }, 4],
      202: [function() { this.spos(3, this.grel(1) * this.gpos(2)); }, 4],
     1002: [function() { this.spos(3, this.gpos(1) * this.gimm(2)); }, 4],
     1102: [function() { this.spos(3, this.gimm(1) * this.gimm(2)); }, 4],
     1202: [function() { this.spos(3, this.grel(1) * this.gimm(2)); }, 4],
     2002: [function() { this.spos(3, this.gpos(1) * this.grel(2)); }, 4],
     2102: [function() { this.spos(3, this.gimm(1) * this.grel(2)); }, 4],
     2202: [function() { this.spos(3, this.grel(1) * this.grel(2)); }, 4],
    20002: [function() { this.srel(3, this.gpos(1) * this.gpos(2)); }, 4],
    20102: [function() { this.srel(3, this.gimm(1) * this.gpos(2)); }, 4],
    20202: [function() { this.srel(3, this.grel(1) * this.gpos(2)); }, 4],
    21002: [function() { this.srel(3, this.gpos(1) * this.gimm(2)); }, 4],
    21102: [function() { this.srel(3, this.gimm(1) * this.gimm(2)); }, 4],
    21202: [function() { this.srel(3, this.grel(1) * this.gimm(2)); }, 4],
    22002: [function() { this.srel(3, this.gpos(1) * this.grel(2)); }, 4],
    22102: [function() { this.srel(3, this.gimm(1) * this.grel(2)); }, 4],
    22202: [function() { this.srel(3, this.grel(1) * this.grel(2)); }, 4],

        3: [function(i: number) { this.spos(1, i); }, 2, true],
      203: [function(i: number) { this.srel(1, i); }, 2, true],

        4: [function() { return this.gpos(1); }, 2],
      104: [function() { return this.gimm(1); }, 2],
      204: [function() { return this.grel(1); }, 2],

        5: [function() { this.ip = this.gpos(1) !== 0 ? this.gpos(2) : this.ip + 3; }, 0],
      105: [function() { this.ip = this.gimm(1) !== 0 ? this.gpos(2) : this.ip + 3; }, 0],
      205: [function() { this.ip = this.grel(1) !== 0 ? this.gpos(2) : this.ip + 3; }, 0],
     1005: [function() { this.ip = this.gpos(1) !== 0 ? this.gimm(2) : this.ip + 3; }, 0],
     1105: [function() { this.ip = this.gimm(1) !== 0 ? this.gimm(2) : this.ip + 3; }, 0],
     1205: [function() { this.ip = this.grel(1) !== 0 ? this.gimm(2) : this.ip + 3; }, 0],
     2005: [function() { this.ip = this.gpos(1) !== 0 ? this.grel(2) : this.ip + 3; }, 0],
     2105: [function() { this.ip = this.gimm(1) !== 0 ? this.grel(2) : this.ip + 3; }, 0],
     2205: [function() { this.ip = this.grel(1) !== 0 ? this.grel(2) : this.ip + 3; }, 0],

        6: [function() { this.ip = this.gpos(1) === 0 ? this.gpos(2) : this.ip + 3; }, 0],
      106: [function() { this.ip = this.gimm(1) === 0 ? this.gpos(2) : this.ip + 3; }, 0],
      206: [function() { this.ip = this.grel(1) === 0 ? this.gpos(2) : this.ip + 3; }, 0],
     1006: [function() { this.ip = this.gpos(1) === 0 ? this.gimm(2) : this.ip + 3; }, 0],
     1106: [function() { this.ip = this.gimm(1) === 0 ? this.gimm(2) : this.ip + 3; }, 0],
     1206: [function() { this.ip = this.grel(1) === 0 ? this.gimm(2) : this.ip + 3; }, 0],
     2006: [function() { this.ip = this.gpos(1) === 0 ? this.grel(2) : this.ip + 3; }, 0],
     2106: [function() { this.ip = this.gimm(1) === 0 ? this.grel(2) : this.ip + 3; }, 0],
     2206: [function() { this.ip = this.grel(1) === 0 ? this.grel(2) : this.ip + 3; }, 0],

        7: [function() { this.spos(3, this.gpos(1) < this.gpos(2) ? 1 : 0); }, 4],
      107: [function() { this.spos(3, this.gimm(1) < this.gpos(2) ? 1 : 0); }, 4],
      207: [function() { this.spos(3, this.grel(1) < this.gpos(2) ? 1 : 0); }, 4],
     1007: [function() { this.spos(3, this.gpos(1) < this.gimm(2) ? 1 : 0); }, 4],
     1107: [function() { this.spos(3, this.gimm(1) < this.gimm(2) ? 1 : 0); }, 4],
     1207: [function() { this.spos(3, this.grel(1) < this.gimm(2) ? 1 : 0); }, 4],
     2007: [function() { this.spos(3, this.gpos(1) < this.grel(2) ? 1 : 0); }, 4],
     2107: [function() { this.spos(3, this.gimm(1) < this.grel(2) ? 1 : 0); }, 4],
     2207: [function() { this.spos(3, this.grel(1) < this.grel(2) ? 1 : 0); }, 4],
    20007: [function() { this.srel(3, this.gpos(1) < this.gpos(2) ? 1 : 0); }, 4],
    20107: [function() { this.srel(3, this.gimm(1) < this.gpos(2) ? 1 : 0); }, 4],
    20207: [function() { this.srel(3, this.grel(1) < this.gpos(2) ? 1 : 0); }, 4],
    21007: [function() { this.srel(3, this.gpos(1) < this.gimm(2) ? 1 : 0); }, 4],
    21107: [function() { this.srel(3, this.gimm(1) < this.gimm(2) ? 1 : 0); }, 4],
    21207: [function() { this.srel(3, this.grel(1) < this.gimm(2) ? 1 : 0); }, 4],
    22007: [function() { this.srel(3, this.gpos(1) < this.grel(2) ? 1 : 0); }, 4],
    22107: [function() { this.srel(3, this.gimm(1) < this.grel(2) ? 1 : 0); }, 4],
    22207: [function() { this.srel(3, this.grel(1) < this.grel(2) ? 1 : 0); }, 4],

        8: [function() { this.spos(3, this.gpos(1) === this.gpos(2) ? 1 : 0); }, 4],
      108: [function() { this.spos(3, this.gimm(1) === this.gpos(2) ? 1 : 0); }, 4],
      208: [function() { this.spos(3, this.grel(1) === this.gpos(2) ? 1 : 0); }, 4],
     1008: [function() { this.spos(3, this.gpos(1) === this.gimm(2) ? 1 : 0); }, 4],
     1108: [function() { this.spos(3, this.gimm(1) === this.gimm(2) ? 1 : 0); }, 4],
     1208: [function() { this.spos(3, this.grel(1) === this.gimm(2) ? 1 : 0); }, 4],
     2008: [function() { this.spos(3, this.gpos(1) === this.grel(2) ? 1 : 0); }, 4],
     2108: [function() { this.spos(3, this.gimm(1) === this.grel(2) ? 1 : 0); }, 4],
     2208: [function() { this.spos(3, this.grel(1) === this.grel(2) ? 1 : 0); }, 4],
    20008: [function() { this.srel(3, this.gpos(1) === this.gpos(2) ? 1 : 0); }, 4],
    20108: [function() { this.srel(3, this.gimm(1) === this.gpos(2) ? 1 : 0); }, 4],
    20208: [function() { this.srel(3, this.grel(1) === this.gpos(2) ? 1 : 0); }, 4],
    21008: [function() { this.srel(3, this.gpos(1) === this.gimm(2) ? 1 : 0); }, 4],
    21108: [function() { this.srel(3, this.gimm(1) === this.gimm(2) ? 1 : 0); }, 4],
    21208: [function() { this.srel(3, this.grel(1) === this.gimm(2) ? 1 : 0); }, 4],
    22008: [function() { this.srel(3, this.gpos(1) === this.grel(2) ? 1 : 0); }, 4],
    22108: [function() { this.srel(3, this.gimm(1) === this.grel(2) ? 1 : 0); }, 4],
    22208: [function() { this.srel(3, this.grel(1) === this.grel(2) ? 1 : 0); }, 4],

        9: [function() { this.rb += this.gpos(1); }, 2],
      109: [function() { this.rb += this.gimm(1); }, 2],
      209: [function() { this.rb += this.grel(1); }, 2],

       99: [function() { return null as number; }, 1],
};

export class Vm {
    constructor(public id: number, private mem: Mem) {
        this.ip = 0;
        this.rb = 0;
    }

    private ip: number;
    private rb: number;

    gpos = (i: number) => this.mem[this.mem[this.ip + i] ?? 0] ?? 0;
    gimm = (i: number) => this.mem[this.ip + i] ?? 0;
    grel = (i: number) => this.mem[this.rb + (this.mem[this.ip + i] ?? 0)] ?? 0;
    spos = (i: number, v: number) => this.mem[this.mem[this.ip + i] ?? 0] = v;
    srel = (i: number, v: number) => this.mem[this.rb + (this.mem[this.ip + i] ?? 0)] = v;

    run = async function* (ins: AsyncGenerator<number> = (async function* () {})()): AsyncGenerator<number> {
        while (true) {
            const [fn, inc, io] = ops[this.mem[this.ip]];
            const res = await fn.bind(this)(io ? (await ins.next()).value : undefined);

            if (res === null) return;
            else if (res !== undefined) yield res;
            this.ip += inc;
        }
    };
}
