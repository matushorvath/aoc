import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/Card +(\d+): ([^|]+)\|([^|]+)/);
    return {
        card: Number(m[1]),
        win: new Set(m[2].trim().split(/\s+/).map(Number)),
        my: new Set(m[3].trim().split(/\s+/).map(Number))
    };
});

//console.log(data);

const winning = data.map(card => [...card.my].filter(num => card.win.has(num)));
console.log(winning);

console.log(winning.map(c => (c.length === 0 ? 0 : 2 ** (c.length - 1))));

const score = winning.reduce((p, c) => p + (c.length === 0 ? 0 : 2 ** (c.length - 1)), 0);

console.log('result', score);

// 24499 wa