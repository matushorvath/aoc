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
`, `
.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....X...###..
..#.#.....#....##
`
];

type Vec = { x: number, y: number };

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = samples[4];
    const field = input.trim().split(/\r?\n/);
    const rocks = field.reduce((fr, r, y) => [...fr, ...r.split('').reduce((fp, p, x) => p === '#' ? [...fp, { x, y }] : fp, [])], [])

    let max = 0;
    let lrock: Vec;
    let ldirs: { [key: string]: { d: Vec, r: Vec[] } };

    // const rock1 = { x: 8, y: 3 }; // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // {
    for (const rock1 of rocks) {
        //console.log('\n', rock1);

        const dirs: { [key: string]: { d: Vec, r: Vec[] } } = {};

        for (const rock2 of rocks) {
            if (rock1.x !== rock2.x || rock1.y !== rock2.y) {
                let x = rock2.x - rock1.x;
                let y = rock2.y - rock1.y;
                const gcd = mathjs.gcd(x, y);

                const dir = { x: x / gcd, y: y / gcd };
                const key = JSON.stringify(dir);

                if (key in dirs) {
                    dirs[key].r.push(rock2);
                } else {
                    dirs[key] = { d: dir, r: [rock2] };
                }
            }
        }

        const len = Object.keys(dirs).length;
        //console.log(len);

        if (len > max) {
            max = len;
            lrock = rock1;
            ldirs = dirs;
        }
    }

    console.log(max, lrock);

    // sort rocks in each direction by distance
    for (const dir of Object.values(ldirs)) {
        dir.r.sort((rock1, rock2) =>
            Math.abs(rock1.x - lrock.x) - Math.abs(rock2.x - lrock.x) + 
            Math.abs(rock1.y - lrock.y) - Math.abs(rock2.y - lrock.y)
        ).reverse();
    }

    // sort directions by angle
    const lcm = Object.values(ldirs).reduce((p, c) => mathjs.lcm(p, c.d.x || 1), 1);

    const order = Object.keys(ldirs);
    console.log(order);

    order.sort((o1, o2) => Math.atan2(-ldirs[o1].d.x, ldirs[o1].d.y) - Math.atan2(-ldirs[o2].d.x, ldirs[o2].d.y));
    /*{
        if ((ldirs[o1].d.x > 0) !== (ldirs[o2].d.x > 0)) {
            const val = ldirs[o2].d.x - ldirs[o1].d.x;
            console.log(ldirs[o1], ldirs[o2], 'mix', val);
            return val;
        } else {
            const val = ldirs[o1].d.y * lcm / ldirs[o1].d.x - ldirs[o2].d.y * lcm / ldirs[o2].d.x;
            console.log(ldirs[o1], ldirs[o2], 'sam', val);
            return val;
        }
    });*/

    console.log('\n');
    order.map(o => console.log(ldirs[o]));

    console.log('\n');

    let index = 0;
    let changed = true;
    while (changed) {
        changed = false;
        for (const dir of order.map(o => ldirs[o])) {
            if (dir.r.length > 0) {
                changed = true;
                index += 1;
                console.log(index, dir.r.pop());
            }
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
