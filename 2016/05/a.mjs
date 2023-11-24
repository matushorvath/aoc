import { createHash } from 'node:crypto';

//const input = 'abc';
const input = 'uqwqemis';

let index = 0;
let output = '';

while (output.length < 8) {
    const hash = createHash('md5');
    hash.update(`${input}${index}`);
    const md5 = hash.digest('hex');

    if (md5.slice(0, 5) === '00000') {
        output += md5[5];
    }

    index++;
    if (index % 100000 === 0) {
        console.log(index, output.length);
    }
}

console.log('result', output);
