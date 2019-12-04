import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input.txt', 'utf8');
    //const input = '))(((((';
    console.log(input.split('').reduce((t, c) => c === '(' ? t + 1 : t - 1, 0));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
