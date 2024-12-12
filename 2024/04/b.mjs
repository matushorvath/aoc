import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));
//console.log(data);

const christmas = (d, r, c, pat) => {
    for (let ri = 0; ri < pat.length; ri++) {
        for (let ci = 0; ci < pat[0].length; ci++) {
            if (pat[ri][ci] === ' ') continue;

            const chr = r + ri;
            if (chr < 0 || chr >= d.length) return false;
            const chc = c + ci;
            if (chc < 0 || chc >= d[0].length) return false;

            if (d[chr][chc] !== pat[ri][ci]) return false;
        }
    }

    return true;
};

let count = 0;

const pat0 = ['M S', ' A ', 'M S'];
const pat1 = ['S M', ' A ', 'S M'];
const pat2 = ['M M', ' A ', 'S S'];
const pat3 = ['S S', ' A ', 'M M'];

for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
        if (christmas(data, r, c, pat0)) count++;
        else if (christmas(data, r, c, pat1)) count++;
        else if (christmas(data, r, c, pat2)) count++;
        else if (christmas(data, r, c, pat3)) count++;
    }
}

console.log('result', count);
