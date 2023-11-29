import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const floors = ['first', 'second', 'third', 'fourth'];
const elements = {};
let nextElement = 0;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const mf = r.match(/The (\S+) floor contains (.*)\./);
    const floor = floors.indexOf(mf[1]);

    const items = mf[2].split(/, and |, | and /).flatMap(i => {
        const mi = i.match(/a (\S+)-compatible microchip|a (\S+) generator/);
        if (mi?.[1]) {
            const elem = elements[mi[1]] ?? (elements[mi[1]] = nextElement++);
            return [{ type: 'm', elem }];
        } else if (mi?.[2]) {
            const elem = elements[mi[2]] ?? (elements[mi[2]] = nextElement++);
            return [{ type: 'g', elem }];
        } else {
            return [];
        }
    });

    return { floor, items };
});

const map = data.sort((a, b) => a.floor - b.floor).map(f => f.items);

console.log(map);
console.log(elements);



//console.log('result', );
