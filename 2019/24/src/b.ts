import { promises as fs } from 'fs';

const dump = (d: D) => {
    const ls = Object.keys(d).map(x => Number(x)).sort((a, b) => a - b);
    for (const l of ls) {
        console.log(`L ${l}`);
        console.log(d[l].map(r => r.map(c => c === 1 ? '#' : '.').join('')).join('\n'));
        console.log('\n')
    }
    console.log('----------\n')
};

const nbrs = (d: D, l: number, r: number, c: number) => {
    let nb = (d[l]?.[r - 1]?.[c] ?? 0) + (d[l]?.[r + 1]?.[c] ?? 0) + (d[l]?.[r][c - 1] ?? 0) + (d[l]?.[r][c + 1] ?? 0);
    if (r === 0) {
        nb += (d[l - 1]?.[1]?.[2] ?? 0);
    } else if (r === 4) {
        nb += (d[l - 1]?.[3]?.[2] ?? 0);
    }
    if (c === 0) {
        nb += (d[l - 1]?.[2]?.[1] ?? 0);
    } else if (c === 4) {
        nb += (d[l - 1]?.[2]?.[3] ?? 0);
    }
    if (r === 1 && c === 2) {
        nb += (d[l + 1]?.[0]?.[0] ?? 0) + (d[l + 1]?.[0]?.[1] ?? 0) + (d[l + 1]?.[0]?.[2] ?? 0) + (d[l + 1]?.[0]?.[3] ?? 0) + (d[l + 1]?.[0]?.[4] ?? 0);
    } else if (r === 3 && c === 2) {
        nb += (d[l + 1]?.[4]?.[0] ?? 0) + (d[l + 1]?.[4]?.[1] ?? 0) + (d[l + 1]?.[4]?.[2] ?? 0) + (d[l + 1]?.[4]?.[3] ?? 0) + (d[l + 1]?.[4]?.[4] ?? 0);
    } else if (r === 2 && c === 1) {
        nb += (d[l + 1]?.[0]?.[0] ?? 0) + (d[l + 1]?.[1]?.[0] ?? 0) + (d[l + 1]?.[2]?.[0] ?? 0) + (d[l + 1]?.[3]?.[0] ?? 0) + (d[l + 1]?.[4]?.[0] ?? 0);
    } else if (r === 2 && c === 3) {
        nb += (d[l + 1]?.[0]?.[4] ?? 0) + (d[l + 1]?.[1]?.[4] ?? 0) + (d[l + 1]?.[2]?.[4] ?? 0) + (d[l + 1]?.[3]?.[4] ?? 0) + (d[l + 1]?.[4]?.[4] ?? 0);
    }
    return nb;
};

type D = { [l: number]: number[][] };

const copy = (d: D) => {
    return Object.keys(d).reduce((t, l) => ({ ...t, [Number(l)]: d[Number(l)].map(r => r.map(c => c)) }), {});
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
//     const input = `....#
// #..#.
// #..##
// ..#..
// #....
// `;

    const dp = input.trimRight().split(/\r?\n/).map(r => r.split('').map(c => c === '#' ? 1 : 0));

    let d: D = copy([dp]);
    //dump(d);

    for (let i = 0; i < 200; i += 1) {
        const nd: D = copy(d);

        const ls = Object.keys(d).map(x => Number(x));
        for (const l of ls) {
            for (let r = 0; r < 5; r += 1) {
                for (let c = 0; c < 5; c += 1) {
                    if (r !== 2 || c !== 2) {
                        const nb = nbrs(d, l, r, c);
                        if (d[l][r][c] === 1 && nb !== 1) nd[l][r][c] = 0;
                        else if (d[l][r][c] === 0 && (nb === 1 || nb === 2)) nd[l][r][c] = 1;
                    }
                }
            }
        }

        const lmx = Math.max(...ls);
        const mxt = nbrs(d, lmx + 1, 0, 2);
        const mxb = nbrs(d, lmx + 1, 4, 2);
        const mxl = nbrs(d, lmx + 1, 2, 0);
        const mxr = nbrs(d, lmx + 1, 2, 4);
        if (mxt > 1 || mxb > 1 || mxl > 1 || mxr > 1) { console.log('unexpected'); process.exit(1); }

        if (mxt + mxb + mxl + mxr > 0) {
            nd[lmx + 1] = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        }
        if (mxt === 1) {
            for (let c = 0; c < 5; c += 1) nd[lmx + 1][0][c] = 1;
        }
        if (mxb === 1) {
            for (let c = 0; c < 5; c += 1) nd[lmx + 1][4][c] = 1;
        }
        if (mxl === 1) {
            for (let r = 0; r < 5; r += 1) nd[lmx + 1][r][0] = 1;
        }
        if (mxr === 1) {
            for (let r = 0; r < 5; r += 1) nd[lmx + 1][r][4] = 1;
        }

        const lmn = Math.min(...ls);
        const mnt = nbrs(d, lmn - 1, 1, 2);
        const mnb = nbrs(d, lmn - 1, 3, 2);
        const mnl = nbrs(d, lmn - 1, 2, 1);
        const mnr = nbrs(d, lmn - 1, 2, 3);

        if (mnt === 1 || mnt === 2 || mnb === 1 || mnb === 2 || mnl === 1 || mnl === 2 || mnr === 1 || mnr === 2) {
            nd[lmn - 1] = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        }
        if (mnt === 1 || mnt === 2) {
            nd[lmn - 1][1][2] = 1;
        }
        if (mnb === 1 || mnb === 2) {
            nd[lmn - 1][3][2] = 1;
        }
        if (mnl === 1 || mnl === 2) {
            nd[lmn - 1][2][1] = 1;
        }
        if (mnr === 1 || mnr === 2) {
            nd[lmn - 1][2][3] = 1;
        }

        d = nd;
        //dump(d);
    }

    let cnt = 0;
    for (const l of Object.keys(d).map(x => Number(x))) {
        cnt += d[l].reduce((tr, r) => tr + r.reduce((tc, c) => tc + c, 0), 0);
    }
    console.log('cnt', cnt);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
