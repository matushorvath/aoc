'use strict';

import fs from 'fs/promises';

const seta = (a, i, j, v) => (a[i] ?? (a[i] = []))[j] = v;

const collidex = (ch, rx, ry, rt) => {
    if (rt === 0) {
        return rx < 0
            || ch[rx]?.[ry]
            || ch[rx]?.[ry + 1]
            || ch[rx]?.[ry + 2]
            || ch[rx]?.[ry + 3];
    } else if (rt === 1) {
        return rx < 0
            || ch[rx + 1]?.[ry]
            || ch[rx]?.[ry + 1]
            || ch[rx + 1]?.[ry + 2];
    } else if (rt === 2) {
        return rx < 0
            || ch[rx]?.[ry]
            || ch[rx]?.[ry + 1]
            || ch[rx]?.[ry + 2];
    } else if (rt === 3) {
        return rx < 0
            || ch[rx]?.[ry];
    } else if (rt === 4) {
        return rx < 0
            || ch[rx]?.[ry]
            || ch[rx]?.[ry + 1];
    }
};

const collidey = (ch, rx, ry, rt) => {
    if (rt === 0) {
        return ry < 0 || ry > 3
            || ch[rx]?.[ry]
            || ch[rx]?.[ry + 3];
    } else if (rt === 1) {
        return ry < 0 || ry > 4
            || ch[rx]?.[ry + 1]
            || ch[rx + 1]?.[ry]
            || ch[rx + 1]?.[ry + 2]
            || ch[rx + 2]?.[ry + 1];
    } else if (rt === 2) {
        return ry < 0 || ry > 4
            || ch[rx]?.[ry + 2]
            || ch[rx + 1]?.[ry + 2]
            || ch[rx + 2]?.[ry + 2]
            || ch[rx]?.[ry];
    } else if (rt === 3) {
        return ry < 0 || ry > 6
            || ch[rx]?.[ry]
            || ch[rx + 1]?.[ry]
            || ch[rx + 2]?.[ry]
            || ch[rx + 3]?.[ry];
    } else if (rt === 4) {
        return ry < 0 || ry > 5
            || ch[rx]?.[ry]
            || ch[rx]?.[ry + 1]
            || ch[rx + 1]?.[ry]
            || ch[rx + 1]?.[ry + 1];
    }
};

const merge = (ch, rx, ry, rt) => {
    if (rt === 0) {
        seta(ch, rx, ry, '#');
        seta(ch, rx, ry + 1, '#');
        seta(ch, rx, ry + 2, '#');
        seta(ch, rx, ry + 3, '#');
    } else if (rt === 1) {
        seta(ch, rx, ry + 1, '#');
        seta(ch, rx + 1, ry, '#');
        seta(ch, rx + 1, ry + 1, '#');
        seta(ch, rx + 1, ry + 2, '#');
        seta(ch, rx + 2, ry + 1, '#');
    } else if (rt === 2) {
        seta(ch, rx, ry, '#');
        seta(ch, rx, ry + 1, '#');
        seta(ch, rx, ry + 2, '#');
        seta(ch, rx + 1, ry + 2, '#');
        seta(ch, rx + 2, ry + 2, '#');
    } else if (rt === 3) {
        seta(ch, rx, ry, '#');
        seta(ch, rx + 1, ry, '#');
        seta(ch, rx + 2, ry, '#');
        seta(ch, rx + 3, ry, '#');
    } else if (rt === 4) {
        seta(ch, rx, ry, '#');
        seta(ch, rx, ry + 1, '#');
        seta(ch, rx + 1, ry, '#');
        seta(ch, rx + 1, ry + 1, '#');
    }
};

const height = (rx, rt) => {
    if (rt === 0) {
        return rx;
    } else if (rt === 1) {
        return rx + 2
    } else if (rt === 2) {
        return rx + 2;
    } else if (rt === 3) {
        return rx + 3;
    } else if (rt === 4) {
        return rx + 1;
    }
};

const print = (ch, rx, ry) => {
    console.log(`[${rx},${ry}]`);
    for (let x = ch.length - 1 + 4; x >= 0; x--) {
        let out = ''
        for (let y = 0; y < 7; y++) {
            out += rx === x && ry === y ? '@' : ch[x]?.[y] ? '#' : '.';
        }
        console.log(out);
    }
    console.log('-------');
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split('').map(c => c === '<' ? -1 : 1);

    const ch = [];
    let maxx = -1;

    let di = 0;
    let rt = 0;

    for (let r = 0; r < 2022; r++) {
        let rx = maxx + 4;
        let ry = 2;

        //print(ch, rx, ry);

        while (true) {
            if (!collidey(ch, rx, ry + data[di], rt)) {
                ry += data[di];
            }
            di = (di + 1) % data.length;

            //print(ch, rx, ry);

            if (!collidex(ch, rx - 1, ry, rt)) {
                rx--;
            } else {
                merge(ch, rx, ry, rt);
                maxx = Math.max(maxx, height(rx, rt));
                rt = (rt + 1) % 5;

                break;
            }
            //print(ch, rx, ry);
        }
    }

    console.log(maxx + 1);
};

await main();
