const input = '389125467'; const N = 1000000;
//const input = '974618352'; const N = 1000000;

const start = input.split('').map(i => parseInt(i, 10) - 1);
const c = Array(1000000).fill().map((v, i) => i);
c.splice(0, start.length, ...start);

// console.log(c);

let cidx = 0;

const get = (x, i) => {
    return x[(i + N) % N];
};

const set = (x, i, v) => {
    x[(i + N) % N] = v;
};

for (let i = 0; i < 100; i++) {
    const p = [get(c, cidx + 1), get(c, cidx + 2), get(c, cidx + 3)];
    let dest = (get(c, cidx) + N - 1) % N;

    while (dest === p[0] || dest === p[1] || dest === p[2]) {
        dest = (dest + N - 1) % N;
    }

    const didx = c.indexOf(dest);

    //console.log(`-- move ${i + 1} --`);
    if (i % 10000 === 0) console.log(i);
    // console.log('cups:', c.map((x, n) => n === cidx ? `(${x + 1})` : `${x + 1}`).join(' '));
    // console.log('pick up:', p.map(n => n + 1).join(', '));
    // console.log('destination:', dest + 1, didx);
    // console.log();

    for (let j = (cidx + N) % N; j !== (didx + N) % N; j = (j + N - 1) % N) {
        set(c, j + 3, get(c, j));
    }
    set (c, didx + 3, p[2]);
    set (c, didx + 2, p[1]);
    set (c, didx + 1, p[0]);

    cidx = (cidx + N + 4) % N;
}

//console.log('cups:', c.map((x, n) => n === cidx ? `(${x + 1})` : `${x + 1}`).join(' '));

const oidx = c.indexOf(0);

// let s = '';
// for (let i = (oidx + N + 1) % N; i !== (oidx + N) % N; i = (i + N + 1) % N) {
//     s += `${get(c, i) + 1}`;
// }
// console.log(s);

console.log(c[(oidx + N + 1) % N] + 1, c[(oidx + N + 2) % N] + 1);
