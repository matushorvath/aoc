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

const p = 0b10001010001;

const nbrs = (d: number, i: number) => {
    const ps = i < 5 ? (p >> 5 - i) : (p << i - 5);
    const rs = (d & ps);
    const r = i < 5 ? (rs << 5 - i) : (rs >> i - 5);
    //console.log('p', i, ps.toString(2));
    console.log('n', i, r.toString(2));
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const data = input.replace(/\r?\n/g, '').split('').reverse()
         .reduce((t, c) => (t << 1) + (c === '#' ? 1 : 0), 0);

    console.log(data);
    dump(data);

    console.log('d', data.toString(2));
    for (let i = 0; i < 25; i += 1) {
        nbrs(data, i);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
