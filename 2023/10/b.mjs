import fs from 'fs/promises';

//const input = await fs.readFile('exampleb1', 'utf8');
const input = await fs.readFile('input', 'utf8');

let S;
const data = input.trimEnd().split(/\r?\n/).map((r, ri) => r.split('').map((c, ci) => {
    switch (c) {
        case '|': return new Set(['n', 's']);
        case '-': return new Set(['e', 'w']);
        case 'L': return new Set(['n', 'e']);
        case 'J': return new Set(['n', 'w']);
        case '7': return new Set(['s', 'w']);
        case 'F': return new Set(['s', 'e']);
        case '.': return new Set();
        case 'S':
            S = { r: ri, c: ci };
            return new Set();
    }
}));

//console.log(data, S);

const other = (pipe, dir) => {
    const rest = [...pipe].filter(v => v !== dir);
    return rest.length === 1 ? rest[0] : undefined;
};

const move = (pos, dir) => {
    switch (dir) {
        case 'n': return pos.r > 0 ? { r: pos.r - 1, c: pos.c } : undefined;
        case 's': return pos.r < data.length - 1 ? { r: pos.r + 1, c: pos.c } : undefined;
        case 'w': return pos.c > 0 ? { r: pos.r, c: pos.c - 1 } : undefined;
        case 'e': return pos.c < data[pos.r].length - 1 ? { r: pos.r, c: pos.c + 1 } : undefined;
    }
};

const opposite = (dir) => {
    switch (dir) {
        case 'n': return 's';
        case 's': return 'n';
        case 'w': return 'e';
        case 'e': return 'w';
    }
};

const shapes = {
    n: [' * ',
        ' * ',
        '   '],
    s: ['   ',
        ' * ',
        ' * '],
    w: ['   ',
        '** ',
        '   '],
    e: ['   ',
        ' **',
        '   ']
};

const hiresInit = (hires, maxr, maxc) => {
    for (let r = 0; r < maxr * 3; r++) {
        if (hires[r] === undefined) hires[r] = [];
        for (let c = 0; c < maxc * 3; c++) {
            hires[r][c] = '.';
        }
    }
};

const hiresPut = (shape, pos, hires) => {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (shape[r][c] !== ' ') {
                hires[pos.r * 3 + r][pos.c * 3 + c] = shape[r][c];
            }
        }
    }
};

const hiresPaint = (data, pos, hires) => {
    const pipe = data[pos.r][pos.c];

    for (const dir of pipe) {
        hiresPut(shapes[dir], pos, hires);
    }
};

const options = [];
if (data[S.r - 1][S.c].has('s')) options.push([{ r: S.r - 1, c: S.c }, 's']);
if (data[S.r + 1][S.c].has('n')) options.push([{ r: S.r + 1, c: S.c }, 'n']);
if (data[S.r][S.c - 1].has('e')) options.push([{ r: S.r, c: S.c - 1 }, 'e']);
if (data[S.r][S.c + 1].has('w')) options.push([{ r: S.r, c: S.c + 1 }, 'w']);

//console.log(options);

let path = [];
const hires = [];

for (const option of options) {
    // Where we are, from which direction we came
    let [pos, dir] = option;

    let count = 0;
    let have = false;

    hiresInit(hires, data.length, data[0].length);
    hiresPut(shapes[opposite(dir)], S, hires);

    while (true) {
        const pipe = data[pos.r][pos.c];

        const otherDir = other(pipe, dir);
        if (!otherDir) break;   // the pipe we are on does not enter from this direction
        const newPos = move(pos, otherDir);
        if (!newPos) break;     // the pipe we are on exits outside of map
        const newDir = opposite(otherDir);

        hiresPaint(data, pos, hires);

        pos = newPos;
        dir = newDir;

        path[count++] = { ...pos };

        if (pos.r === S.r && pos.c === S.c) {
            have = true;
            hiresPut(shapes[dir], S, hires);
            break;
        }
    }

    if (have) break;
}

console.log(hires.map(r => r.join('')).join('\n'));

const ff = (hires) => {
    const queue = [[0, 0]];
    while (queue.length) {
        const [r, c] = queue.pop();
        if (hires[r][c] === '.') {
            hires[r][c] = 'O';
            if (r > 0) queue.push([r - 1, c]);
            if (r < hires.length - 1) queue.push([r + 1, c]);
            if (c > 0) queue.push([r, c - 1]);
            if (c < hires[r].length - 1) queue.push([r, c + 1]);
        }
    }
};

console.log();

ff(hires);

console.log(hires.map(r => r.join('')).join('\n'));

let res = 0;
for (let r = 0; r < hires.length / 3; r++) {
    for (let c = 0; c < hires[r].length / 3; c++) {
        if (hires[3 * r + 0][3 * c + 0] === '.' &&
            hires[3 * r + 0][3 * c + 1] === '.' &&
            hires[3 * r + 0][3 * c + 2] === '.' &&
            hires[3 * r + 1][3 * c + 0] === '.' &&
            hires[3 * r + 1][3 * c + 1] === '.' &&
            hires[3 * r + 1][3 * c + 2] === '.' &&
            hires[3 * r + 2][3 * c + 0] === '.' &&
            hires[3 * r + 2][3 * c + 1] === '.' &&
            hires[3 * r + 2][3 * c + 2] === '.') {

            res++;
        }
    }
}

console.log('result', res);
