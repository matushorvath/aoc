import { promises as fs, exists } from 'fs';
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

const logField = (field: number[][]) => {
    console.log(field.map(r => r.join('')).join('\n'));
};

let x: number, y: number;

async function* getIns() {
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };

    let count = 0;

    for (x = 0; x < 50; x += 1) {
        for (y = 0; y < 50; y += 1) {
            const vm = new Vm(0, mem);
            for await (const out of vm.run((async function* () { yield BigInt(x); yield BigInt(y); })())) {
                console.log(x, y, out);
                setField(x, y, Number(out));
                if (out) count += 1;
            }
        }
    }

    logField(field);
    console.log(count);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
