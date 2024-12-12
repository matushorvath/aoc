import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));
//console.log(data);

const christmas = (d, r, c, dr, dc) => {
    const pat = 'XMAS';
    for (let i = 0; i < pat.length; i++) {
        const chr = r + dr*i;
        if (chr < 0 || chr >= d.length) return false;
        const chc = c + dc*i;
        if (chc < 0 || chc >= d[0].length) return false;

        if (d[chr][chc] !== pat[i]) return false;
    }

    return true;
};

let count = 0;

for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
        if (christmas(data, r, c, -1, -1)) count++;
        if (christmas(data, r, c,  0, -1)) count++;
        if (christmas(data, r, c,  1, -1)) count++;
        if (christmas(data, r, c, -1,  0)) count++;
        if (christmas(data, r, c,  1,  0)) count++;
        if (christmas(data, r, c, -1,  1)) count++;
        if (christmas(data, r, c,  0,  1)) count++;
        if (christmas(data, r, c,  1,  1)) count++;
    }
}

console.log('result', count);
