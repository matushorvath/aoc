import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

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
    const field = input.trim().split(/\r?\n/);
    const rocks = field.reduce((fr, r, y) => [...fr, ...r.split('').reduce((fp, p, x) => p === '#' ? [...fp, { x, y }] : fp, [])], [])

    let max = 0;

    for (const rock1 of rocks) {
        const dirs: { x: number, y: number }[] = [];

        for (const rock2 of rocks) {
            if (rock1.x !== rock2.x || rock1.y !== rock2.y) {
                let x = rock2.x - rock1.x;
                let y = rock2.y - rock1.y;
                const gcd = mathjs.gcd(x, y);

                const dir = { x: x / gcd, y: y / gcd };
                dirs[dir.x * 100 + dir.y] = dir;
            }
        }

        const len = Object.keys(dirs).length;
        max = Math.max(max, len);
    }

    console.log(max);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
