import { promises as fs } from 'fs';
import { Vm } from './vm-a';

const field: number[][] = [];

const getField = (x: number, y: number) => {
    if (field[x] === undefined) return undefined;
    else return field[x][y];
};

const setField = (x: number, y: number, v: number) => {
    if (field[x] === undefined) field[x] = [];
    field[x][y] = v;
};

const logField = (field: string[][]) => {
    console.log(field.map(r => r.join('')).join('\n'));
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    const vm = new Vm(0, mem);

    let field: string[][] = [[]];

    for await (const a of vm.run()) {
        if (a === BigInt(10)) {
            field.push([]);
        } else {
            field[field.length - 1].push(String.fromCharCode(Number(a)));
        }
    }

    const rm = field.length - 1;
    const cm = field[0].length - 1;

    field = field.map((rv, ri) => rv.map((cv, ci) => {
        if (ri === 0 || ri === rm || ci === 0 || ci === cm) return cv;
        if (cv === '.' || rv[ci - 1] === '.' || rv[ci + 1] === '.') return cv;
        if (field[ri - 1][ci] === '.' || field[ri + 1][ci] === '.') return cv;
        return 'O';
    }));

    logField(field);

    const iss = field.reduce(
        (rpv, rcv, ri) => [...rpv, ...rcv.reduce(
            (cpv, ccv, ci) => [...cpv, ...(ccv === 'O' ? [{ ri, ci }] : [])], [])], []);
    console.log(iss);

    const out = iss.reduce((p, c) => p + c.ri * c.ci, 0);
    console.log(out);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
