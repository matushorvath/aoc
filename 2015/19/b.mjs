import fs from 'fs/promises';

const input = await fs.readFile('exampleb2', 'utf8');
//const input = await fs.readFile('input', 'utf8');

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
}, new Set())].sort();

const rtokens = Object.fromEntries([...tokens.entries()].map(([k, v]) => [v, k]));

console.log(tokens);
console.log(rtokens);

const irules = rules.map(r => ({ src: rtokens[r.src], tgt: r.tgt.map(t => rtokens[t]) }));

console.log(irules);

const imol = mol.match(/[A-Z][a-z]*/g).map(t => rtokens[t]);

console.log(imol);

const moleq = (m1, m2) => {
    if (m1.length !== m2.length) return false;
    return m1.every((t, i) => t === m2[i]);
};

// const e = (str, i) => {
//     let ni = i;
//     if ((ni = H(str, ni)) && (ni = F(str, ni))) return ni;
//     if ((ni = N(str, ni)) && (ni = Al(str, ni))) return ni;
//     if ((ni = O(str, ni)) && (ni = Mg(str, ni))) return ni;
// };

// e => H
// e => O
const e = (str, i) => {
    let ni = i;
    if ((ni = H(str, ni))) return ni;
    if ((ni = O(str, ni))) return ni;
};

// H => HO
// H => OH
const H = (str, i) => {
    let ni = i;
    if (str[ni] === rtokens['H']) return ni + 1;
    if ((ni = H(str, ni)) && (ni = O(str, ni))) return ni;
    if ((ni = O(str, ni)) && (ni = H(str, ni))) return ni;
};

// O => HH
const O = (str, i) => {
    let ni = i;
    if (str[ni] === rtokens['O']) return ni + 1;
    if ((ni = H(str, ni)) && (ni = H(str, ni))) return ni;
};

const ni = e(imol, 0);
console.log(ni);

//console.log('result', min.cnt);
