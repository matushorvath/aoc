import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

//console.log(data);

const borders = [{
    pos: { r: data.length - 1, c: data[0].length - 1 },
    cost: 0
}];

const costs = new Array(data.length).fill().map(() => []);

while (borders.length) {
    // Find minimum cost item
    borders.sort((a, b) => a.cost - b.cost);
    const { pos, cost } = borders[0];

    // This is the final cost for this item
    costs[pos.r, pos.c] = cost;

    // Check if we found the start
    if (pos.r === 0 && pos.c === 0) {
        break;
    }

    // Expand the borders
    // TODO somehow handle the >=4 <= 10



    // // Check if within bounds
    // if (cpos.r < 0 || cpos.r >= data.length || cpos.c < 0 || cpos.c >= data[0].length) {
    //     continue;
    // }

    // // Direction backwards
    // const dir = { r: cpos.r - ppos.r, c: cpos.c - ppos.c };
    // const dist = Math.abs(Math.max(dir.r, dir.c));
    // dir.r /= Math.abs(dir.r); dir.c /= Math.abs(dir.c);

    // // Calculate cost
    // const pkey = mkkey(dir.r, dir.c, len - dist);
    // let cost = costs[ppos.r][ppos.c][key];
    // if (dir.r) for (let r = ppos.r; r !== cpos.r; r += dir.r) cost += data[r][c];
    // else for (let c = ppos.c; c !== cpos.c; c += dir.c) cost += data[r][c];

    // // Check if costs lower, store if yes
    // const ckey = mkkey(dir.r, dir.c, len);
    // if (costs[cpos.r][cpos.c][key]

    // // Change direction, move by 4
    // q.push({
    //     cpos: { r: cpos.r + dir.c * 4, c: cpos.c - dir.r * 4 },
    //     ppos: cpos,
    //     len: 4
    // });
    // q.push({
    //     cpos: { r: cpos.r - dir.c * 4, c: cpos.c + dir.r * 4 },
    //     ppos: cpos,
    //     len: 4
    // });

    // // Same direction, if less than 10 moved
    // if (len < 10) {
    //     q.push({
    //         cpos: { r: cpos.r + dir.r, c: cpos.c + dir.c },
    //         ppos: cpos,
    //         len: len + 1
    //     });
    // }
}

// 1045 high
