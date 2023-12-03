import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/);

console.log(data.join('\n'));

const detectPart = (data, r, cb) => {
    let ce;
    for (let i = cb; i < data[r].length; i++) {
        if (!data[r][i].match(/\d/)) {
            ce = i - 1;
            break;
        }
    }
    ce = ce ?? data[r].length;

    const num = data[r].substring(cb, ce + 1)

    const cornerb = Math.max(0, cb - 1);
    const cornere = Math.min(data[r].length - 1, ce + 1);

    if (r < data.length - 1 && data[r + 1].substring(cornerb, cornere + 1).match(/[^\d.]/)) {
        return [num, true, ce];
    }
    if (r > 0 && data[r - 1].substring(cornerb, cornere + 1).match(/[^\d.]/)) {
        return [num, true, ce];
    }
    if (ce < data[r].length - 1 && data[r][ce + 1].match(/[^\d.]/)) { 
        return [num, true, ce];
    }
    if (cb > 0 && data[r][cb - 1].match(/[^\d.]/)) { 
        return [num, true, ce];
    }
    return [num, false, ce];
};

let sum = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j].match(/\d/)) {
            const [num, isPart, nj] = detectPart(data, i, j);
            j = nj;
            console.log(num, isPart);
            if (isPart) {
                sum += Number(num);
            }
        }
    }
}

console.log('result', sum);
