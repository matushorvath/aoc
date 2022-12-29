'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/)

    let sum = 0;

    for (const n of data) {
        let x = 0;
        let m = 1;
        for (const c of n.split('').reverse()) {
            switch (c) {
                case '=':
                    x += -2 * m;
                    break;
                case '-':
                    x += -1 * m;
                    break;
                case '0':
                case '1':
                case '2':
                    x += Number(c) * m;
                    break;
            }
            m *= 5;
        }
        console.log(n, x);
        sum += x;
    }

    console.log('sum', sum);

    const inc = (input, pos) => {
        const output = input.split('');
        for (let i = pos; i >= 0; i--) {
            switch (output[i]) {
                case '-': output[i] = '0'; return output.join('');
                case '=': output[i] = '-'; return output.join('');
                case '0': output[i] = '1'; return output.join('');
                case '1': output[i] = '2'; return output.join('');
                case '2': output[i] = '='; continue;
            };
        }
        return `1${output.join('')}`;
    }

    let snafu = '';

    let o = 1;
    while (o < sum) o *= 5;
    o /= 5;
    console.log(o);

    let m = sum;
    while (o >= 1) {
        const q = Math.floor(m / o);
        m = m % o;
        o /= 5;

        if (q > 2) {
            snafu = inc(snafu, snafu.length - 1);
            snafu += q === 3 ? '=' : '-';
        } else {
            snafu += `${q}`;
        }
    }

//    console.log(o, q, m);

    console.log('>', snafu);
};

await main();
