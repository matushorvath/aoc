import { promises as fs } from 'fs';

const main = async () => {
    //const input = await fs.readFile('input', 'utf8');
    //const input = '03036732577212944063491565474664';
    const input = '2357235723572357235723572357235723572357';
    let vec = input.trimRight().split('').map(n => Number(n));

    const start = 0;//Number(input.substr(0, 8));
    const pat = [0, 1, 0, -1];

/*
lcm:
32,4*1 = 32 = 1
32,4*2 = 32 = 1
32,4*3 = 96 = 3
32,4*4 = 32 = 1
32,4*5 = 160 = 5
32,4*6 = 96 = 3
32,4*7 = 224 = 7
32,4*8 = 32 = 1
32,4*9 = 288  = 9

10000 / 1 = 10000 (times one period) + 10000 % 1 (1 extra copy)

---

32,4*32 = 128 = 4
*/

    for (let k = 0; k < 10; k += 1) {
        const oj = [];
        for (let j = 0; j < vec.length; j += 1) {
            const oi = [];
            for (let i = 0; i < vec.length; i += 1) {
                oi[i] = vec[i] * pat[Math.trunc((i + 1) % (4 * (j + 1)) / (j + 1))];
            }
            console.log('oi', k, j, oi);
            oj[j] = Math.abs(oi.reduce((p, c) => p + c, 0) % 10);
        }
        console.log('oj', k, oj.join(''));
        vec = oj;
    }
    console.log(vec.join(''));//.substr(start, 8));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
