import { promises as fs } from 'fs';

const main = async () => {
    //const input = await fs.readFile('input', 'utf8');
    const input = '03036732577212944063491565474664';
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
*/

    for (let k = 0; k < 100; k += 1) {
        vec = vec.map((_, j) => Math.abs(vec.reduce((p, c, i) => p + c * pat[Math.trunc((i + 1) % (4 * (j + 1)) / (j + 1))], 0) % 10));
    }
    console.log(vec.join('').substr(start, 8));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
