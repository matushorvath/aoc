import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

type Dir = { x: number, y: number };

const equalDir = (d1: Dir, d2: Dir) => {
    return d1.x === d2.x && d1.y === d2.y;
};

const samples = [`
.#..#
.....
#####
....#
...##
`, `
......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####
`, `
#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.
`, `
.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..
`, `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`
];

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = samples[4];
    const field = input.trim().split(/\r?\n/);
    const rocks = field.reduce((fr, r, y) => [...fr, ...r.split('').reduce((fp, p, x) => p === '#' ? [...fp, { x, y }] : fp, [])], [])

    //console.log(rocks);

    let max = 0;

    for (const rock1 of rocks) {
        const dirs: { [key: string]: Dir & { r: Dir[] } } = {};
        for (const rock2 of rocks) {
            if (!equalDir(rock1, rock2)) {
                let x = rock2.x - rock1.x;
                let y = rock2.y - rock1.y;
                const gcd = mathjs.gcd(x, y);

                const dir = { x: x / gcd, y: y / gcd };

                const key = JSON.stringify(dir);
                if (key in dirs) {
                    dirs[key].r.push(rock2);
                } else {
                    dirs[key] = { ...dir, r: [rock2] };
                }

                //console.log(rock1, rock2, dir);
            }
        }

        const len = Object.keys(dirs).length;
        //console.log(rock1, len);
        //Object.values(dirs).map(d => console.log(d));
        max = Math.max(max, len);
    }

    console.log(max);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
