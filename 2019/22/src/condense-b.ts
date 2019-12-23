import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';
const bcu = require('bigint-crypto-utils');

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const tot = BigInt(119315717514047);
    const cnt = BigInt(101741582076661);
    const start = BigInt(2020);

    // const input = await fs.readFile('input', 'utf8');
    // const tot = BigInt(119315717514047);
    // const cnt = BigInt(10);
    // const start = BigInt(2020);

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
//     const tot = BigInt(13);
//     const cnt = BigInt(11);
//     const start = BigInt(6);

    // const input = await fs.readFile('input', 'utf8');
    // const tot = BigInt(119315717514047);

    const insts = input.trimRight().split(/\r?\n/)
        .map(i => i.match(/deal with increment (.*)|cut (.*)|deal into new stack/))
        .map(m => m[1] ? { o: 'D', n: BigInt(m[1]) } : m[2] ? { o: 'C', n: BigInt(m[2]) } : { o: 'R' });

    let mul = BigInt(1);
    let add = BigInt(0);

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
                mul = mul * (tot - BigInt(1)) % tot;
                add = (add * (tot - BigInt(1)) + (tot - BigInt(1))) % tot;
                break;
        }
    }
    console.log('ply', mul, add);

    // let pos = start;
    // for (let i = BigInt(0); i < cnt; i += BigInt(1)) {
    //     pos = (pos - add + tot) % tot * bcu.modInv(mul, tot) % tot;
    //     console.log('cbp', i, pos);
    // }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
