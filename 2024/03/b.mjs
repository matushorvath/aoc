import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

console.log(input.trimEnd().replaceAll(/don't\(\).*?do\(\)/g, 'X'));

const m = input.trimEnd().replaceAll(/don't\(\).*?do\(\)/g, '').matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

// //console.log([...m]);

console.log([...m].map(i => Number(i[1])*Number(i[2])).reduce((p, c) => p + c, 0));


// 101876167 high
