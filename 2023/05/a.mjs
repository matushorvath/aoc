import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [seedData, ...mapData] = input.trimEnd().split(/\r?\n\r?\n/);
const seeds = seedData.split(':', 2)[1].trim().split(/\s+/).map(Number);
const maps = mapData.map(b => {
    const [head, rest] = b.split(':');
    const [from, to] = head.match(/(.*)-to-(.*) map/).slice(1, 3);
    const rules = rest.trim().split(/\r?\n/).map(r => r.split(/\s+/).map(Number)).map(r => ({ dst: r[0], src: r[1], len: r[2] }));
    return { from, to, rules };
});

const locations = [];

for (const seed of seeds) {
    let from = 'seed';
    let value = seed;
    while (from !== 'location') {
        const map = maps.find(m => m.from === from);
        const rule = map.rules.find(r => value >= r.src && value < r.src + r.len);
        if (rule) {
            value = value - rule.src + rule.dst;
        }
        from = map.to;
    }

    //console.log(value);
    locations.push(value);
}

console.log('result', Math.min(...locations));
