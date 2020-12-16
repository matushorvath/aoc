const [rds, yds, nds] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

const rules = rds.split('\n').map(rd => {
    const m = rd.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return {
        n: m[1],
        r1: [parseInt(m[2], 10), parseInt(m[3], 10)],
        r2: [parseInt(m[4], 10), parseInt(m[5], 10)]
    };
});

//console.log(rules);

const tickets = nds.split('\n').slice(1);

//console.log(tickets);

const valid = tickets
    .map(r => r.split(',').map(s => parseInt(s, 10)))
    .filter(t => t.every(n => rules.some(r =>
        (n >= r.r1[0] && n <= r.r1[1]) ||
        (n >= r.r2[0] && n <= r.r2[1])
    )));

//console.log(valid);

const fields = rules.map(r => r.n).reduce((p, c) => ({ ...p, [c]: true }), {});
const canbe = Array.apply(null, Array(valid[0].length)).map(v => ({ ...fields }));

//console.log(canbe);

for (const t of valid) {
//    console.log('T', t);
    for (const i in t) {
        const n = t[i];
//        console.log(' N', i, n);
        for (const r of rules) {
//            console.log('  R', r);
//            console.log('   C->', i, Object.keys(canbe[i]));
            if ((n < r.r1[0] || n > r.r1[1]) && (n < r.r2[0] || n > r.r2[1])) {
                delete canbe[i][r.n];
            }
//            console.log('   <- ', i, Object.keys(canbe[i]));
        }
    }
}

//console.log(canbe);

const is = [];

for (let f = 0; f < canbe.length; f++) {
    const next = Object.keys(canbe.filter(c => Object.keys(c).length === 1)[0])[0];
//    console.log(next);

    for (const i in canbe) {
        const c = canbe[i];
        if (Object.keys(c).length === 1) {
            is[i] = next;
        }

//        console.log('->', i, c);
        delete c[next];
//        console.log('<-', i, c);
    }
}

console.log(is);

const your = yds.split('\n')[1]
    .split(',').map(s => parseInt(s, 10));

console.log(your);

let mul = 1;

for (const i in is) {
    if (/^departure/.test(is[i])) {
        console.log(i, your[i]);
        mul *= your[i];
    }
}

console.log(mul);
