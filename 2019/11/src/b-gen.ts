import { promises as fs } from 'fs';
import { Vm } from './vm-gen';

const field: bigint[][] = [];

const getField = (x: number, y: number) => {
    if (field[x] === undefined) return BigInt(0);
    else return field[x][y] === BigInt(1) ? BigInt(1) : BigInt(0);
};

const setField = (x: number, y: number, v: bigint) => {
    if (field[x] === undefined) field[x] = [];
    field[x][y] = v;
};

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

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {});
    const vm = new Vm(0, mem);

    setField(0, 0, BigInt(1));

    for (const out of vm.run(getIns())) {
        outs.push(out);
    }

    console.log(field.reverse().map(r => r.map(c => c === BigInt(1) ? 'X' : ' ').join('')).join('\n'));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
