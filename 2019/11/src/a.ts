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

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {});

    const vm = new Vm(0, mem);

    let x = 0, y = 0;
    let dx = 0, dy = -1;

    while (!vm.halted) {
        console.log('robot pos', [x, y], [dx, dy]);

        const inn = [getField(x, y)];
        console.log('robot in', inn);

        const [color, turn] = vm.run(inn);
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

    const r = Object.values(field).reduce((pr, r) => pr + Object.values(r).reduce((pc, c) => pc + (c === undefined ? 0 : 1), 0), 0);
    console.log(r);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
