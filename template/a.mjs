import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/ /);
});

console.log(data);



//console.log('result', );
