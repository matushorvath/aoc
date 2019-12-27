import { promises as fs } from 'fs';

function aset<T> (a: T[][], r: number, c: number, v: T) {
    if (a[r] === undefined) {
        a[r] = [];
    }
    a[r][c] = v;
}

function vset<T> (a: { [k: string]: T }[][], r: number, c: number, k: string, v: T) {
    if (a[r] === undefined) {
        a[r] = [];
    }
    if (a[r][c] === undefined) {
        a[r][c] = {};
    }
    a[r][c][k] = v;
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

//     const input = 
// `#########
// #b.A.@.a#
// #########
// `;
//     const input =
// `########################
// #f.D.E.e.C.b.A.@.a.B.c.#
// ######################.#
// #d.....................#
// ########################
// `;
// const input =
// `########################
// #...............b.C.D.f#
// #.######################
// #.....@.a.B.c.d.A.e.F.g#
// ########################
// `;
const input =
`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################
`;

    const field = input.trimRight().split(/\r?\n/).map(r => r.split(''));

    let [x, y] = field.reduce((tr, r, ri) => tr[1] >= 0 ? tr : [ri, r.indexOf('@')], [-1, -1]);
    aset(field, x, y, '.');
    logField(field, x, y);

    const mxk = field.reduce((tr, r) => [...tr, ...r.filter(c => c >= 'a' && c <= 'z')], []).sort().pop();
    const kl = mxk.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    //console.log(mxk, kl);

    const vals: { [key: string]: number }[][] = [];
    const vist: { [key: string]: boolean }[][] = [];
    vset(vals, x, y, '', 0);

    let keys = '';

    while (keys.length < kl) {
        for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
            const isKey = field[i][j] >= 'a' && field[i][j] <= 'z';
            const isDoor = field[i][j] >= 'A' && field[i][j] <= 'Z';

            const newKeys = isKey ? [...new Set([field[i][j], ...keys.split('')])].sort().join('') : keys;

            if (field[i][j] === '.' || isKey || (isDoor && keys.indexOf(field[i][j].toLowerCase()) >= 0)) {
                vset(vals, i, j, newKeys, Math.min(vals[i]?.[j]?.[newKeys] ?? Infinity, vals[x][y][keys] + 1));
            }
        }

        vset(vist, x, y, keys, true);

        //console.log(vist)
        console.log('xyk', [x, y, keys]);
        logField(field, x, y);

        let min = Infinity;
        for (let i = 0; i < field.length; i += 1) {
            for (let j = 0; j < field[0].length; j += 1) {
                for (const k of Object.keys(vals[i]?.[j] ?? {})) {
                    if (!vist[i]?.[j]?.[k] && (vals[i]?.[j]?.[k] ?? Infinity) < min) {
                        [x, y, keys] = [i, j, k];
                        min = vals[i][j][k];
                    }
                }
            }
        }
        if (min === Infinity) {
            console.log('inf', vals[x][y][keys]);
            break;
        }
    }
    console.log('fin', vals[x][y][keys]);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
