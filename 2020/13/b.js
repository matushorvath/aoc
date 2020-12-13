const mjs = require('mathjs');

const data = require('fs').readFileSync('input', 'utf8').trim().split('\n');
const data1 = data[1].split(',');

let bs = [];
let ds = [];

for (let i = 0; i < data1.length; i++) {
    if (data1[i] !== 'x') {
        bs.push(parseInt(data1[i], 10));
        ds.push(i);
    }
}

// const bs = [7, 13, 59, 31, 19];
// const ds = [0, 1, 4, 6, 7];

//const bs = [2, 3, 5];
//const ds = [0, 1, 2];

//const ms = [(2-0)%2, (3-1)%3, (5-2)%5];
//console.log(ms);

let n = 0;
let lcm = 1

for (let i = 0; i < bs.length; i++) {
    let m = (-ds[i]) % bs[i];
    while (m < 0) m += bs[i];
    //console.log('s-', bs[i], lcm, m);
    while (n % bs[i] !== m) {
        //console.log('->', n % bs[i]);
        n += lcm;
    }
    lcm = mjs.lcm(lcm, bs[i]);
    //console.log(n);
}

console.log(n);

// 7 0
// 13 1
// 59 4
// 31 6
// 19 7

// LCM = 3162341
// LCM = 84
