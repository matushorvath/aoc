import { promises as fs } from 'fs';

const dump = (d: number) => {
    const out: string[][] = [];
    for (let r = 0; r < 5; r += 1) {
        out[r] = [];
        for (let c = 0; c < 5; c += 1) {
            out[r].push((d & 1) ? '#' : '.');
            d = d >> 1;
        }
    }
    console.log(out.map(r => r.join('')).join('\n'));
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const data = input.replace(/\r?\n/g, '').split('').reverse()
        .reduce((t, c) => (t << 1) + (c === '#' ? 1 : 0), 0);

    console.log(data);
    dump(data);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
