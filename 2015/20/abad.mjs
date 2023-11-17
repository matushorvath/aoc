import factorization from 'factorization';

//const input = 34000000;
const input = 2000;

const combine = (f) => {
    const res = [...f];
    for (let i = 0; i < f.length; i++) {
        const cnf = combine(f.toSpliced(i, 1));
        res.push(...[...cnf].map(x => f[i] * x));
    }
    return [...new Set(res)];
};

let cnt = 0;

for (let h = 1; h < input; h++) {
    const f = factorization(h);
    //console.log(h, f);
    const divs = combine(f);
    const sum = 10 + 10 * divs.reduce((p, c) => p + c, 0);
    if (sum >= input) {
        console.log('result', h, divs, sum);
        break;
    }
    if (++cnt % 1 === 0) console.log(h, sum);
}

//console.log('result', );
