import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(/\s+/).map(Number));

console.log(data);

// j is row, i is column
// xj_i = [coeffs_i] * [nj...n0]
// coeffs_i = first j coefficients of ith row of pascals triangle

// xj_2 = [coeffs_2] * [nj...n0]
// xj_2 = [1, 2] * [nj

const detect = (s) => {
    const bg = [[]];

    let depth = 0;
    const ns = [];

    let cs = s;
    while (true) {
        const d1 = cs[1] - cs[0];
        const d2 = cs[2] - cs[1];
        if (d1 === d2) {
            return [depth, ns];
        }
        depth++;
    }
};

for (const s of data) {
    const i = s.length;
    const [j, ns] = detect(s);
}

//console.log('result', );

/*

10  13  16  21  30  45  68
   3   3   5   9  15  23
     0   2   4   6   8
       2   2   2   2
         0   0   0


n0 = 0;
n1 = 2;
n2 = 0;
n3 = 3;
n4 = 10;

x0_0 = n0;
x0_i = x0_0;

0 0 0

x1_0 = n1
x1_i = x1_(i-1) + x0_(i-1) = n1 + i * n0
n1
n1 + x0_0 = n1 + n0
n1 + x0_0 + x0_1 = n1 + n0 + n0

2 2 2

x2_0 = n2
x2_i = x2_(i-1) + x1_(i-1) = n2 + i * n1;
n2 = n2
n2 + x1_0 = n2 + (n1 + 0 * n0) = n2 + n1
n2 + x1_0 + x1_1 = n2 + (n1 + 0 * n0) + (n1 + 1 * n0) = n2 + 2n1 + n0
n2 + x1_0 + x1_1 + x1_2 = n2 + (n1 + 0 * n0) + (n1 + 1 * n0) + (n1 + 2 * n0) = n2 + 3n1 + 3n0
n2 + x1_0 + x1_1 + x1_2 = n2 + (n1 + 0 * n0) + (n1 + 1 * n0) + (n1 + 2 * n0) + (n1 + 3 * n0) = n2 + 4n1 + 6n0
n2 + x1_0 + x1_1 + x1_2 = n2 + (n1 + 0 * n0) + (n1 + 1 * n0) + (n1 + 2 * n0) + (n1 + 3 * n0) + (n1 + 4 * n0) = n2 + 5n1 + 10n0
n2 + 6n1 + 15n0

0 2 4 6

x3_0 = n3
x3_i = x3_(i-1) + x2_(i-1)

j is row, i is column
xj_i = [coeffs_i] * [nj...n0]
coeffs_i = first j coefficients of ith row of pascals triangle

*/
