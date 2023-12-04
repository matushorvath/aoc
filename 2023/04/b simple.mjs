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

const seq = (a, b) => a === b ? [] : [...Array(b - a).keys()].map(n => a + n);

const queue = seq(1, data.length + 1);

let cnt = 0;
while (queue.length) {
    const num = queue.pop();
    queue.push(...seq(num + 1, num + cards[num] + 1));
    cnt++;
}

console.log('result', cnt);
