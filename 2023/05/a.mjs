import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const [seedData, ...mapData] = input.trimEnd().split(/\r?\n\r?\n/);
const seeds = seedData.split(':', 2)[1].trim().split(/\s+/).map(Number);
const maps = mapData.map(b => {
    const [head, rest] = b.split(':');
    const [from, to] = head.match(/(.*)-to-(.*) map/).slice(1, 3);
    const rules = rest.trim().split(/\r?\n/).map(r => r.split(/\s+/).map(Number)).map(r => ({ dst: r[0], src: r[1], len: r[2] }));
    return { from, to, rules };
});

console.log(seeds, JSON.stringify(maps, undefined, 2));



//console.log('result', );
