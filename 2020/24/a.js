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

const black = {};

for (const line of data) {
    //const line = 'nwwswee';
    const dirs = parse(line);
    console.log(line, dirs);

    const pos = [0, 0];
    for (const dir of dirs) {
        pos[0] += dir[0];
        pos[1] += dir[1];
        console.log(pos);
    }

    const key = `${pos}`;
    black[key] = !black[key];
}

console.log(Object.entries(black).reduce((p, [k, v]) => p + (v ? 1 : 0), 0));
