import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
/*    const input = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>
`;*/

    const moons = input.trimRight().split(/\r?\n/)
        .map(l => l.match(/<x=([^,]+), y=([^,]+), z=([^,]+)>/))
        .map(m => ({ pos: [Number(m[1]), Number(m[2]), Number(m[3])], vel: [0, 0, 0] }));

    console.log(0, moons);

    const dir = (s: number) => s > 0 ? 1 : s < 0 ? -1 : 0;

    for (let step = 0; step < 1000; step += 1) {
        const oldMoons = moons.map(m => ({ pos: [...m.pos], vel: [...m.vel] }));
        for (const moon1 of moons) {
            for (const moon2 of oldMoons) {
                moon1.vel = [0, 1, 2].map(i => moon1.vel[i] + dir(moon2.pos[i] - moon1.pos[i]));
            }
            moon1.pos = [0, 1, 2].map(i => moon1.pos[i] + moon1.vel[i]);
        }
        console.log(step + 1, moons);
    }

    let energy = 0;

    for (const moon of moons) {
        const pot = moon.pos.reduce((p, c) => p + Math.abs(c), 0);
        const kin = moon.vel.reduce((p, c) => p + Math.abs(c), 0);
        energy += pot * kin;

        console.log(pot, kin, energy);
    }

    console.log(energy);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
