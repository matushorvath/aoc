import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
//    const input = '03036732577212944063491565474664';
//    const input = '02935109699940807407585447034323';
//      const input = '03081770884921959731165446850517';
    const data = input.trimRight().split('').map(n => Number(n));

    const start = Number(input.substr(0, 7));
    const offset = start % data.length;
    const repeats = 10000 - Math.ceil((start + 1) / data.length);

    console.log(start, offset, repeats, data.length)

    const vec = data.slice(offset).concat(...Array(repeats).fill(data));
    console.log(vec.length);

    for (let i = 0; i < 100; i += 1) {
        for (let j = vec.length - 1; j >= 0; j -= 1) {
            vec[j] = (vec[j] + (vec[j + 1] || 0)) % 10;
        }
    }
    console.log(vec.slice(0, 8).join(''));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
