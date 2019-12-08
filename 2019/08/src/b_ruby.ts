import { promises as fs } from 'fs';

const main = async () => {
    let input = await fs.readFile('input', 'utf8');

    const layers = input.match(/.{1,150}/g).map(l => l.match(/.{1,25}/g)) as string[][];

    console.log(
        Array.from({ length: 6 }).map((_, y) =>
            Array.from({ length: 25 }).map((_, x) =>
                layers.map(z => z[y][x]).join('').replace(/2/g, '')[0].replace(/0/g, ' ').replace(/1/g, '#')
            ).join('')
        )
    )
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
