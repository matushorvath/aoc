import { promises as fs } from 'fs';
import * as mathjs from 'mathjs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
/*    const input = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>
`;*/
/*    const input = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>
`;*/

    const moons = input.trimRight().split(/\r?\n/)
        .map(l => l.match(/<x=([^,]+), y=([^,]+), z=([^,]+)>/))
        .map(m => ({ pos: [Number(m[1]), Number(m[2]), Number(m[3])], vel: [0, 0, 0] }));

    console.log(0, moons);
    const firstMoons = moons.map(m => ({ pos: [...m.pos], vel: [...m.vel] }));

    const dir = (s: number) => s > 0 ? 1 : s < 0 ? -1 : 0;

    let steps = [0, 0, 0];

    for (let i = 0; i < 3; i += 1) {
        while (true) {
            const oldMoons = moons.map(m => ({ pos: [...m.pos], vel: [...m.vel] }));

            for (const moon1 of moons) {
                for (const moon2 of oldMoons) {
                    moon1.vel[i] = moon1.vel[i] + dir(moon2.pos[i] - moon1.pos[i]);
                }
                moon1.pos[i] = moon1.pos[i] + moon1.vel[i];
            }
//            console.log(step + 1, moons);

            steps[i] += 1;

            if (moons.reduce((p, c, mi) => p &&
                c.pos[i] === firstMoons[mi].pos[i] &&
                c.vel[i] === firstMoons[mi].vel[i], true)) {

                break;
            }
        }

        console.log(i, steps[i]);
    }

    console.log(steps.reduce((p, c) => mathjs.lcm(p, c), 1));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
