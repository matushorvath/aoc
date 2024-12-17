import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [rulesInput, pagesInput] = input.trimEnd().split(/\r?\n\r?\n/);

const rules = rulesInput.trimEnd().split(/\r?\n/).map(r => r.split('|'));
const pages = pagesInput.trimEnd().split(/\r?\n/).map(r => r.split(','));

//console.log(rules);
//console.log(pages);

//const rpag = [];
const rtab = {};

for (const [a, b] of rules) {
    if (rtab[a] === undefined) rtab[a] = {};
    rtab[a][b] = -1;
    if (rtab[b] === undefined) rtab[b] = {};
    rtab[b][a] = 1;

    //rpag[a] = true;
    //rpag[b] = true;
}

//console.log(rtab);

// let changed = true;
// while (changed) {
//     changed = false;

//     for (const x in rtab) {
//         for (const y in rtab[x]) {
//             for (const z in rtab[y]) {
//                 if (rtab[x][y] === rtab[y][z] && rtab[x][y] !== rtab[x][z]) {
//                     rtab[x][z] = rtab[x][y];
//                     changed = true;
//                 }
//             }
//         }
//     }
// }

//console.log(rtab);

let sum = 0;

for (const book of pages) {
    const sorted = book.toSorted((a, b) => {
        if (rtab[a][b] === undefined) {
            console.log('WRONG', a, b);
        }
        return a === b ? 0 : rtab[a][b];
    })
    const isSorted = book.every((_, i) => book[i] === sorted[i]);
    //console.log(book, sorted, isSorted);

    if (isSorted) {
        sum += Number(sorted[Math.floor(sorted.length / 2)])
    }
}


console.log('result', sum);

// 4945 high
