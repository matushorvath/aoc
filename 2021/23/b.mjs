'use strict';

import fs from 'fs/promises';

const getenergy = type => 10 ** type;
const getdesty = type => 3 + type * 2;

//const print = data => console.log(data.map(row => row.join('')).join('\n'));
const print = (data, pos) => {
    let out = data.map(row => row.map(ch => ch >= 'A' && ch <= 'D' ? '.' : ch));
    for (const { t, x, y } of pos) {
        out[x][y] = String.fromCharCode('A'.charCodeAt(0) + t);
    }
    console.log(out.map(row => row.join('')).join('\n'));
};

//const clone = data => [...data.map(row => [...row])];
const clone = pos => [...pos.map(am => ({ ...am }))];

const mkkey = (pos, moved) => `${moved} ` + pos.map(({ t, x, y }) => `${t},${x},${y}`).join(' ');

const occ = (pos, ox, oy) => pos.find(({ x, y }) => ox === x && oy === y);

const main = async () => {
    //const input = await fs.readFile('inputa.done', 'utf8');
    const input = await fs.readFile('examplea', 'utf8');
    //const input = await fs.readFile('exampleb', 'utf8');
    //const input = await fs.readFile('inputa', 'utf8');
    //const input = await fs.readFile('inputb', 'utf8');

    const data = input.trimEnd().split(/\r?\n/).map(l => l.split(''));

    const initpos = [];
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (data[x][y] >= 'A' && data[x][y] <= 'D') {
                const t = data[x][y].charCodeAt(0) - 'A'.charCodeAt(0);
                initpos.push({ t, x, y });
            }
        }
    }

    //console.log(initpos);

    const MAXX = data.length - 2;

    const todo = [];
    todo.push({ pos: initpos, moved: -1, energy: 0 });

    const seen = {};
    let minenergy = Infinity;

    let iter = 0;

    let state;
    while (state = todo.pop()) {
        const { pos, moved, energy } = state;

        if (energy > minenergy) continue;

        const key = mkkey(pos, moved);
        if (seen[key] && seen[key] < energy) continue;
        seen[key] = energy;

        if (pos.every(({ t, x, y }) => x >= 2 && y === getdesty(t))) {
            minenergy = energy;
            continue;
        }

        iter++;
        if (iter % 100000 === 0) {
            print(data, pos); console.log(moved, energy, '\n', 'iter', iter, 'todo', todo.length, 'mine', minenergy, '\n');
        }

        for (let i = 0; i < pos.length; i++) {
            const { t, x, y } = pos[i];
            const nenergy = energy + getenergy(t);
            const desty = getdesty(t);

            if (x >= 2) {
                // A in room:
                let canMoveUp = true
                if (y === desty) {
                    canMoveUp = pos.every(({ ot, ox, oy }) => oy !== desty || ox < x || ot === t);
                }

                // - within this room
                if (x < MAXX && !occ(pos, x + 1, y)) {
                    const npos = clone(pos);
                    npos[i].x = x + 1;
                    todo.push({ pos: npos, moved: -1, energy: nenergy });
                }
                if (canMoveUp && x > 2 && !occ(pos, x - 1, y)) {
                    const npos = clone(pos);
                    npos[i].x = x - 1;
                    todo.push({ pos: npos, moved: -1, energy: nenergy });
                }

                // - to hallway but not in front of any exit
                // TODO optimize: stay in its own room unless there's foreigners below
                // TODO optimize: if we move to left or right end, move as far as possible only (don't move to y = 2 if y = 1 is free)
                if (canMoveUp && x === 2 && !occ(pos, x - 1, y - 1)) {
                    const npos = clone(pos);
                    npos[i].x = x - 1; npos[i].y = y - 1;
                    todo.push({ pos: npos, moved: i, energy: nenergy });
                }
                if (canMoveUp && x === 2 && !occ(pos, x - 1, y + 1)) {
                    const npos = clone(pos);
                    npos[i].x = x - 1; npos[i].y = y + 1;
                    todo.push({ pos: npos, moved: i, energy: nenergy });
                }
            } else if (x === 1) {
                // A in hallway:
                // - to target room unless it has any foreigners
                if ((y === desty - 1 || y === desty + 1) && !occ(pos, 1, desty) && !occ(pos, 2, desty)
                        && pos.every(({ ot, oy }) => oy !== desty || ot === t)) {
                    const npos = clone(pos);
                    npos[i].x = 2; npos[i].y = desty;
                    todo.push({ pos: npos, moved: -1, energy: nenergy });
                }
                // TODO move as far down as possible, stay there

                if (moved === i) {
                    // A in hallway, last that moved:
                    // - to hallway but not in front of any exit
                    if ((y === 2 || y === 4 || y === 6 || y === 8) && !occ(pos, 1, y + 1) && !occ(pos, 1, y + 2)) {
                        // Move by 2, so we don't stop in front of exit
                        const npos = clone(pos);
                        npos[i].x = 1; npos[i].y = y + 2;
                        todo.push({ pos: npos, moved: i, energy: nenergy });
                    } else if (y < 11 && !occ(pos, 1, y + 1)) {
                        const npos = clone(pos);
                        npos[i].x = 1; npos[i].y = y + 1;
                        todo.push({ pos: npos, moved: i, energy: nenergy });
                    }

                    if ((y === 4 || y === 6 || y === 8 || y === 10) && !occ(pos, 1, y - 1) && !occ(pos, 1, y - 2)) {
                        // Move by 2, so we don't stop in front of exit
                        const npos = clone(pos);
                        npos[i].x = 1; npos[i].y = y - 2;
                        todo.push({ pos: npos, moved: i, energy: nenergy });
                    } else if (y > 1 && !occ(pos, 1, y - 1)) {
                        const npos = clone(pos);
                        npos[i].x = 1; npos[i].y = y - 1;
                        todo.push({ pos: npos, moved: i, energy: nenergy });
                    }
                }
            }
        }
    }

    console.log(minenergy);
};

await main();
