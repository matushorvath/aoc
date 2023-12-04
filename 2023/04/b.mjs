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

const cards = Object.fromEntries(data.map(card => [card.card, [...card.my].filter(num => card.win.has(num)).length]));
console.log(cards);

const score = {};

for (const [numStr, count] of Object.entries(cards).reverse()) {
    const num = Number(numStr);
    score[num] = 1;

    for (let i = num + 1; i <= num + count; i++) {
        score[num] += score[i];
    }
};

console.log(score);
console.log(Object.values(score).reduce((p, c) => p + c, 0));

//console.log('result', score);
