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

const mkkey = (r, c) => r * data.length + c;
const longest = {};

const tryadd = (q, r, c, len, map) => {
    if (r < 0 || r >= data.length || c < 0 || c >= data.length) {
        if (r === data.length) {
            console.log(len);
        }
        return;
    }

    if (map[r][c] === '#' || map[r][c] === 'O') {
        return;
    }

    // TODO clone just modified row
    const nmap = structuredClone(map);

    q.push({
        r, c,
        len: len + 1,
        map: nmap
    });
};

while (q.length) {
    const { r, c, len, map } = q.pop();

    const key = mkkey(r, c);
    if (longest[key] && longest[key] > len) {
        continue;
    }
    longest[key] = len;

    const here = map[r][c];
    map[r][c] = 'O';

    switch (here) {
        case '.':
            tryadd(q, r - 1, c, len, map);
            tryadd(q, r + 1, c, len, map);
            tryadd(q, r, c - 1, len, map);
            tryadd(q, r, c + 1, len, map);
            break;
        case '>':
            tryadd(q, r, c + 1, len, map);
            break;
        case '<':
            tryadd(q, r, c - 1, len, map);
            break;
        case 'v':
            tryadd(q, r + 1, c, len, map);
            break;
        case '^':
            tryadd(q, r - 1, c, len, map);
            break;
    }
}

//console.log('result', );

// 2218 RA