import fs from 'fs/promises';

const input = await fs.readFile('exampleb2', 'utf8');
//const input = await fs.readFile('input', 'utf8');

let data = input.trimEnd().split(/\r?\n/);
let mol = data.splice(data.length - 2, 2)[1];

//console.log(mol, data);

Array.prototype.toSpliced = function (...args) {
    const tmp = [...this];
    tmp.splice(...args);
    return tmp;
};

const rules = data.map(r => {
    const [src, tgts] = r.split(' => ', 2);
    const tgt = tgts.match(/([A-Z][a-z]*)/g);
    return { src, tgt };
});

//console.log(rules);

const tokens = [...rules.reduce((p, c) => {
    p.add(c.src);
    c.tgt.forEach(i => p.add(i));
    return p;
}, new Set())].sort();

console.log('start\n  = e\n');

for (const token of tokens) {
    console.log(`${token}\n  = "${token}"`);

    const trules = rules.filter(r => r.src === token);
    for (const rule of trules) {
        console.log(`  / ${rule.tgt.join(' ')}`);
    }

    console.log();
}
