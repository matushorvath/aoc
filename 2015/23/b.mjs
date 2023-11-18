import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

let ip = 0;
const reg = { a: 1, b: 0 };

let data = input.trimEnd().split(/\r?\n/);

while (true) {
    if (ip < 0 || ip >= data.length) break;

    const r = data[ip];
    switch (r.substring(0, 3)) {
        case 'hlf':
            reg[r[4]] = Math.floor(reg[r[4]] / 2);
            ip++;
            break;
        case 'tpl':
            reg[r[4]] = reg[r[4]] * 3;
            ip++;
            break;
        case 'inc':
            reg[r[4]] = reg[r[4]] + 1;
            ip++;
            break;
        case 'jmp':
            ip += Number(r.substring(4));
            break;
        case 'jie':
            if (reg[r[4]] % 2 === 0) ip += Number(r.substring(7));
            else ip++;
            break;
        case 'jio':
            if (reg[r[4]] === 1) ip += Number(r.substring(7));
            else ip++;
            break;
    }
}

console.log(reg);
