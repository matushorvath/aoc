import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let data = input.trimEnd().split(/\r?\n/).map(l => l.split(''));

    console.log(data);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
