import fs from 'fs/promises';

//const input = await fs.readFile('example2', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const [hand, bid] = r.split(' ');
    return { hand: hand.split(''), bid: Number(bid) };
});

//console.log(data);

const group = (h) => h.reduce((p, c) => ({ ...p, [c]: (p[c] ?? 0) + 1 }), {});

const hasn = (gh, n) => {
    const jokers = gh['J'] ?? 0;

    for (const c of Object.keys(gh)) if (c !== 'J') {
        if (gh[c] + jokers === n) return c;
    }

    if (jokers === n) return 'J';

    return undefined;
};

const without = (o, ...ps) => {
    const tmp = { ...o };
    for (const p of ps) {
        delete tmp[p];
    }
    return tmp;
};

const cmphand = (a, b) => {
    const ga = group(a);
    const gb = group(b);

    let ma, mb;

    ma = hasn(ga, 5);
    mb = hasn(gb, 5);
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = hasn(ga, 4);
    mb = hasn(gb, 4);
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = hasn(ga, 3);
    mb = hasn(gb, 3);
    const fha = ma && hasn(without(ga, ma, 'J'), 2);
    const fhb = mb && hasn(without(gb, mb, 'J'), 2);
    if (fha || fhb) {
        if (fha && fhb) return cmpfirst(a, b);
        else return fha ? 1 : -1;
    }
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = hasn(ga, 2);
    mb = hasn(gb, 2);
    const tpa = ma && hasn(without(ga, ma, 'J'), 2);
    const tpb = mb && hasn(without(gb, mb, 'J'), 2);
    if (tpa || tpb) {
        if (tpa && tpb) return cmpfirst(a, b);
        else return tpa ? 1 : -1;
    }
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    return cmpfirst(a, b);
};

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
const cmpfirst = (a, b) => {
    for (let i = 0; i < 5; i++) {
        const ia = cards.indexOf(a[i]);
        const ib = cards.indexOf(b[i]);
        if (ia !== ib) {
            return ia < ib ? 1 : -1;
        }
    }
    return 0;
};

const sorted = data.sort((a, b) => cmphand(a.hand, b.hand));

console.log(JSON.stringify(sorted.map(s => s.hand.join(''))));
//console.log(sorted);

const score = sorted.reduce((p, c, i) => p + c.bid * (i + 1), 0);

console.log('result', score);

// 250431272 low
