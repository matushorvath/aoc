const data = require('fs').readFileSync('input', 'utf8').trim().split('\n');

// w-e      [-1, 0] [1, 0]
// sw-ne    [0, -1] [0, 1]
// nw-se    [-1, 1] [1, -1]

const parse = (line) => {
    const dirs = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === 'w') {
            dirs.push([-1, 0]);
        } else if (line[i] === 'e') {
            dirs.push([1, 0]);
        } else if (line[i] === 's') {
            i++;
            if (line[i] === 'w') {
                dirs.push([0, -1]);
            } else if (line[i] === 'e') {
                dirs.push([1, -1]);
            }
        } else if (line[i] === 'n') {
            i++;
            if (line[i] === 'w') {
                dirs.push([-1, 1]);
            } else if (line[i] === 'e') {
                dirs.push([0, 1]);
            }
        }
    }
    return dirs;
};

let floor = {};

for (const line of data) {
    //const line = 'nwwswee';
    const dirs = parse(line);
    //console.log(line, dirs);

    const pos = [0, 0];
    for (const dir of dirs) {
        pos[0] += dir[0];
        pos[1] += dir[1];
        //console.log(pos);
    }

    if (!floor[pos[0]]) {
        floor[pos[0]] = {};
    }
    floor[pos[0]][pos[1]] = !floor[pos[0]][pos[1]]
}

const deepCopy = (floor) => {
    const out = {};
    for (const [rk, rv] of Object.entries(floor)) {
        out[rk] = { ...rv };
    }
    return out;
};

const neigh = (floor, r, c) => {
    return ((floor[r - 1] && floor[r - 1][c]) ? 1 : 0)
        + ((floor[r + 1] && floor[r + 1][c]) ? 1 : 0)
        + ((floor[r] && floor[r][c - 1]) ? 1 : 0)
        + ((floor[r] && floor[r][c + 1]) ? 1 : 0)
        + ((floor[r - 1] && floor[r - 1][c + 1]) ? 1 : 0)
        + ((floor[r + 1] && floor[r + 1][c - 1]) ? 1 : 0);
};

for (let i = 0; i < 100; i++) {
    console.log(
        Object.values(floor).reduce((p, r) => p + 
            Object.values(r).reduce((q, c) => q + (c ? 1 : 0), 0), 0)
    );

    const newFloor = deepCopy(floor);

//     {
//     let [rn, rx, cn, cx] = [0, 0, 0, 0];
//     for (const r of Object.keys(floor)) {
//         const rt = parseInt(r);
//         if (rt < rn) {
//             rn = rt;
//         }
//         if (rt > rx) {
//             rx = rt;
//         }
//         for (const c of Object.keys(floor[r])) {
//             const ct = parseInt(c);
//             if (ct < cn) {
//                 cn = ct;
//             }
//             if (ct > cx) {
//                 cx = ct;
//             }
//         }
//     }
//     console.log(rn, rx, cn, cx);
// }

    const rn = Object.keys(floor).reduce((p, c) => parseInt(c) < p ? parseInt(c) : p, 0);
    const rx = Object.keys(floor).reduce((p, c) => parseInt(c) > p ? parseInt(c) : p, 0);

    const cn = Object.values(floor).reduce((p, c) => {
        const tmp = Object.keys(c).reduce((q, d) => parseInt(d) < q ? parseInt(d) : q, 0);
        return tmp < p ? tmp : p;
    }, 0);
    const cx = Object.values(floor).reduce((p, c) => {
        const tmp = Object.keys(c).reduce((q, d) => parseInt(d) > q ? parseInt(d) : q, 0);
        return tmp > p ? tmp : p;
    }, 0);

    //console.log(floor);
    //console.log(rn, rx, cn, cx);
    //const [rn, rx, cn, cx] = [-1000, 1000, -1000, 1000];

    for (let r = rn - 1; r <= rx + 1; r++) {
        for (let c = cn - 1; c <= cx + 1; c++) {
            const n = neigh(floor, r, c);
            if (floor[r] && floor[r][c] && (n === 0 || n > 2)) {
                if (!newFloor[r]) {
                    newFloor[r] = {};
                }
                newFloor[r][c] = false;
            } else if ((!floor[r] || !floor[r][c]) && n === 2) {
                if (!newFloor[r]) {
                    newFloor[r] = {};
                }
                newFloor[r][c] = true;
            }
        }
    }

    floor = newFloor;
}

//console.log(floor);

console.log(
    Object.values(floor).reduce((p, r) => p + 
        Object.values(r).reduce((q, c) => q + (c ? 1 : 0), 0), 0)
);
