const data = require('fs').readFileSync('input', 'utf8').trim().split('\n')
    .map(l => {
        const [_, li, la] = l.match(/(.*) \(contains (.*)\)/);
        return {
            is: li.split(' '),
            as: la.split(', ')
        };
    });

const poss = {};
const alli = new Set();
const timesi = {};

for (const item of data) {
    for (const a of item.as) {
        if (!poss[a]) {
            poss[a] = new Set(item.is);
        } else {
            poss[a] = new Set(item.is.filter(x => poss[a].has(x)));
        }
    }
    console.log(poss);

    for (const i of item.is) {
        timesi[i] = (timesi[i] || 0) + 1;
        alli.add(i);
    }
    //console.log(timesi);
}

const hasi = new Set();

while (true) {
    const aler = Object.keys(poss).filter(x => poss[x].size === 1)[0];
    if (!aler) break;

    const ing = [...poss[aler].keys()][0]
    hasi.add(ing);
    delete poss[aler];

    for (const other of Object.keys(poss)) {
        poss[other].delete(ing);
    }

    //console.log(poss);
    //console.log(hasi);
}

console.log(alli);
console.log(hasi);

const hasnti = new Set([...alli].filter(x => !hasi.has(x)));

console.log(hasnti);
console.log(timesi);

let sum = 0;
for (const i of [...hasnti]) {
    sum += timesi[i];
}

console.log(sum);
