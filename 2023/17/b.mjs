import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

//console.log(data);

const q = [{
    cpos: { r: data.length - 5, c: data[0].length - 1 },
    ppos: { r: data.length - 1, c: data[0].length - 1 },
    len: 4
}, {
    cpos: { r: data.length - 1, c: data[0].length - 5 },
    ppos: { r: data.length - 1, c: data[0].length - 1 },
    len: 4
}];

const mmkey = (r, c, l) => ((r + 1) * 100 + (c + 1)) * 100 + l;
const costs = new Array(data.length).fill().map(() => new Array(data[0].length).fill().map(() => {}));

for (let len = 4; len <= 10; len++) costs[data.length][data[0].length][mkkey(-1, 0, len)] = 0;

while (q.length) {
    const { cpos, ppos, len } = q.pop();

    // Check if within bounds
    if (cpos.r < 0 || cpos.r >= data.length || cpos.c < 0 || cpos.c >= data[0].length) {
        continue;
    }

    // Direction backwards
    const dir = { r: cpos.r - ppos.r, c: cpos.c - ppos.c };
    const dist = Math.abs(Math.max(dir.r, dir.c));
    dir.r /= Math.abs(dir.r); dir.c /= Math.abs(dir.c);

    // Calculate cost
    const pkey = mkkey(dir.r, dir.c, len - dist);
    let cost = costs[ppos.r][ppos.c][key];
    if (dir.r) for (let r = ppos.r; r !== cpos.r; r += dir.r) cost += data[r][c];
    else for (let c = ppos.c; c !== cpos.c; c += dir.c) cost += data[r][c];

    // Check if costs lower, store if yes
    const ckey = mkkey(dir.r, dir.c, len);
    if (costs[cpos.r][cpos.c][key]

    // Change direction, move by 4
    q.push({
        cpos: { r: cpos.r + dir.c * 4, c: cpos.c - dir.r * 4 },
        ppos: cpos,
        len: 4
    });
    q.push({
        cpos: { r: cpos.r - dir.c * 4, c: cpos.c + dir.r * 4 },
        ppos: cpos,
        len: 4
    });

    // Same direction, if less than 10 moved
    if (len < 10) {
        q.push({
            cpos: { r: cpos.r + dir.r, c: cpos.c + dir.c },
            ppos: cpos,
            len: len + 1
        });
    }
}

// 1045 high
