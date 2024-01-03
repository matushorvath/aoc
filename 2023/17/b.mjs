import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('exampleb2', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

//console.log(data);

const init = {
    pos: { r: data.length - 1, c: data[0].length - 1 },
    len: 10,
    cost: 0,
    path: []
};

// Current cost if we are in position 'pos', with >= 'len' steps remaining in direction 'dir'
const borders = [{...init, dir: { r: 1, c: 0 } }, {...init, dir: { r: 0, c: 1 } }, ];

// Minimum costs for given [r][c][dirkey][len] (applies also for all unspecified longer lengths)
const mkdirkey = dir => (dir.r + 1) * 10 + (dir.c + 1);
const costs = new Array(data.length).fill().map(
    () => new Array(data[0].length).fill().map(
        () => ({})));

let itr = 0;

big_while: while (borders.length) {
    // Find minimum cost item
    borders.sort((a, b) => a.cost - b.cost);
    const { pos, dir, len, cost, path } = borders.shift();

    // Check if within bounds
    if (pos.r < 0 || pos.r >= data.length || pos.c < 0 || pos.c >= data[0].length) {
        continue;
    }

    // Check if we alredy have the minimum for this
    const dirkey = mkdirkey(dir);
    if (costs[pos.r][pos.c][dirkey] === undefined) costs[pos.r][pos.c][dirkey] = {};
    const havelens = costs[pos.r][pos.c][dirkey];

    for (const havelen in havelens) {
        if (Number(havelen) <= len && havelens[havelen] <= cost) {
            continue big_while;
        }
    }

    // This is the final cost for this position and direction at >= this length
    for (const havelen in havelens) {
        if (Number(havelen) >= len && havelens[havelen] >= cost) {
            delete havelens[havelen];
        }
    }
    havelens[len] = cost;

    if (itr++ % 1000 === 0) console.log(itr, borders.length);

    // Check if we found the start
    if (pos.r === 0 && pos.c === 0) {
        // TODO probably not break, only break if we have found start with length 10
        // TODO otherwise it's possible to find a less restricted state with better cost
        console.log('cost for start', cost, path);
        break;
    }

    // Expand the borders

    // Same direction, if it does not require len more than 10
    if (len < 10) {
        borders.push({
            pos: { r: pos.r - dir.r, c: pos.c - dir.c },
            dir,
            len: len + 1,
            cost: cost + data[pos.r][pos.c],
            path: [...path, pos]
        });
    }

    // Change direction, move by 4
    const addItem4 = (ndir) => {
        const item = {
            pos: { r: pos.r - ndir.r * 4, c: pos.c - ndir.c * 4},
            dir: ndir,
            len: 4,
            cost: cost,
            path: [...path, pos]
        }

        for (let i = 0; i < 4; i++) {
            item.cost += data[pos.r - ndir.r * i]?.[pos.c - ndir.c * i];
        }

        if (!isNaN(item.cost)) {
            borders.push(item);
        }
    };

    addItem4({ r: dir.c, c: -dir.r });
    addItem4({ r: -dir.c, c: dir.r });
}

// 1045 high
