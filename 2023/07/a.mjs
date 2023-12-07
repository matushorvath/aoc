import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const [hand, bid] = r.split(' ');
    return { hand, bid: Number(bid) };
});

console.log(data);

const cmphand = (a, b) => {
    const five = /(.)\1\1\1\1/;
    const four = /(.).*\1.*\1.*\1/;
    const three = /(.).*\1.*\1/;
    const pair = /(.).*\1/;

    let ma, mb;

    ma = a.match(five);
    mb = b.match(five);
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = a.match(four);
    mb = b.match(four);
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = a.match(three);
    mb = b.match(three);
    const fha = ma && [...a].filter(c => c !== ma[1]).join('').match(pair);
    const fhb = mb && [...b].filter(c => c !== mb[1]).join('').match(pair);
    if (fha || fhb) {
        if (fha && fhb) return cmpfirst(a, b);
        else return fha ? 1 : -1;
    }
    if (ma || mb) {
        if (ma && mb) return cmpfirst(a, b);
        else return ma ? 1 : -1;
    }

    ma = a.match(pair);
    mb = b.match(pair);
    const tpa = ma && [...a].filter(c => c !== ma[1]).join('').match(pair);
    const tpb = mb && [...b].filter(c => c !== mb[1]).join('').match(pair);
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

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
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

console.log(JSON.stringify(sorted));

const score = sorted.reduce((p, c, i) => p + c.bid * (i + 1), 0);

console.log('result', score);

// 250091559 low
