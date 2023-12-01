import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const nms = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const data = input.trimEnd().split(/\r?\n/).map(r => {
    let m = r.match(/(\d|one|two|three|four|five|six|seven|eight|nine).*(\d|one|two|three|four|five|six|seven|eight|nine)/);
    if (!m) m = r.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/);

    const d1 = Number(m[1]) || (nms.indexOf(m[1]) + 1);
    const d2 = Number(m[2]) || (nms.indexOf(m[2]) + 1);

    return Number(`${d1}${d2||d1}`);
});

console.log(data.reduce((p, c) => p + c, 0));

//console.log('result', );
// 54493 wrong
