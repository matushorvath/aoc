const fs = require('fs');

let [gram, data] = fs.readFileSync('input', 'utf8').trim().split('\n\n');

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

let rule0 = gram[gram.length - 1].t;

//rule0 = rule0.replace(/\(a\)/g, 'a');
//rule0 = rule0.replace(/\(b\)/g, 'a');
rule0 = rule0.replace(/ /g, '')

const re = new RegExp(`^${rule0}$`)

console.log(re);

data = data.split('\n');
for (const line of data) {
    if (re.test(line)) {
        console.log('passed', line);
    } else {
        console.log('failed', line);
    }
}
