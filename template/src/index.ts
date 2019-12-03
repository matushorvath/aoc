import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input.txt', 'utf8');
    const lines = input.trimRight().split(/\r?\n/);

    let total = 0;
    for (const line of lines) {
        const [a, b] = line.split(' ');
    }

    console.log(3, total);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
