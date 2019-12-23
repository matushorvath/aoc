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
    const tot = BigInt(119315717514047);
    const cnt = 1101741582076661;

    const mul = BigInt(137147148563639);
    const add = BigInt(188769760351347);

    const start = BigInt(2020);

    let pos = start;
    let period: number;

    for (let i = 0; i < cnt; i += 1) {
        if (i % 100000000 === 0) console.log('itr', i, i / cnt);
        pos = (pos * mul + add) % tot;

        if (pos === start) {
            period = i;
            break;
        }
    }
    console.log('prd', period);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
