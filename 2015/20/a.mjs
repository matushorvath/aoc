import factorization from 'factorization';

//const input = 34000000;
const input = 300;

const mem = {};

const calc = (num, f) => {
    const res = [num];

    for (let i = 0; i < f.size; i++) {
        const nnum = num / f[i];
        const nf = new Set(f);
        nf.delete(f[i]);

        res.push(nnum, ...calc(nnum, nf));
    }

    return res;
};

let h = 1;
while (true) {
    const res = calc(h, new Set(factorization(h)));
    const pres = 10 + 10 * [...res].reduce((p, c) => p + c, 0);

    if (pres >= input) {
        console.log('result', h, pres);
        break;
    }
    //if (h % 100000 === 0) {
        console.log(h, res, pres);
    //}
    h++;
}

// 226800 too low
