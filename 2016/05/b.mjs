import { createHash } from 'node:crypto';

//const input = 'abc';
const input = 'uqwqemis';

let index = 0;
let output = [];
let cnt = 0;

while (cnt < 8) {
    const hash = createHash('md5');
    hash.update(`${input}${index}`);
    const md5 = hash.digest('hex');

    if (md5.slice(0, 5) === '00000') {
        const pos = Number(md5[5]);
        if (pos >= 0 && pos <= 7 && output[pos] === undefined) {
            output[pos] = md5[6];
            cnt++;
        }
    }

    index++;
    if (index % 100000 === 0) {
        console.log(index, output);
    }
}

console.log('result', output.join(''));
