import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const [map, rle] = r.split(' ');
    return {
        map, lens: rle.split(',').map(Number)
    }
}).map(d => {
    return {
        map: d.map.concat('?', d.map, '?', d.map, '?', d.map, '?', d.map),
        lens: [...d.lens, ...d.lens, ...d.lens, ...d.lens, ...d.lens]
    }
});

for (const d of data) {
    console.log(d.map.split('').filter(c => c === '?').length);
}
