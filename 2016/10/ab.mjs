import fs from 'fs/promises';

// const input = await fs.readFile('example', 'utf8');
// const crit = [2, 5];
const input = await fs.readFile('input', 'utf8');
const crit = [17, 61];

const data = input.trimEnd().split(/\r?\n/).map(r => {
    if (r[0] === 'b') {
        const m = r.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/);
        return {
            t: 't',
            b: Number(m[1]),
            l: { d: m[2][0], i: Number(m[3]) },
            h: { d: m[4][0], i: Number(m[5]) }
        };
    } else {
        const m = r.match(/value (\d+) goes to bot (\d+)/);
        return { t: 'i', b: Number(m[2]), v: Number(m[1]) };
    }
});

//console.log(data);

const give = Object.fromEntries(data.filter(d => d.t === 't').map(({ b, l, h }) => [b, { l, h }]));

//console.log(give);

const bots = [];
const outs = [];
const q = [];

for (const d of data) {
    if (d.t === 'i') {
        if (bots[d.b] === undefined) bots[d.b] = [];
        (bots[d.b] ?? (bots[d.b] = [])).push(d.v);

        if (bots[d.b].length === 2) {
            q.push(d.b);
        }
    }
}

while (q.length) {
    const b = q.pop();
    const r = give[b];

    if (r.l.d === 'b') {
        (bots[r.l.i] ?? (bots[r.l.i] = [])).push(Math.min(...bots[b]));
        if (bots[r.l.i].length === 2) {
            q.push(r.l.i);
        }
    } else {
        (outs[r.l.i] ?? (outs[r.l.i] = [])).push(Math.min(...bots[b]));
    }

    if (r.h.d === 'b') {
        (bots[r.h.i] ?? (bots[r.h.i] = [])).push(Math.max(...bots[b]));
        if (bots[r.h.i].length === 2) {
            q.push(r.h.i);
        }
    } else {
        (outs[r.h.i] ?? (outs[r.h.i] = [])).push(Math.max(...bots[b]));
    }
}

console.log('bots', Object.entries(bots));
console.log('outs', Object.entries(outs));

const res = bots.findIndex(b => (b[0] === crit[0] && b[1] === crit[1]) || (b[1] === crit[0] && b[0] === crit[1]));

console.log('result part 1', res);

console.log('result part 2', outs[0] * outs[1] * outs[2]);
