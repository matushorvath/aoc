import fs from 'fs/promises';

//const input = await fs.readFile('examplea1', 'utf8');
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

const options = [];
if (data[S.r - 1][S.c].has('s')) options.push([{ r: S.r - 1, c: S.c }, 's']);
if (data[S.r + 1][S.c].has('n')) options.push([{ r: S.r + 1, c: S.c }, 'n']);
if (data[S.r][S.c - 1].has('e')) options.push([{ r: S.r, c: S.c - 1 }, 'e']);
if (data[S.r][S.c + 1].has('w')) options.push([{ r: S.r, c: S.c + 1 }, 'w']);

console.log(options);

for (const option of options) {
    // Where we are, from which direction we came
    let [pos, dir] = option;

    let count = 0;
    let path = [];

    while (true) {
        const pipe = data[pos.r][pos.c];

        const otherDir = other(pipe, dir);
        if (!otherDir) break;   // the pipe we are on does not enter from this direction
        const newPos = move(pos, otherDir);
        if (!newPos) break;     // the pipe we are on exits outside of map
        const newDir = opposite(otherDir);

        pos = newPos;
        dir = newDir;

        path[count++] = { ...pos };

        if (pos.r === S.r && pos.c === S.c) {
            console.log(option);
            break;
        }
    }

    console.log(path);
    console.log('result', (path.length + 1) / 2);
}
