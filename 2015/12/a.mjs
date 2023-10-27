import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const m = input.match(/-?[0-9]+/g).map(Number).reduce((p, c) => p + c, 0);

console.log('result', m);
