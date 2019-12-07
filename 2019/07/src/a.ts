import { promises as fs } from 'fs';
import { Vm } from './vm-a';

let result: number[][] = []
const permute = (arr: number[], m: number[] = []) => {
    if (arr.length === 0) {
        result.push(m)
    } else {
        for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
        }
    }
}
 
const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').map(s => Number(s));

    permute([0, 1, 2, 3, 4]);
    console.log(result);

    let r = { n: 0, p: [] as number[] };

    const vms = [
        new Vm(mem), new Vm(mem), new Vm(mem), new Vm(mem), new Vm(mem)
    ];

    let out = 0;

    for (const p of result) {
        const out1 = vms[0].run(p[0], 0);
        const out2 = vms[1].run(p[1], out1[0]);
        const out3 = vms[2].run(p[2], out2[0]);
        const out4 = vms[3].run(p[3], out3[0]);
        const out5 = vms[4].run(p[4], out4[0]);

        if (out5[0] > r.n) { r.n = out5[0]; r.p = p; }
    }
    console.log(r.n, r.p);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
