import { promises as fs } from 'fs';

const main = async () => {
    let input = (await fs.readFile('input', 'utf8')).split('').map(x => Number(x));

    let cnt0 = Number.MAX_VALUE;
    let mul: number;

    while (input.length >= 25 * 6) {
        const layer = input.slice(0, 25 * 6);

        const cnt = [0, 1, 2].map(num => layer.reduce((t, c) => t + (c === num ? 1 : 0), 0));
        if (cnt[0] < cnt0) {
            cnt0 = cnt[0];
            mul = cnt[1] * cnt[2];
        }

        input = input.slice(25 * 6);
    }

    console.log(mul);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
