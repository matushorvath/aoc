import fs from 'fs/promises';

//const input = await fs.readFile('example1', 'utf8');
const input = await fs.readFile('input', 'utf8');

let data = input.trimEnd().split(/\r?\n/);
let mol = data.splice(data.length - 2, 2)[1];

console.log(mol, data);

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

console.log(rules);

const tokens = [...rules.reduce((p, c) => {
    p.add(c.src);
    c.tgt.forEach(i => p.add(i));
    return p;
}, new Set())];

const rtokens = Object.fromEntries([...tokens.entries()].map(([k, v]) => [v, k]));

console.log(tokens);
console.log(rtokens);

const irules = rules.map(r => ({ src: rtokens[r.src], tgt: r.tgt.map(t => rtokens[t]) }));

console.log(irules);

const imol = mol.match(/[A-Z][a-z]*/g).map(t => rtokens[t]);

console.log(imol);

const results = [];

for (const rule of irules) {
    for (let i = 0; i < imol.length; i++) {
        if (imol[i] === rule.src) {
            results.push([...imol].toSpliced(i, 1, ...rule.tgt));
        }
    }
}

const uresults = results.reduce((p, c) => { p.add(c.map(t => tokens[t]).join('')); return p; }, new Set());

console.log('result', uresults.size);
