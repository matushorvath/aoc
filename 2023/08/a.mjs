import fs from 'fs/promises';

//const input = await fs.readFile('example2', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [instData, nodeData] = input.trimEnd().split(/\r?\n\r?\n/);
const inst = instData.trim().split('');
const nodes = Object.fromEntries(nodeData.trim().split(/\r?\n/).map(r => {
    const m = r.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
    return [m[1], [m[2], m[3]]];
}));

console.log(inst);
console.log(nodes);

let cnt = 0;
let curr = 'AAA';

while (true) {
    const dir = inst[cnt % inst.length] === 'L' ? 0 : 1;
    cnt++;
    curr = nodes[curr][dir];
    if (curr === 'ZZZ') break;
}

console.log('result', cnt);
