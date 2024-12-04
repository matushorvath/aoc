import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const m = input.trimEnd().matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
console.log([...m].map(i => Number(i[1])*Number(i[2])).reduce((p, c) => p + c, 0));
