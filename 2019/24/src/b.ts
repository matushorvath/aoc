import { promises as fs } from 'fs';

const dump = (d: D) => {
    for (const l of Object.keys(d).map(x => Number(x))) {
        console.log(`L ${l}`);
        console.log(d[l].map(r => r.map(c => c === 1 ? '#' : '.').join('')).join('\n'));
    }
    console.log('\n')
};

const nbrs = (d: D, l: number, r: number, c: number) => {
    let nb = (d[l][r - 1]?.[c] ?? 0) + (d[l][r + 1]?.[c] ?? 0) + (d[l][r][c - 1] ?? 0) + (d[l][r][c + 1] ?? 0);
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
        nb += (d[l + 1]?.[4]?.[0] ?? 0) + (d[l + 1]?.[4]?.[1] ?? 0) + (d[l + 1]?.[4]?.[2] ?? 0) + (d[l + 1]?.[4]?.[3] ?? 0) + (d[l + 1]?.[0]?.[4] ?? 0);
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
    //const input = await fs.readFile('input', 'utf8');
    const input = `....#
#..#.
#..##
..#..
#....
`;

    const dp = input.trimRight().split(/\r?\n/).map(r => r.split('').map(c => c === '#' ? 1 : 0));

    let d: D = copy([dp]);

    for (let i = 0; i < 10; i += 1) {
        const nd: D = copy(d);

        for (const l of Object.keys(d).map(x => Number(x))) {
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

        // TODO min level, max level

        d = nd;
        dump(d);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
