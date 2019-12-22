import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

const invs: { [b: number]: number } = {};

const inv = (b: number, m: number) => {
    // Returns an array containing 3 integers [div, x, y] where div = gcd(a, b) and a*x + b*y = div
    const [div, x, y] = (mathjs.xgcd(b, m) as unknown as mathjs.Matrix).toArray() as number[];
    if (div !== 1) throw new Error(`not co-prime: ${b}, ${m}`);
    return x;
};

const div = (a: number, b: number, m: number) => {
    const x = invs[b] ?? (invs[b] = inv(b, m));
    return ((x % m + m) % m * a) % m;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const tot = 119315717514047;
    const cnt = 101741582076661;
    const start = 2020;

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
//     //let pos = 1;

    const insts = input.trimRight().split(/\r?\n/)
        .map(i => i.match(/deal with increment (.*)|cut (.*)|deal into new stack/))
        .map(m => m[1] ? { o: 'D', n: Number(m[1]) } : m[2] ? { o: 'C', n: Number(m[2]) } : { o: 'R' });

    insts.reverse();

    let pos = start;
    let period: number;

    for (let i = 0; i < cnt; i += 1) {
        if (i % 1000000 === 0) console.log('itr 1', i);

        for (const inst of insts) {
            switch (inst.o) {
                case 'D':
                    pos = div(pos, inst.n, tot);
                    break;
                case 'C':
                    pos = (pos + inst.n + tot) % tot;
                    break;
                case 'R':
                    pos = tot - pos - 1;
                    break;
            }
        }
        //console.log('pos', pos);
        if (pos % cnt === start) {
            period = i;
            break;
        }
    }
    console.log('prd', period);
    const newCnt = cnt % period;
    console.log('nct', newCnt);

    for (let i = 0; i < newCnt; i += 1) {
        if (i % 1000000 === 0) console.log('itr 2', i);

        for (const inst of insts) {
            switch (inst.o) {
                case 'D':
                    pos = div(pos, inst.n, tot);
                    break;
                case 'C':
                    pos = (pos + inst.n + tot) % tot;
                    break;
                case 'R':
                    pos = tot - pos - 1;
                    break;
            }
        }
        if (pos === start) {
            period = i;
            break;
        }
    }
    console.log('end', pos);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
