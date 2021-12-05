import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    let or = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));
    for (let k = 0; k < or[0].length; k++) {
        const x = [];
        for (let i = 0; i < or[0].length; i++) {
            x[i] = 0;
            for (let j = 0; j < or.length; j++) {
                if (or[j][i]) x[i]++;
            }
        }
        const orf = x.map(n => n >= or.length / 2 ? 1 : 0);

        or = or.filter(n => n[k] === orf[k]);
        if (or.length === 1) {
            console.log(or[0]);
            break;
        }
        // console.log(or);
    }



    let cr = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));
    for (let k = 0; k < cr[0].length; k++) {
        const x = [];
        for (let i = 0; i < cr[0].length; i++) {
            x[i] = 0;
            for (let j = 0; j < cr.length; j++) {
                if (cr[j][i]) x[i]++;
            }
        }
        const crf = x.map(n => n >= cr.length / 2 ? 1 : 0);

        cr = cr.filter(n => n[k] !== crf[k]);
        if (cr.length === 1) {
            console.log(cr[0]);
            break;
        }
        //  console.log(cr);
    }

    console.log(parseInt(or[0].join(''), 2) * parseInt(cr[0].join(''), 2));

};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
