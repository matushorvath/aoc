import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '80871224585914546619083218645595';
    let vec = input.trimRight().split('').map(n => Number(n));
    const pat = [0, 1, 0, -1];

    //const vec2 = vec.reduce((p, c, i) => { console.log(Math.trunc((i + 1) % (4 * (j + 1)) / (j + 1))); return 0; }, 0);
    //const vec2 = vec.reduce((p, c, i) => { console.log(pat[Math.trunc((i + 1) % (4 * (j + 1)) / (j + 1))]); return 0; }, 0);

    for (let k = 0; k < 100; k += 1) {
        vec = vec.map((_, j) => Math.abs(vec.reduce((p, c, i) => p + c * pat[Math.trunc((i + 1) % (4 * (j + 1)) / (j + 1))], 0) % 10));
    }
    console.log(vec.join('').substr(0, 8));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
