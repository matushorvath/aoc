import { promises as fs } from 'fs';

const main = async () => {
    let input = (await fs.readFile('input', 'utf8')).split('').map(x => Number(x));

    const L: number[][] = [];

    let Ln = 0;

    let zc = 1000;
    let zLn = 0;

    while (input.length >= 25 * 6) {
        L[Ln] = input.slice(0, 25 * 6);
        input = input.slice(25 * 6);

        const tzc = L[Ln].reduce((t, c) => t + (c === 0 ? 1 : 0), 0);
        if (tzc < zc) { zc = tzc; zLn = Ln; }
        console.log('x', L[Ln].length, zLn, zc, input.length);

        Ln += 1;
    }

    const y1 =         L[zLn].reduce((t, c) => t + (c === 1 ? 1 : 0), 0) 
    const y2 = L[zLn].reduce((t, c) => t + (c === 2 ? 1 : 0), 0);


    console.log(zLn, zc, y1 * y2);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
