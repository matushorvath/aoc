import { promises as fs } from 'fs';

const main = async () => {
    let input = (await fs.readFile('input', 'utf8')).split('').map(x => Number(x));

    let img = Array.from({ length: 25 * 6 }, () => 2);

    while (input.length >= 25 * 6) {
        const layer = input.slice(0, 25 * 6);
        img = img.map((value, index) => value === 2 ? layer[index] : value);
        input = input.slice(25 * 6);
    }

    for (let y = 0; y < 6; y += 1) {
        console.log(img.slice(y * 25, (y + 1) * 25).map(x => x ? '*' : ' ').join(''));
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
