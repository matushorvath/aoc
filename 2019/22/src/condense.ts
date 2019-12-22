import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

const main = async () => {
//     const input = `
// deal into new stack
// cut -2
// deal with increment 7
// cut 8
// cut -4
// deal with increment 7
// cut 3
// deal with increment 9
// deal with increment 3
// cut -1
// `.trimLeft();
//     const tot = 10;

    const input = await fs.readFile('input', 'utf8');
    const tot = 10007;
    let pos = 2019;

    const insts = input.trimRight().split(/\r?\n/)
        .map(i => i.match(/deal with increment (.*)|cut (.*)|deal into new stack/))
        .map(m => m[1] ? { o: 'D', n: Number(m[1]) } : m[2] ? { o: 'C', n: Number(m[2]) } : { o: 'R' });

    let mul = 1;
    let add = 0;

    for (const inst of insts) {
        switch (inst.o) {
            case 'D':
                // x * n
                mul = mul * inst.n % tot;
                add = add * inst.n % tot;
                break;
            case 'C':
                // x - n
                add = (add - inst.n + tot) % tot;
                break;
            case 'R':
                // cx + c; c = tot - 1
                mul = mul * (tot - 1) % tot;
                add = (add * (tot - 1) + (tot - 1)) % tot;
                break;
        }
    }
    console.log('ply', mul, add);

    console.log('end', (pos * mul + add) % tot);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
