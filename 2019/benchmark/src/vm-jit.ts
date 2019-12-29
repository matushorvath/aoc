interface Op {
    oc: number;
    mds: number[];
};

export type Mem = number[];

export class Vm {
    constructor(public id: number, private mem: Mem) {
        this.ip = 0;
        this.rb = 0;
    }

    private ip: number;
    private rb: number;

    dumpMem = (): Mem => {
        return { ...this.mem };
    };

    run = async function* (ins: AsyncGenerator<number> = (async function* () {})()): AsyncGenerator<number> {
        const ops: { [oc: number]: [Function, number, string?] } = {
                1: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.mem[this.ip + 2]], 4],
              101: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.mem[this.ip + 2]], 4],
              201: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.mem[this.ip + 2]], 4],
             1001: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.ip + 2], 4],
             1101: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.ip + 2], 4],
             1201: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.ip + 2], 4],
             2001: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.rb + this.mem[this.ip + 2]], 4],
             2101: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.rb + this.mem[this.ip + 2]], 4],
             2201: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.rb + this.mem[this.ip + 2]], 4],
            20001: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.mem[this.ip + 2]], 4],
            20101: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.mem[this.ip + 2]], 4],
            20201: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.mem[this.ip + 2]], 4],
            21001: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.ip + 2], 4],
            21101: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.ip + 2], 4],
            21201: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.ip + 2], 4],
            22001: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] + this.mem[this.rb + this.mem[this.ip + 2]], 4],
            22101: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] + this.mem[this.rb + this.mem[this.ip + 2]], 4],
            22201: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] + this.mem[this.rb + this.mem[this.ip + 2]], 4],

                2: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.mem[this.ip + 2]], 4],
              102: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.mem[this.ip + 2]], 4],
              202: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.mem[this.ip + 2]], 4],
             1002: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.ip + 2], 4],
             1102: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.ip + 2], 4],
             1202: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.ip + 2], 4],
             2002: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.rb + this.mem[this.ip + 2]], 4],
             2102: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.rb + this.mem[this.ip + 2]], 4],
             2202: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.rb + this.mem[this.ip + 2]], 4],
            20002: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.mem[this.ip + 2]], 4],
            20102: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.mem[this.ip + 2]], 4],
            20202: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.mem[this.ip + 2]], 4],
            21002: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.ip + 2], 4],
            21102: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.ip + 2], 4],
            21202: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.ip + 2], 4],
            22002: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] * this.mem[this.rb + this.mem[this.ip + 2]], 4],
            22102: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] * this.mem[this.rb + this.mem[this.ip + 2]], 4],
            22202: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] * this.mem[this.rb + this.mem[this.ip + 2]], 4],

                3: [async () => { const { value } = await ins.next(); this.mem[this.mem[this.ip + 1]] = value; }, 2],
              203: [async () => { const { value } = await ins.next(); this.mem[this.rb + this.mem[this.ip + 1]] = value; }, 2],

                4: [() => this.mem[this.mem[this.ip + 1]], 2, 'out'],
              104: [() => this.mem[this.ip + 1], 2, 'out'],
              204: [() => this.mem[this.rb + this.mem[this.ip + 1]], 2, 'out'],

                5: [() => this.ip = this.mem[this.mem[this.ip + 1]] !== 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
              105: [() => this.ip = this.mem[this.ip + 1] !== 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
              205: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] !== 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
             1005: [() => this.ip = this.mem[this.mem[this.ip + 1]] !== 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             1105: [() => this.ip = this.mem[this.ip + 1] !== 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             1205: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] !== 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             2005: [() => this.ip = this.mem[this.mem[this.ip + 1]] !== 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],
             2105: [() => this.ip = this.mem[this.ip + 1] !== 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],
             2205: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] !== 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],

                6: [() => this.ip = this.mem[this.mem[this.ip + 1]] === 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
              106: [() => this.ip = this.mem[this.ip + 1] === 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
              206: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] === 0 ? this.mem[this.mem[this.ip + 2]] : this.ip + 3, 0],
             1006: [() => this.ip = this.mem[this.mem[this.ip + 1]] === 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             1106: [() => this.ip = this.mem[this.ip + 1] === 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             1206: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] === 0 ? this.mem[this.ip + 2] : this.ip + 3, 0],
             2006: [() => this.ip = this.mem[this.mem[this.ip + 1]] === 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],
             2106: [() => this.ip = this.mem[this.ip + 1] === 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],
             2206: [() => this.ip = this.mem[this.rb + this.mem[this.ip + 1]] === 0 ? this.mem[this.rb + this.mem[this.ip + 2]] : this.ip + 3, 0],

                7: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
              107: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
              207: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
             1007: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.ip + 2] ? 1 : 0, 4],
             1107: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.ip + 2] ? 1 : 0, 4],
             1207: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.ip + 2] ? 1 : 0, 4],
             2007: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
             2107: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
             2207: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            20007: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            20107: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            20207: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            21007: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.ip + 2] ? 1 : 0, 4],
            21107: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.ip + 2] ? 1 : 0, 4],
            21207: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.ip + 2] ? 1 : 0, 4],
            22007: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            22107: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            22207: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] < this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],

                8: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
              108: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
              208: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
             1008: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.ip + 2] ? 1 : 0, 4],
             1108: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.ip + 2] ? 1 : 0, 4],
             1208: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.ip + 2] ? 1 : 0, 4],
             2008: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
             2108: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
             2208: [() => this.mem[this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            20008: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            20108: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            20208: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.mem[this.ip + 2]] ? 1 : 0, 4],
            21008: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.ip + 2] ? 1 : 0, 4],
            21108: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.ip + 2] ? 1 : 0, 4],
            21208: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.ip + 2] ? 1 : 0, 4],
            22008: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.mem[this.ip + 1]] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            22108: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.ip + 1] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],
            22208: [() => this.mem[this.rb + this.mem[this.ip + 3]] = this.mem[this.rb + this.mem[this.ip + 1]] === this.mem[this.rb + this.mem[this.ip + 2]] ? 1 : 0, 4],

                9: [() => this.rb += this.mem[this.mem[this.ip + 1]], 2],
              109: [() => this.rb += this.mem[this.ip + 1], 2],
              209: [() => this.rb += this.mem[this.rb + this.mem[this.ip + 1]], 2],

               99: [() => {}, 1, 'hlt'],
        };

        while (true) {
            const [fn, inc, spc] = ops[this.mem[this.ip]];
            const res = await fn();
            if (spc === 'out') yield res;
            else if (spc === 'hlt') return;
            this.ip += inc;

            console.log(this.ip);
            // console.log(JSON.stringify(this.mem));
        }
    };
}
