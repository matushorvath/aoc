import { promises as fs } from 'fs';
import { Vm } from './vm-gen';

/*
let outs: bigint[] = [];

const getIns = function* (): Generator<bigint> {
    let x = 0, y = 0;
    let dx = 0, dy = -1;

    while (true) {
        console.log('robot pos', [x, y], [dx, dy]);

        const inn = getField(x, y);
        console.log('robot in', inn);
        yield inn;

        if (outs.length === 0) break;

        const [color, turn] = outs.slice(0, 2);
        outs = outs.slice(2);

        console.log('robot out', [color, turn]);
        setField(x, y, color);

        if (turn === BigInt(0)) {
            // left
            [dx, dy] = [dy, -dx];
        } else {
            // right
            [dx, dy] = [-dy, dx];
        }
        [x, y] = [x + dx, y + dy];
    }
}
*/

let result: number[][] = []

const permute = (arr: number[], m: number[] = []) => {
    if (arr.length === 0) {
        result.push(m);
    } else {
        for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next));
        }
    }
}
 
const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {});

    const vm = new Vm(0, mem);

    permute([5, 6, 7, 8, 9]);

    let r = { n: 0, p: [] as number[] };

    for (const p of result) {
        const vms = [
            new Vm(0, mem), new Vm(1, mem), new Vm(2, mem), new Vm(3, mem), new Vm(4, mem)
        ];

        const g4: Generator<bigint>;
        const g0 = vms[0].run((function* () { yield BigInt(0); yield BigInt(p[0]); yield* g4 })())

        outs[0] = [p[0], 0];
        outs[1] = [p[1]];
        outs[2] = [p[2]];
        outs[3] = [p[3]];
        outs[4] = [p[4]];

        console.log(outs);

        while (vms.some(vm => !vm.halted)) {
            outs[1].push(...vms[0].run(outs[0]));
            outs[2].push(...vms[1].run(outs[1]));
            outs[3].push(...vms[2].run(outs[2]));
            outs[4].push(...vms[3].run(outs[3]));
            outs[0].push(...vms[4].run(outs[4]));
        }

        if (outs[0][outs[0].length - 1] > r.n) { r.n = outs[0][outs[0].length - 1]; r.p = p; }
    }
    console.log(r.n, r.p);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
