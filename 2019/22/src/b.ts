import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';
const bcu = require('bigint-crypto-utils');

const main = async () => {
    // const input = await fs.readFile('input', 'utf8');
    // const tot = 119315717514047;
    // const cnt = 101741582076661;
    // const start = 2020;

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
//     const tot = BigInt(10);
//     const cnt = BigInt(10);
//     const start = BigInt(6);

    const input = `
deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1
`.trimLeft();
    const tot = BigInt(13);
    const cnt = BigInt(11);
    const start = BigInt(6);

    const insts = input.trimRight().split(/\r?\n/)
        .map(i => i.match(/deal with increment (.*)|cut (.*)|deal into new stack/))
        .map(m => m[1] ? { o: 'D', n: BigInt(m[1]) } : m[2] ? { o: 'C', n: BigInt(m[2]) } : { o: 'R' });

    insts.reverse();

    let pos = start;

    for (let i = BigInt(0); i < cnt; i += BigInt(1)) {
        for (const inst of insts) {
            switch (inst.o) {
                case 'D':
                    pos = pos * bcu.modInv(inst.n, tot) % tot;
                    break;
                case 'C':
                    pos = (pos + inst.n + tot) % tot;
                    break;
                case 'R':
                    pos = tot - pos - BigInt(1);
                    break;
            }
        }
        console.log('pos', i, pos);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
