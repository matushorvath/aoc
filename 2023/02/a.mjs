import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/Game (\d+): (.*)/);
    return {
        id: Number(m[1]),
        sets: m[2].split('; ').map(g => g.split(', ').map(c => {
            const n = c.match(/(\d+) (.+)/);
            return { count: Number(n[1]), color: n[2] };
        }))
    };
});

const limits = {
    red: 12,
    green: 13,
    blue: 14
}

console.log(JSON.stringify(data, undefined, 2));

let score = 0;

for (const game of data) {
    let can = true;

    for (const set of game.sets) {
        const used = {};
        for (const color of set) {
            used[color.color] = (used[color.color] ?? 0) + color.count;
        }

        //console.log(JSON.stringify(used, undefined, 2));

        for (const color of Object.keys(used)) {
            if (limits[color] === undefined || limits[color] < used[color]) {
                can = false;
                break;
            }
        }
    }

    console.log(can);

    if (can) {
        score += game.id;
    }
}

console.log('result', score);

// 411 wrong
