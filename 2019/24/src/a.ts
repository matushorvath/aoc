import { promises as fs } from 'fs';

const dump = (d: number[][]) => {
    console.log(d.map(r => r.map(c => c === 1 ? '#' : '.').join('')).join('\n'));
};

const nbrs = (d: number[][], r: number, c: number) => {
    return (d[r - 1]?.[c] ?? 0) + (d[r + 1]?.[c] ?? 0) + (d[r][c - 1] ?? 0) + (d[r][c + 1] ?? 0);
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const d = input.trimRight().split(/\r?\n/).map(r => r.split('').map(c => c === '#' ? 1 : 0));

    dump(d);

    for (let r = 0; r < 5; r += 1) {
        for (let c = 0; c < 5; c += 1) {
            console.log('n', r, c, nbrs(d, r, c));
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
