import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const g = r.split(': ');
    return {
        id: Number(g[0].split(' ')[1]),
        sets: g[1].split('; ').map(ss => ss.split(', ').map(cs => {
            const c = cs.split(' ');
            return {
                count: Number(c[0]),
                color: c[1]
            };
        }))
    };
});

console.log(JSON.stringify(data, undefined, 2));

let score = 0;

for (const game of data) {
    const min = {};
    for (const set of game.sets) {
        const used = {};

        for (const color of set) {
            used[color.color] = (used[color.color] ?? 0) + color.count;
        }

        for (const color of Object.keys(used)) {
            min[color] = Math.max(min[color] ?? 0, used[color]);
        }

        //console.log(JSON.stringify(used, undefined, 2));
    }

    const power = (min['red'] ?? 0) * (min['green'] ?? 0) * (min['blue'] ?? 0);
    score += power;
}

console.log('result', score);

// 411 wrong
