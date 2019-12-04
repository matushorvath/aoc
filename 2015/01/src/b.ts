import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input.txt', 'utf8');
    //const input = '()())';
    input.split('').reduce((t, c, i) => {
        t = c === '(' ? t + 1 : t - 1;
        if (t < 0) {
            console.log(i + 1);
            process.exit();
        }
        return t;
    }, 0);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
