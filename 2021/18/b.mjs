'use strict';

import fs from 'fs/promises';
import fss from 'fast-safe-stringify';

const map = (n, p) => {
    if (Array.isArray(n) && !n[2]) {
        n[2] = p;
        map(n[0], n);
        map(n[1], n);
    }
    return n;
};

const add = (a, b) => {
    const c = map([a, b]);

    while (true) {
        if (explode(c, 4)) {
            continue;
        }

        if (split(c)) {
            continue;
        }

        break;
    }

    return c;
};

const explode = (n, d) => {
    if (d === 0) {
        add_left_up(n, n[0]);
        add_right_up(n, n[1]);

        if (n[2][0] === n) n[2][0] = 0;
        else n[2][1] = 0;

        return true;
    }

    if (Array.isArray(n[0])) {
        const done = explode(n[0], d-1);
        if (done) return true;
    }
    if (Array.isArray(n[1])) {
        const done = explode(n[1], d-1);
        if (done) return true;
    }

    return false;
};

const add_left_up = (n, x) => {
    if (!n[2]) return;
    if (n[2][0] === n) add_left_up(n[2], x);
    else {
        if (Array.isArray(n[2][0])) add_right_down(n[2][0], x);
        else n[2][0] += x;
    }
};
const add_right_up = (n, x) => {
    if (!n[2]) return;
    if (n[2][1] === n) add_right_up(n[2], x);
    else {
        if (Array.isArray(n[2][1])) add_left_down(n[2][1], x);
        else n[2][1] += x;
    }
};

const add_right_down = (n, x) => {
    if (Array.isArray(n[1])) add_right_down(n[1], x);
    else n[1] += x;
};
const add_left_down = (n, x) => {
    if (Array.isArray(n[0])) add_left_down(n[0], x);
    else n[0] += x;
};

const split = (n) => {
    if (Array.isArray(n[0])) {
        const done = split(n[0]);
        if (done) return true;
    } else if (n[0] > 9) {
        n[0] = [Math.floor(n[0]/2), Math.ceil(n[0]/2), n];
        return true;
    }

    if (Array.isArray(n[1])) {
        const done = split(n[1]);
        if (done) return true;
    } else if (n[1] > 9) {
        n[1] = [Math.floor(n[1]/2), Math.ceil(n[1]/2), n];
        return true;
    }

    return false;
};

const print = (n) => {
    if (Array.isArray(n)) return `[${print(n[0])},${print(n[1])}]`;
    else return `${n}`;
};

const magnitude = (n) => {
    if (Array.isArray(n)) return 3 * magnitude(n[0]) + 2 * magnitude(n[1]);
    else return n;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    console.log(fss.stableStringify(data));

    let max = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (i !== j) {
                const a = map(eval(data[i]), null);
                const b = map(eval(data[j]), null);

                const sum = add(a, b);
                const mag = magnitude(sum);
                if (mag > max) max = mag;

                console.log(i, j, mag, print(data[i]), print(data[j]), print(sum));
            }
        }
    }

    console.log(magnitude(max));
};

await main();


    // const a = [[[[4,3],4],4],[7,[[8,4],9]]];
    // map(a);
    // console.log(fss.stableStringify(a));

    // const a = add([[[[4,3],4],4],[7,[[8,4],9]]], [1,1]);
    // const a = map([[[[[9,8],1],2],3],4]);
    // const b = map([7,[6,[5,[4,[3,2]]]]]);
    // const b = map([[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]);
    // console.log(fss.stableStringify(a));
    // explode(a, 4);
    // console.log(fss.stableStringify(a));

    // console.log(fss.stableStringify(data));

    //4635