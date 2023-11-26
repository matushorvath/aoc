import fs from 'fs/promises';

// The screen is 50 pixels wide and 6 pixels tall, all of which start off,

//const input = await fs.readFile('exampleb', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/)[0];

//console.log(data);

const re = /^\((\d+)x(\d+)\)/;

const measure = (s) => {
    let res = 0;

    for (let i = 0; i < s.length; i++) {
        const m = s.slice(i).match(re);
        if (m) {
            const mlen = m[0].length;
            const islen = Number(m[1]);
            const times = Number(m[2]);

            const section = s.slice(i + mlen, i + mlen + islen);
            const oslen = measure(section);

            res += times * oslen;
            i += mlen + islen - 1;
        } else {
            res++;
        }
    }

    return res;
};

const length = measure(data);

console.log('result', length);
