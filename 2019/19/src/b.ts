import { promises as fs, exists } from 'fs';
import { Vm } from './vm-b';

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

let mem: { [addr: string]: bigint };

const test = async (x: number, y: number) => {
    const vm = new Vm(0, mem);
    for await (const out of vm.run((async function* () { yield BigInt(x); yield BigInt(y); })())) {
        return Number(out) === 1;
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };

    let x = 0;
    let y = 100;
    while (true) {
        while (!await test(x, y)) {
            x += 1;
        }
        //console.log('test', x, y);

        if (await test(x + 99, y - 99)) {
            console.log('done', x, y - 99, x * 10000 + y - 99);
            break;
        }
        y += 1;
    }

    //logField(field);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
