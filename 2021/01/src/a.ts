import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let data = input.trimEnd().split(/\r?\n/);

    let c = 0;
    let mx = 0;
    for (const d of data) {
        const n = parseInt(d, 10);
        if (n > mx){
             c++;
        }
        mx =n;
    }

    console.log(c);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
