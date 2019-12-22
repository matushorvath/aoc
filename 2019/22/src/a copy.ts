import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

const div = (a: number, b: number, m: number) => {
    // Returns an array containing 3 integers [div, x, y] where div = gcd(a, b) and a*x + b*y = div
    const [div, x, y] = (mathjs.xgcd(b, m) as unknown as mathjs.Matrix).toArray() as number[];
    if (div !== 1) throw new Error(`not co-prime: ${a}, ${b}, ${m}`);
    return ((x % m + m) % m * a) % m;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const tot = 10007;
    let pos = 2019;

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

    // const res: number[] = [];
    // for (let i = 0; i < tot; i += 1) {
    //     let pos = i
        for (const inst of insts) {
            //console.log(inst);
            //console.log('pos', pos);
            switch (inst.o) {
                case 'D':
                    //pos = pos * inst.n % tot;
                    pos = div(pos, inst.n, tot);
                    break;
                case 'C':
                    //console.log('x', pos, inst.n, tot);
                    pos = (pos + inst.n + tot) % tot;
                    break;
                case 'R':
                    pos = tot - pos - 1;
                    break;
            }
        }
        console.log('end', pos);
    //     res[pos] = i;
    // }
    // console.log('res', res);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
