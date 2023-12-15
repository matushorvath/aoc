import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(',');

console.log(data);

const hash = (s) => {
    let curr = 0;

    for (const c of s) {
        const ascii = c.charCodeAt(0);
        curr += ascii;
        curr = curr * 17;
        curr = curr % 256;
    }

    return curr;
};

console.log('result', data.map(s => hash(s)).reduce((p, c) => p + c, 0));
