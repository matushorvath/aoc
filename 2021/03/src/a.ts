import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    const x = [];
    for (let i = 0; i < d[0].length; i++) {
        x[i] = 0;
        for (let j = 0; j < d.length; j++) {
            if (d[j][i]) x[i]++;
        }
    }

    const o = x.map(n => n > d.length / 2 ? 1 : 0);
    const p = o.map(n => n ? 0 : 1);

    console.log(parseInt(o.join(''), 2) * parseInt(p.join(''), 2));

};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
