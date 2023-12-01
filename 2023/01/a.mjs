import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    let m = r.match(/(\d).*(\d)/);
    if (!m) m = r.match(/(\d)/);
    return Number(`${m[1]}${m[2]??m[1]}`);
});

console.log(data.reduce((p, c) => p + c, 0));



//console.log('result', );
