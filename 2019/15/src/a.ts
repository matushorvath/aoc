import { promises as fs, exists } from 'fs';
import { Vm } from './vm-a';

const field: number[][] = [];
let reply: number;

function aset<T> (a: T[][], i0: number, i1: number, v: T) {
    if (a[i0] === undefined) {
        a[i0] = [];
    }
    a[i0][i1] = v;
}

const logField = (x: number, y: number) => {
    const rmn = Math.min(x, ...Object.keys(field).map(i => Number(i)));
    const rmx = Math.max(x, ...Object.keys(field).map(i => Number(i)));
    const cmn = Math.min(y, ...field.map(r => Math.min(...Object.keys(r).map(i => Number(i)))));
    const cmx = Math.max(y, ...field.map(r => Math.max(...Object.keys(r).map(i => Number(i)))));

    for (let r = rmn; r <= rmx; r += 1) {
        const out: string[] = [];
        for (let c = cmn; c <= cmx; c += 1) {
            if (r === x && c === y) {
                out.push('D');
            } else if (field[r]?.[c] === undefined) {
                out.push(' ');
            } else {
                out.push(field[r][c] === 0 ? '#' : field[r][c] === 2 ? 'X' : '.');
            }
        }
        console.log(out.join(''));
    }
    console.log('----------');
};

async function* getIns(x: number, y: number): AsyncGenerator<bigint> {
    if (field[x]?.[y + 1] === undefined) {
        yield BigInt(4);
        aset(field, x, y + 1, reply);
        logField(x, y + 1);

        if (reply !== 0) {
            if (reply === 2) console.log('found', x, y + 1);
            yield* getIns(x, y + 1);
            yield BigInt(3);
        }
    }
    if (field[x]?.[y - 1] === undefined) {
        yield BigInt(3);
        aset(field, x, y - 1, reply);
        logField(x, y - 1);

        if (reply !== 0) {
            if (reply === 2) console.log('found', x, y - 1);
            yield* getIns(x, y - 1);
            yield BigInt(4);
        }
    }
    if (field[x + 1]?.[y] === undefined) {
        yield BigInt(2);
        aset(field, x + 1, y, reply);
        logField(x + 1, y);

        if (reply !== 0) {
            if (reply === 2) console.log('found', x + 1, y);
            yield* getIns(x + 1, y);
            yield BigInt(1);
        }
    }
    if (field[x - 1]?.[y] === undefined) {
        yield BigInt(1);
        aset(field, x - 1, y, reply);
        logField(x - 1, y);

        if (reply !== 0) {
            if (reply === 2) console.log('done', x - 1, y);
            yield* getIns(x - 1, y);
            yield BigInt(2);
        }
    }
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    const vm = new Vm(0, mem);

    field[0] = [1];

    for await (const out of vm.run(getIns(0, 0))) {
        reply = Number(out);
    }

    // Solve the maze
    const rmn = Math.min(...Object.keys(field).map(i => Number(i)));
    const rmx = Math.max(...Object.keys(field).map(i => Number(i)));
    const cmn = Math.min(...field.map(r => Math.min(...Object.keys(r).map(i => Number(i)))));
    const cmx = Math.max(...field.map(r => Math.max(...Object.keys(r).map(i => Number(i)))));

    let [x, y] = [0, 0];

    const vals: number[][] = [];
    const vist: boolean[][] = [];
    (vals[x] = vals[x] ?? [])[y] = 0;

    while (field[x]?.[y] !== 2) {
        for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
            if (field[i][j] > 0) {
                (vals[i] = vals[i] ?? [])[j] = Math.min(vals[i]?.[j] ?? Infinity, vals[x][y] + 1);
            }
        }

        (vist[x] = vist[x] ?? [])[y] = true;

        let min = Infinity;
        for (let i = rmn; i <= rmx; i += 1) {
            for (let j = cmn; j <= cmx; j += 1) {
                if (!vist[i]?.[j] && (vals[i]?.[j] ?? Infinity) < min) {
                    [x, y] = [i, j];
                    min = vals[i][j];
                }
            }
        }

        // console.log('xy', [x, y]);
        // console.log(Array.from({ length: x3 }).map((_1, i) =>
        //     Array.from({ length: y3 }).map((_2, j) =>
        //         ('   ' + (vals[i]?.[j] ?? '')).slice(-3)).join(',')).join('\n'));
    }

    console.log('steps', vals[x][y]);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
