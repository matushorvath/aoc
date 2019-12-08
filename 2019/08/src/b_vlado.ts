import { promises as fs } from 'fs';

const main = async () => {
    let input = await fs.readFile('input', 'utf8');

    console.log(input
        // split to layers
        .match(/.{1,150}/g)
        // combine layers
        .reduce(
            (image, layer) => image.map((value, index) => value === '2' ? layer[index] : value),
            Array.from({ length: 150 }, () => '2'))
        .map(pixel => pixel !== '0' ? '*' : ' ')
        // convert array back to string
        .join('')
        // split to rows
        .match(/.{1,25}/g));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
