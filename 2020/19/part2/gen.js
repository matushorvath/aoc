const fs = require('fs');

// removed rules 0, 8, 11 from input
// 0: 8 11
// 8: 42 | 42 8
// 11: 42 31 | 42 11 31

let [gram, data] = fs.readFileSync('/home/horvathm/aoc/2020/19/part2/input', 'utf8').trim().split('\n\n');

gram = gram.split('\n').map(l => {
        const m = l.match(/(\d+): "?([^"]*)"?/);
        return { n: m[1], t: m[2] }
    }, {});

//console.log(gram);
gram = gram.sort((a, b) => b.n - a.n);
//console.log(gram);

for (const rule of gram) {
    for (const line of gram) {
        line.t = line.t.replace(new RegExp(rule.n, 'g'), `(${rule.t})`);
    }
    // console.log('-----');
    // console.log(gram);
}

//console.log(gram);

let rule31 = gram.filter(r => r.n === '31')[0].t.replace(/ /g, '');
let rule42 = gram.filter(r => r.n === '42')[0].t.replace(/ /g, '');

console.log(rule31);
console.log(rule42);

//rule0 = rule0.replace(/\(a\)/g, 'a');
//rule0 = rule0.replace(/\(b\)/g, 'a');

const re42 = new RegExp(`^(${rule42})`)
const re31 = new RegExp(`^(${rule31})`)

console.log(re31);
console.log(re42);

data = data.split('\n');
for (const line of data) {
    //console.log(line);
    let rest = line;

    let c42 = 0;
    while (true) {
        const m42 = rest.match(re42);
        if (!m42) break;
        c42++;
        rest = rest.substr(m42[0].length);
        //console.log(42, m42[0], rest);
    }

    let c31 = 0;
    while (true) {
        const m31 = rest.match(re31);
        if (!m31) break;
        c31++;
        rest = rest.substr(m31[0].length);
        //console.log(31, m31[0], rest);
    }

    if (rest === '' && c42 > 0 && c31 > 0 && c42 > c31) {
        console.log('passed', line);
    } else {
        console.log('failed', line);
    }
}
