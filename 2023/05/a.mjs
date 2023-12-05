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

const max = Math.max(...maps.find(m => m.from === 'seed').rules.map(r => r.src + r.len - 1));
const ranges = [[0, max]];

console.log(ranges);

let from = 'seed';
while (from !== 'location') {
    const map = maps.find(m => m.from === from);
    const sorted = map.rules.toSorted((a, b) => b.src > a.src ? 1 : -1);

    let lastSrc = 0;
    let rangesI = 0;
    let sortedI = 0;

    const output = [];
    while (true) {
        if (ranges[rangesI][0] < sorted[sortedI].src) {
            if (lastSrc < ranges[rangesI][0] - 1) output.push([lastSrc, ranges[rangesI][0] - 1]);
            output.push([ranges[rangesI][0] - 1, 

}

//console.log('result', );
