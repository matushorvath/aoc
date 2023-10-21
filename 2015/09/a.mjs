import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/^(\w+) to (\w+) = (\d+)$/);
    return { src: m[1], tgt: m[2], len: Number(m[3]) };
});

// console.log(data);

const i2n = [...new Set([...data.map(d => d.src), ...data.map(d => d.tgt)])].sort();
const n2i = Object.fromEntries(i2n.map((n, i) => [n, i]));

// console.log(i2n);
console.log(n2i);

const visited = [];
const dist = [];
const lens = [];

for (let i = 0; i < i2n.length; i++) {
    visited[i] = [];
    dist[i] = [];
    lens[i] = [];

    for (let j = 0; j < i2n.length; j++) {
        visited[i][j] = false;
        dist[i][j] = i === j ? 0 : Infinity;
        // console.log(i, j);
        lens[i][j] = i === j ? 0 : data.find(({ src, tgt }) => (n2i[src] === i && n2i[tgt] === j) || (n2i[src] === j && n2i[tgt] === i)).len;
    }
}

const mindist = (dist, visited) => {
    let min = Infinity;
    let mi, mj;

    for (let i = 0; i < dist.length; i++) {
        for (let j = 0; j < dist.length; j++) {
            if (!visited[i][j] && dist[i][j] <= min) {
                mi = i; mj = j; min = dist[i][j];
            }
        }
    }

    return [mi, mj];
};

while (true) {
    let [csrc, ctgt] = mindist(dist, visited);
    if (csrc === undefined && ctgt === undefined) break;

    for (let j = 0; j < dist.length; j++) {
        if (j !== ctgt) {
            dist[csrc][j] = Math.min(dist[csrc][j], dist[csrc][ctgt] + lens[ctgt][j]);
        }
    }

    visited[csrc][ctgt] = true;
    console.log(visited, dist);
}

console.log(visited, dist);
