import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.trim().split(/\s+/).map(Number));

console.log(data);

const triangles = data.map(([a, b, c]) => a + b > c && a + c > b && b + c > a);

console.log(triangles);

console.log('result', triangles.filter(x => x).length);
