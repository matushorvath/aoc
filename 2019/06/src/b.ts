import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    /*const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;*/

    const lines = input.trimRight().split(/\r?\n/);
    const orbits: { [key: string]: Set<string> } = {};

    for (const line of lines) {
        const m = line.match(/(.+)\)(.+)/);
        if (orbits[m[2]] === undefined) {
            orbits[m[2]] = new Set<string>();
         }
         orbits[m[2]].add(m[1]);
    }

    console.log(orbits);

    let changed = true;
    while (changed) {
        changed = false;
        for (const orbiter of Object.keys(orbits)) {
            for (const orbited of orbits[orbiter]) {
                const count = orbits[orbiter].size;
                if (orbits[orbited]) {
                    orbits[orbited].forEach(pl => orbits[orbiter].add(pl));
                }
                if (count !== orbits[orbiter].size) {
                    changed = true;
                }
            }
        }

        //console.log(orbits);
    }

    //console.log(Object.keys(orbits).reduce((t1, c1) => t1 + Array.from(orbits[c1]).reduce((t2, c2) => t2 + 1, 0), 0));
    console.log(
        [...orbits['YOU']].filter(p => !orbits['SAN'].has(p)).length +
        [...orbits['SAN']].filter(p => !orbits['YOU'].has(p)).length);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
