import { promises as fs } from 'fs';
import { Vm } from './vm-b';

const field: bigint[][] = [];

const getField = (x: number, y: number) => {
    if (field[x] === undefined) return BigInt(0);
    else return field[x][y] === BigInt(1) ? BigInt(1) : BigInt(0);
};

const setField = (x: number, y: number, v: bigint) => {
    if (field[x] === undefined) field[x] = [];
    field[x][y] = v;
};

var stdin = process.openStdin(); 
require('tty').setRawMode(true);

stdin.on('keypress', function (chunk, key) {
    process.stdout.write('Get Chunk: ' + chunk + '\n');
    if (key && key.ctrl && key.name == 'c') process.exit();
});

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    mem['0'] = BigInt(2);
    const vm = new Vm(0, mem);

    let outs: bigint[] = [];
    for (const out of vm.run()) {
        outs.push(out);
        if (outs.length === 3) {
            const [x, y, t] = outs;
            outs = [];

            setField(Number(x), Number(y), t);
        }
    }

    console.log(Object.values(field).reduce(
        (pr, r) => pr + Object.values(r).reduce(
            (pc, c) => pc + (c === BigInt(2) ? 1 : 0), 0), 0));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
