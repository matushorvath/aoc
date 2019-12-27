import { promises as fs } from 'fs';

function aset<T> (a: T[][], i0: number, i1: number, v: T) {
    if (a[i0] === undefined) {
        a[i0] = [];
    }
    a[i0][i1] = v;
}

const logField = (field: string[][], x: number, y: number) => {
    const rmn = Math.min(x, ...Object.keys(field).map(i => Number(i)));
    const rmx = Math.max(x, ...Object.keys(field).map(i => Number(i)));
    const cmn = Math.min(y, ...field.map(r => Math.min(...Object.keys(r).map(i => Number(i)))));
    const cmx = Math.max(y, ...field.map(r => Math.max(...Object.keys(r).map(i => Number(i)))));

    for (let r = rmn; r <= rmx; r += 1) {
        const out: string[] = [];
        for (let c = cmn; c <= cmx; c += 1) {
            out.push(r === x && c === y ? '@' : field[r][c]);
        }
        console.log(out.join(''));
    }
    console.log('----------');
};

const main = async () => {
//    const input = await fs.readFile('input', 'utf8');

    const input = 
`#########
#b.A.@.a#
#########
`;

    const field = input.trimRight().split(/\r?\n/).map(r => r.split(''));

    let [x, y] = field.reduce((tr, r, ri) => tr[1] >= 0 ? tr : [ri, r.indexOf('@')], [-1, -1]);
    aset(field, x, y, '.');
    logField(field, x, y);

    // Solve the maze
    const vals: number[][] = [];
    const vist: boolean[][] = [];
    (vals[x] = vals[x] ?? [])[y] = 0;

    while (true) {
        for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
            if (field[i][j] === '.') {
                (vals[i] = vals[i] ?? [])[j] = Math.min(vals[i]?.[j] ?? Infinity, vals[x][y] + 1);
            }
        }

        (vist[x] = vist[x] ?? [])[y] = true;

        let min = Infinity;
        for (let i = 0; i < field.length; i += 1) {
            for (let j = 0; j < field[0].length; j += 1) {
                if (!vist[i]?.[j] && (vals[i]?.[j] ?? Infinity) < min) {
                    [x, y] = [i, j];
                    min = vals[i][j];
                }
            }
        }
        if (min === Infinity) {
            console.log('finished', vals[x][y]);
            break;
        }

        // console.log('xy', [x, y]);
        logField(field, x, y);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
