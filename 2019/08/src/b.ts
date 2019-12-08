import { promises as fs } from 'fs';

const main = async () => {
    let input = (await fs.readFile('input', 'utf8')).split('').map(x => Number(x));

    const L: number[][] = [];

    let Ln = 0;

    let i = Array.from({ length: 25 * 6 }, () => -1);

    while (input.length >= 25 * 6) {
        L[Ln] = input.slice(0, 25 * 6);
        input = input.slice(25 * 6);

        Ln += 1;
    }

    for (let x = 0; x < 25 * 6; x += 1) {
        for (let Ln = 0; Ln < L.length; Ln += 1) {
            i[x] = L[Ln][x];
            if (i[x] !== 2) break;
        }
    }

    for (let y = 0; y < 6; y += 1) {
        console.log(i.slice(y * 25, (y+1) * 25).map(x => x ? '*' : ' ').join(''));
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
