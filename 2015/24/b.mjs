import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(Number);

// console.log(data);

const tgt = data.reduce((p, c) => p + c, 0) / 4;

const groups = [[0, [], data]];
let res;

let mincnt = Infinity;
let minqte = Infinity;

while (groups.length) {
    const [sum, group, presents] = groups.pop();
    if (sum === tgt) {
        const qte = group.reduce((p, c) => p * c, 1);
        if (group.length <= mincnt && qte < minqte) {
            mincnt = group.length;
            minqte = qte;
            res = group;

            console.log(mincnt, minqte, res);
        }
    } else {
        groups.push(...presents.filter(p => sum + p <= tgt).map((p, i) => [sum + p, [...group, p], presents.toSpliced(i, 1)]));
    }
}

console.log(res);

// literally second output it printed... algorithm did not finish either
// 74850409
