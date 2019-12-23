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
    const tot = 119315717514047;
    const cnt = BigInt(101741582076661);
    const pos = 2020;

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

    let m1 = BigInt(mul);
    let a1 = BigInt(mul);
    let m2 = BigInt(1);
    let a2 = BigInt(0);

    // m2 = mul ^ cnt;
    // a2 = add * (mul^0 + mul^1 + mul^2 + ... + mul^cnt)

    for (let i = 0; i < cnt; i += 1) {
        a2 = (a2 + m2 * a1) % cnt;
        m2 = m2 * m1 % cnt;

        if (m2 === BigInt(1)) {
            console.log('m period', i + 1);
            break;
        }
    }

    console.log('ply2', m2, a2);

//    console.log('end', (pos * mul + add) % tot);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
