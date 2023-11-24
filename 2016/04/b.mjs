import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/);
    return {
        letters: m[1].split(''),
        id: Number(m[2]),
        checksum: m[3]
    };
});

//console.log(data);

const rot = (c, n) => String.fromCharCode('a'.charCodeAt(0) + (c.charCodeAt(0) - 'a'.charCodeAt(0) + n) % 26);

const decrypt = data.map(r => ({ desc: r.letters.map(c => c === '-' ? ' ' : rot(c, r.id % 26)).join(''), id: r.id }));

const np = decrypt.filter((r) => /pole/.test(r.desc))

console.log(np);

//console.log('result', sum);
