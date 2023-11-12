import fs from 'fs/promises';

Array.prototype.toSpliced = function (...args) {
    const tmp = [...this];
    tmp.splice(...args);
    return tmp;
};

const input = await fs.readFile('example', 'utf8');
const tvol = 25;
//const input = await fs.readFile('input', 'utf8');
//const tvol = 150;

const data = input.trimEnd().split(/\r?\n/).map(Number);

//console.log(data);

const q = [{ vol: 0, filled: [], empty: data }];
let count = 0;

while (q.length > 0) {
    const { vol, filled, empty } = q.pop();
    for (const [idx, emc] of Object.entries(empty)) {
        const nvol = vol + emc;
        if (nvol === tvol) {
            console.log([...filled, emc]);
            count++;
        } else if (nvol < tvol) {
            q.push({ vol: nvol, filled: [...filled, emc], empty: empty.toSpliced(idx, 1) });
        }
    }
}

console.log('result', count);
