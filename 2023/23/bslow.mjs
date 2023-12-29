import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const startc = data[0].findIndex(c => c === '.');
const q = [{
    r: 0,
    c: startc,
    len: 0,
    map: data
}];

const mkkey = (r, c) => r * data[0].length + c;
const longest = {};

const printmap = (map) => {
    const out = [];
    for (const r of map) {
        for (const c of r) {
            out.push(c);
        }
        out.push('\n');
    }
    console.log(out.join(''));
};

let max = 0;

const tryadd = (q, r, c, len, map) => {
    if (r < 0 || r >= data.length || c < 0 || c >= map[0].length) {
        if (r === data.length) {
            //printmap(map);
            console.log(len, max);
            if (len > max) max = len;
        }
        return;
    }

    if (map[r][c] === '#' || map[r][c] === 'O') {
        return;
    }

    const nmap = [...map];
    nmap[r] = structuredClone(nmap[r]);

    q.push({
        r, c,
        len: len + 1,
        map: nmap
    });
};

while (q.length) {
    const { r, c, len, map } = q.pop();

    // const key = mkkey(r, c);
    // if (longest[key] && longest[key] > len) {
    //     //continue;
    // }
    // longest[key] = len;

    map[r][c] = 'O';

    tryadd(q, r - 1, c, len, map);
    tryadd(q, r + 1, c, len, map);
    tryadd(q, r, c - 1, len, map);
    tryadd(q, r, c + 1, len, map);
}

console.log('result', max);

// 4914 low
// 5450 low
// 5910 low
// 6030 low 3:43
// 6042 WA 4:14
// 6290 WA 4:34
// 6502 WA 4:58
// 6602 WA 13:33
