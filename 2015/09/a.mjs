import fs from 'fs/promises';
import os from 'os';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/^(\w+) to (\w+) = (\d+)$/);
    return { src: m[1], tgt: m[2], len: Number(m[3]) };
});

// console.log(data);

const i2n = [...new Set([...data.map(d => d.src), ...data.map(d => d.tgt)])].sort();
const n2i = Object.fromEntries(i2n.map((n, i) => [n, i]));

// console.log(i2n);
// console.log(n2i);

const lens = [];
for (let i = 0; i < i2n.length; i++) {
    lens[i] = [];
    for (let j = 0; j < i2n.length; j++) {
        lens[i][j] = i === j ? 0 : data.find(({ src, tgt }) => (n2i[src] === i && n2i[tgt] === j) || (n2i[src] === j && n2i[tgt] === i)).len;
    }
}

console.log(lens);

let paths = i2n.map((n, i) => ({ done: new Set([i]), last: i, length: 0 }));

for (let i = 1; i < i2n.length; i++) {
    const new_paths = [];
    for (const path of paths) {
        for (let j = 0; j < i2n.length; j++) {
            if (!path.done.has(j)) {
                new_paths.push({
                    done: new Set([...path.done, j]),
                    last: j,
                    length: path.length + lens[path.last][j]
                });
            }
        }
    }

    paths = new_paths;
    console.log(paths);
}

console.log('result', paths.reduce((p, c) => Math.min(p, c.length), Infinity));
