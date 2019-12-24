import { promises as fs } from 'fs';

const dump = (d: D) => {
    for (const l of Object.keys(d).map(x => Number(x))) {
        console.log(`L ${l}`);
        console.log(d[l].map(r => r.map(c => c === 1 ? '#' : '.').join('')).join('\n'));
    }
    console.log('\n')
};

const nbrs = (d: number[][], r: number, c: number) => {
    return (d[r - 1]?.[c] ?? 0) + (d[r + 1]?.[c] ?? 0) + (d[r][c - 1] ?? 0) + (d[r][c + 1] ?? 0);
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
    dump([dp]);
    dump(d);
    d[0][0][0] = 1;
    dump([dp]);
    dump(d);

/*    for (let i = 0; i < 10; i += 1) {
        const nd = d.map(r => r.map(c => c));

        for (let r = 0; r < 5; r += 1) {
            for (let c = 0; c < 5; c += 1) {
                const nb = nbrs(d, r, c);
                if (d[r][c] === 1 && nb !== 1) nd[r][c] = 0;
                else if (d[r][c] === 0 && (nb === 1 || nb === 2)) nd[r][c] = 1;
            }
        }

        d = nd;
        dump(d);
    }*/
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
