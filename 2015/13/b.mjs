import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

let next = 0;
const people = {};

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/);

    const p1 = people[m[1]] ?? (people[m[1]] = next++);
    const p2 = people[m[4]] ?? (people[m[4]] = next++);
    const h = m[2] === 'gain' ? Number(m[3]) : -Number(m[3]);

    return { p1, p2, h };
});

data.push(...Object.keys(people).map(p => ({ p1: people[p], p2: next, h: 0 })));
data.push(...Object.keys(people).map(p => ({ p1: next, p2: people[p], h: 0 })));
people['me'] = next++;

const map = Object.fromEntries(data.map(({ p1, p2, h }) => [`${p1}.${p2}`, h]));

console.log(data, people, map);

const permutations = (input) => {
    const permute = (available, prefix = []) =>
        available.length === 0 ? [prefix] : available.flatMap((next, i) => {
            let newAvailable = [...available];
            newAvailable.splice(i, 1);
            return permute(newAvailable, [...prefix, next]);
        });

    return permute(input);
}

const perms = permutations([...new Array(Object.keys(people).length)].map((_,i)=>i));

console.log(perms, perms.length);

const vals = perms.map(perm => perm.reduce((p, _, i) => p
    + map[`${perm[i]}.${perm[(i + 1) % perm.length]}`]
    + map[`${perm[(i + 1) % perm.length]}.${perm[i]}`],
0));

console.log(vals);

let max = -Infinity;
for (let v of vals) if (v > max) max = v;

console.log('result', max);
