import fs from 'fs/promises';

//const input = await fs.readFile('exampleb', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const hn = [...r.matchAll(/\[([^\]]*)\]/g)].map(m => m[1]);
    const ab = r.split(/\[[^\]]*\]/);
    return { ab, hn };
});

//console.log(data);

const match_overlap = (r, s) => {
    let res = [];
    let m;
    while (m = r.exec(s)) {
        res.push(m[0]);
        r.lastIndex = m.index + 1;
    }
    return res;
};

const aba = s => match_overlap(/(.)(.)\1/g, s).filter(s => s[0] != s[1]);

const ssl = data.map(({ ab, hn }) => {
    const abs = ab.flatMap(s => aba(s));
    const hns = hn.flatMap(s => aba(s));
    return abs.some(s1 => hns.some(s2 => s1[0] === s2[1] && s1[1] === s2[0]));
});

//console.log(ssl);

console.log('result', ssl.filter(x => x).length);

// 380 high