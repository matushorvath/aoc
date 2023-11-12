import fs from 'fs/promises';

const input = await fs.readFile('input', 'utf8');

const data = Object.fromEntries(input.trimEnd().split(/\r?\n/).map(r => {
    const m1 = r.match(/Sue (\d+): (.*)/);
    const m2 = m1[2].matchAll(/(\w+): (\d+)/g);

    return [
        Number(m1[1]),
        Object.fromEntries([...m2].map(([_, name, count]) => [name, Number(count)]))
    ];
}));

const pat = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

console.log(JSON.stringify(data, undefined, 2));

sue_loop: for (const [id, sue] of Object.entries(data)) {
    for (const obj of Object.keys(pat)) {
        if (obj in sue) {
            if (obj === 'cats' || obj === 'trees') {
                if (sue[obj] <= pat[obj]) {
                    continue sue_loop;
                }
            } else if (obj === 'pomeranians' || obj === 'goldfish') {
                if (sue[obj] >= pat[obj]) {
                    continue sue_loop;
                }
            } else {
                if (sue[obj] !== pat[obj]) {
                    continue sue_loop;
                }
            }
        }
    }
    console.log('result', id);
}

//console.log('result', max);
