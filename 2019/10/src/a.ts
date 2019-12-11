import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

type Dir = { x: number, y: number };

const equalDir = (d1: Dir, d2: Dir) => {
    return d1.x === d2.x && d1.y === d2.y;
};

const compareDir = (d1: Dir, d2: Dir) => {
    if (d1.y === 0 && d2.y === 0) return d1.x - d2.x;
    else if (d1.y === 0) return 1;
    else if (d2.y === 0) return -1;
    else return d1.x / d1.y - d2.x / d2.y;
};

// const getDirs = (xmax: number, ymax: number) => {
//     const dirs: Dir[] = [];

//     for (let x = 0; x < xmax; x += 1) {
//         for (let y = 0; y < ymax; y += 1) {
//             if (x !== 0 || y !== 0) {
//                 const gcd = mathjs.gcd(x, y) || 1;
//                 console.log(x, y, gcd);
//                 dirs.push({ x: x / gcd, y: y / gcd });
//             }
//         }
//     }

//     dirs.sort(compareDir);
//     return dirs.reduce((p, c) => equalDir(p[p.length - 1], c) ? p : [...p, c], [dirs[0]]);
// };

const main = async () => {
    //const input = await fs.readFile('input', 'utf8');
    const input = `
.#..#
.....
#####
....#
...##
`;
    const field = input.trim().split(/\r?\n/);
    const rocks = field.reduce((fr, r, y) => [...fr, ...r.split('').reduce((fp, p, x) => p === '#' ? [...fp, { x, y }] : fp, [])], [])

    console.log(rocks);

    for (const rock1 of rocks) {
        const dirs: Dir[] = [];
        for (const rock2 of rocks) {
            if (!equalDir(rock1, rock2)) {
                let x = rock1.x - rock2.x;
                let y = rock1.y - rock2.y;
                //if (x < 0 || (x === 0 && y < 0)) { x = -x; y = -y; }
                const gcd = mathjs.gcd(x, y);

                const dir = { x: x / gcd, y: y / gcd };
                dirs.push(dir);

                console.log(rock1, rock2, dir);
            }
        }

        dirs.sort(compareDir);
        const uniqueDirs = dirs.reduce((p, c) => equalDir(p[p.length - 1], c) ? p : [...p, c], [dirs[0]]);

        console.log(rock1, uniqueDirs, uniqueDirs.length);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
