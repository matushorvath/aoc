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
    //console.log(poss);

    for (const i of item.is) {
        timesi[i] = (timesi[i] || 0) + 1;
        alli.add(i);
    }
    //console.log(timesi);
}

const itoa = [];

while (true) {
    const aler = Object.keys(poss).filter(x => poss[x].size === 1)[0];
    if (!aler) break;

    const ing = [...poss[aler].keys()][0]
    itoa.push({ i: ing, a: aler });
    delete poss[aler];

    for (const other of Object.keys(poss)) {
        poss[other].delete(ing);
    }

    //console.log(poss);
    //console.log(hasi);
}

console.log(itoa);

itoa.sort((x, y) => {
    if(x.a < y.a) return -1;
    if(x.a > y.a) return 1;
    return 0;
});

console.log(itoa.map(x => x.i).join(','));
