import fs from 'fs/promises';

const input = await fs.readFile('examplea', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const hn = r.match(/\[[^\]]*\]/g);
    const ab = r.split(/\[[^\]]*\]/);
    return { ab, hn };
});

const abba = (s) => {
    const m = s.match(/(.)(.)\2\1/);
    return m && m[1] !== m[2];
};

const tls = data.map(({ ab, hn }) => ab.some(s => abba(s)) && !hn.some(s => abba(s)));

console.log(tls);

console.log('result', tls.filter(x => x).length);
