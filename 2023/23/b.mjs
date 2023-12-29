import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(c => c === '#' ? '#' : '.'));

//console.log(data);

const printmap = (map, vertices = undefined) => {
    const out = [];
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
            const v = vertices ? getvertex(vertices, r, c) : undefined;
            out.push(v !== undefined ? v : map[r][c]);
        }
        out.push('\n');
    }
    console.log(out.join(''));
};

// Detect and number vertices
const mkkey = (r, c) => r * 1000 + c;  //r * data[0].length + c;

let nextVertex = 0;
const addvertex = (vertices, r, c) => {
    vertices[mkkey(r, c)] = nextVertex++;
};
const getvertex = (vertices, r, c) => {
    return vertices[mkkey(r, c)];
};

const vertices = {};

const startc = data[0].findIndex(c => c === '.');
const stopc = data[data.length - 1].findIndex(c => c === '.');

addvertex(vertices, 0, startc);
addvertex(vertices, data.length - 1, stopc);

for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
        if (data[r][c] === '.') {
            const n = data[r - 1]?.[c] === '.';
            const s = data[r + 1]?.[c] === '.';
            const w = data[r]?.[c - 1] === '.';
            const e = data[r]?.[c + 1] === '.';
            if (n + s + w + e > 2) {
                addvertex(vertices, r, c);
            }
        }
    }
}

//console.log(vertices);

//printmap(data, vertices);

// Build graph
const graph = {};

const tryadd = (q, r, c, lastv, len) => {
    if (r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
        return;
    }

    const thisv = getvertex(vertices, r, c);
    if (thisv && lastv !== thisv) {
        if (!graph[thisv]) graph[thisv] = [];
        graph[thisv].push({ v: lastv, l: len });
        if (!graph[lastv]) graph[lastv] = [];
        graph[lastv].push({ v: thisv, l: len });

        lastv = thisv;
        len = 0;
    }

    if (data[r][c] === '#' || data[r][c] === 'O') {
        return;
    }

    q.push({ r, c, lastv, len: len });
};

const q = [{ r: 0, c: startc, lastv: 0, len: 0 }];

while (q.length) {
    const { r, c, lastv, len } = q.pop();

    data[r][c] = 'O';

    tryadd(q, r - 1, c, lastv, len + 1);
    tryadd(q, r + 1, c, lastv, len + 1);
    tryadd(q, r, c - 1, lastv, len + 1);
    tryadd(q, r, c + 1, lastv, len + 1);
}

//console.log(graph);

// Find longest path

const gq = [{ visited: [0], len: 0 }];
let max = 0;
let maxp;

while (gq.length) {
    const { visited, len } = gq.pop();
    const lastv = visited[visited.length - 1];

    if (lastv === 1) {
        if (len > max) {
            max = len;
            maxp = visited;
            console.log(max, gq.length);
        }
    }

    for (const { v: thisv, l: addlen } of graph[lastv]) {
        if (addlen !== undefined && visited.indexOf(thisv) < 0) {
            gq.push({ visited: [...visited, thisv], len: len + addlen });
        }
    }
}

//console.log(maxp);

console.log('result', max);

// 4914 low
// 5450 low
// 5910 low
// 6030 low 3:43
// 6042 WA 4:14
// 6290 WA 4:34
// 6502 WA 4:58
// 6602 WA 13:33
