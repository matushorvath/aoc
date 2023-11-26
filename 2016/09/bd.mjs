import fs from 'fs/promises';

// The screen is 50 pixels wide and 6 pixels tall, all of which start off,

const input = await fs.readFile('exampleb', 'utf8');
//const input = await fs.readFile('input', 'utf8');

let data = input.trimEnd().split(/\r?\n/)[0];

//console.log(data);

const re = /^\((\d+)x(\d+)\)/;

let dec = true;
while (dec) {
    dec = false;
    let out = [];

    for (let i = 0; i < data.length; i++) {
        const m = data.slice(i).match(re);
        if (m) {
            const mlen = m[0].length;
            const slen = Number(m[1]);
            const times = Number(m[2]);

            const section = data.slice(i + mlen, i + mlen + slen);
            for (let j = 0; j < times; j++) {
                out.push(section);
            }
            i += mlen + slen - 1;
            dec = true;
        } else {
            out.push(data[i]);
        }
    }
    data = out.join('');
    console.log(data.length);
}

console.log('result', data.length);
