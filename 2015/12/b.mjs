import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const json = JSON.parse(input);

let sum = 0;
const queue = [json];

while (queue.length > 0) {
    const o = queue.pop();
    if (Array.isArray(o)) {
        queue.push(...o);
    } else if (typeof o === 'object') {
        if (Object.values(o).some(v => v === 'red')) {
            continue;
        }
        queue.push(Object.values(o));
    } else if (typeof o === 'number') {
        sum += o;
    }
}

console.log('result', sum);
