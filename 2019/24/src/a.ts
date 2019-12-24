import { promises as fs } from 'fs';

const dump = (d: number[][]) => {
    console.log(d.map(r => r.map(c => c === 1 ? '#' : '.').join('')).join('\n'));
    console.log('\n')
};

const nbrs = (d: number[][], r: number, c: number) => {
    return (d[r - 1]?.[c] ?? 0) + (d[r + 1]?.[c] ?? 0) + (d[r][c - 1] ?? 0) + (d[r][c + 1] ?? 0);
};

const tonum = (d: number[][]) => {
    let out = 0;
    for (let r = 4; r >= 0; r -= 1) {
        for (let c = 4; c >= 0; c -= 1) {
            out = (out << 1) + d[r][c];
        }
    }
    return out;
};

const main = async () => {
    //const input = await fs.readFile('input', 'utf8');
    const input = `....#
#..#.
#..##
..#..
#....
`;

    let d = input.trimRight().split(/\r?\n/).map(r => r.split('').map(c => c === '#' ? 1 : 0));

    dump(d);
    //console.log('tn', tonum(d).toString(2));

    const dup = new Set<number>();
    dup.add(tonum(d));

    while (true) {
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

        const num = tonum(d);
        if (dup.has(num)) {
            console.log('res', num);
            break;
        }
        dup.add(num);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
