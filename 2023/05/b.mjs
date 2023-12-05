import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [seedData, ...mapData] = input.trimEnd().split(/\r?\n\r?\n/);
const seeds = seedData.split(':', 2)[1].trim().match(/\S+\s+\S+/g).map(s => {
    const [start, len] = s.split(/\s+/).map(Number);
    return { start, len };
});
const maps = mapData.map(b => {
    const [head, rest] = b.split(':');
    const [from, to] = head.match(/(.*)-to-(.*) map/).slice(1, 3);
    const rules = rest.trim().split(/\r?\n/).map(r => r.split(/\s+/).map(Number)).map(r => ({ dst: r[0], src: r[1], len: r[2] }));
    return { from, to, rules };
});

//console.log(seeds, JSON.stringify(maps, undefined, 2));

let borders = new Set();
let to = 'location';

while (to !== 'seed') {
    const map = maps.find(m => m.to === to);

    const mappedBorders = [...borders].map(b => {
        const rule = map.rules.find(r => b >= r.dst && b < r.dst + r.len);
        return rule ? b - rule.dst + rule.src : b;
    });
    //console.log(map.from, 'map', JSON.stringify([...mappedBorders]));

    const newBorders = map.rules.flatMap(r => [r.src, r.src + r.len]);
    //console.log(map.from, 'new', JSON.stringify([...newBorders]));

    borders = new Set([...mappedBorders, ...newBorders]);
    //console.log(map.from, JSON.stringify([...borders]));

    to = map.from;
}

//console.log(borders);

const candidates = [...borders].filter(b => seeds.some(s => b >= s.start && b < s.start + s.len));

//console.log(candidates);

const locations = [];

for (const seed of candidates) {
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

//console.log(locations);

console.log('result', Math.min(...locations));

//console.log('result', Math.min(...locations));

// 0 WA
