import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '2x3x4';
    const presents = input.trimRight().split(/\r?\n/).map(p => p.split('x').map(s => Number(s)));

    let area = 0;
    for (const present of presents) {
        console.log(1, present);
        present.sort((a, b) => a - b);
        console.log(2, present);
        area = area + 2 * present[0] + 2 * present[1] + present[0] * present[1] * present[2];
        console.log(3, area);
    }

    console.log(area);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
