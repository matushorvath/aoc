import fs from 'fs/promises';
import lcm from 'compute-lcm';

//const input = await fs.readFile('example3', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [instData, nodeData] = input.trimEnd().split(/\r?\n\r?\n/);
const inst = instData.trim().split('');
const nodes = Object.fromEntries(nodeData.trim().split(/\r?\n/).map(r => {
    const m = r.match(/(.+) = \((.+), (.+)\)/);
    return [m[1], [m[2], m[3]]];
}));

console.log(inst);
console.log(nodes);

const currs = Object.keys(nodes).filter(n => n.endsWith('A'));
const periods = [];

console.log(currs);

for (let i = 0; i < currs.length; i++) {
    let curr = currs[i];

    let cnt = 0;
    let firstZ;
    let firstCnt;

    while (true) {
        const dir = inst[cnt % inst.length] === 'L' ? 0 : 1;
        cnt++;
        curr = nodes[curr][dir];
        if (curr.endsWith('Z')) {
            if (!firstZ) {
                firstCnt = cnt;
                firstZ = curr;
            } else if ((cnt % inst.length) === (firstCnt % inst.length) && curr === firstZ) {
                periods[i] = cnt - firstCnt;
                break;
            }
        }
    }
}

console.log(periods);

console.log(lcm(...periods));
