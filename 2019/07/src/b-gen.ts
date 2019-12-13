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

        let g4: Generator<bigint>;
        const g0 = vms[0].run((function* () { yield BigInt(p[0]); yield BigInt(0); for (const out of g4) yield out; })())
        const g1 = vms[1].run((function* () { yield BigInt(p[1]); for (const out of g0) yield out; })())
        const g2 = vms[2].run((function* () { yield BigInt(p[2]); for (const out of g1) yield out; })())
        const g3 = vms[3].run((function* () { yield BigInt(p[3]); for (const out of g2) yield out; })())
        g4 = vms[4].run((function* () { yield BigInt(p[4]); for (const out of g3) yield out; })())

        const value = g4.next().value;
        if (value > r.n) { r.n = value; r.p = p; }
    }
    console.log(r.n, r.p);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
