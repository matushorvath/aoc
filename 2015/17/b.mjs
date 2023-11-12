import fs from 'fs/promises';

Array.prototype.toSpliced = function (...args) {
    const tmp = [...this];
    tmp.splice(...args);
    return tmp;
};

// const input = await fs.readFile('example', 'utf8');
// const tvol = 25;
const input = await fs.readFile('input', 'utf8');
const tvol = 150;

const data = input.trimEnd().split(/\r?\n/).map(Number);

//console.log(data);

const q = [{ vol: 0, filled: [], empty: [...data.keys()] }];
const results = new Set();
const memo = new Set();

let iter = 0;

while (q.length > 0) {
    if (++iter % 100000 === 0) console.log(iter, results.size);

    const { vol, filled, empty } = q.pop();
    for (const [idx, adding] of Object.entries(empty)) {
        const nvol = vol + data[adding];
        const nfilled = [...filled, adding];
        const nfkey = nfilled.sort((a, b) => a - b).map(n => String.fromCodePoint(65 + n)).join(',');

        if (nvol === tvol) {
            //console.log(nfilled.map(i => data[i]));
            results.add(nfkey);
        } else if (nvol < tvol) {
            if (!memo.has(nfkey)) {
                memo.add(nfkey);
                q.push({ vol: nvol, filled: nfilled, empty: empty.toSpliced(idx, 1) });
            }
        }
    }
}

const minl = [...results].reduce((p, c) => p < c.length ? p : c.length, Infinity);
const shortest = [...results].filter(i => i.length === minl);

console.log('result', results, results.size, shortest, shortest.length);
