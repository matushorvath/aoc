import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8'); const areaMin = 7, areaMax = 27;
const input = await fs.readFile('input', 'utf8'); const areaMin = 200000000000000, areaMax = 400000000000000;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/([-0-9]+), +([-0-9]+), +([-0-9]+) +@ +([-0-9]+), +([-0-9]+), +([-0-9]+)/);
    return {
        p: { x: Number(m[1]), y: Number(m[2]), z: Number(m[3]) },
        v: { x: Number(m[4]), y: Number(m[5]), z: Number(m[6]) }
    };
});

//console.log(data);

let res = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
        const h1 = data[i];
        const h2 = data[j];

        const { p: p1, v: v1 } = h1;
        const { p: p2, v: v2 } = h2;

        const a = ((p1.y - p2.y) / v2.y - (p1.x - p2.x) / v2.x) / (v1.x / v2.x - v1.y / v2.y);
        const b = ((p2.y - p1.y) / v1.y - (p2.x - p1.x) / v1.x) / (v2.x / v1.x - v2.y / v1.y);

        if (!isFinite(a) || !isFinite(b)) {
            //console.log(h1, h2, 'never meet');
        } else if (a >= 0 && b >= 0) {
            const cmn = { x: v1.x * a + p1.x, y: v1.y * a + p1.y };
            const inside = cmn.x >= areaMin && cmn.x <= areaMax && cmn.y >= areaMin && cmn.y <= areaMax;
            if (inside) res++;
            //console.log(h1, h2, `meet ${inside ? 'inside' : 'outside'} at ${[cmn.x, cmn.y]}`);
        } else if (a < 0 && b < 0) {
            //console.log(h1, h2, 'met in past for both');
        } else if (a < 0) {
            //console.log(h1, h2, 'met in past for A');
        } else if (b < 0) {
            //console.log(h1, h2, 'met in past for B');
        }
    }
}

console.log('result', res);

/*
p1 = [19, 13], v1 = [-2,  1]
p2 = [18, 19], v2 = [-1, -1]

1  0 -2  0  19
0  1  1  0  13
1  0  0 -1  18
0  1  0 -1  19


19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3



3 + 1
x = v1x * a + p1x
y = v1y * a + p1y
z = v1z * a + p1z

+ 6
x = v0x * a + p0x
y = v0y * a + p0y
z = v0z * a + p0z

// vars v0, p0, a = 7
// eqas 3
v0 * a + p0 = v1 * a + p1      #1

// vars +b = +1 = 8
// eqas +3 = 6
v0 * b + p0 = v2 * b + p2      #2

// vars +c = +1 = 9
// eqas +3 = 9
v0 * c + p0 = v3 * c + p3      #3

#1 - #3
// vars v0 a c = 5
// equs 3
v0 * a - v0 * c = v1 * a - v3 * c + (p1 - p3)
v0 * (a - c) = v1 * a - v3 * c + (p1 - p3)
v0 = (v1 * a - v3 * c + (p1 - p3)) / (a - c)    #4

#2 - #3
// vars +b = +1 = 6
// equs 6
v0 * b - v0 * c = v2 * b - v3 * c + (p2 - p3)
v0 * (b - c) = v2 * b - v3 * c + (p2 - p3)
v0 = (v2 * b - v3 * c + (p2 - p3)) / (b - c)    #5

#4 - #5
// vars a, b, c
// equs 3
0 = (v1 * a - v3 * c + (p1 - p3)) / (a - c) - (v2 * b - v3 * c + (p2 - p3)) / (b - c)   * (a-c)(b-c)
0 = (b - c)(v1 * a - v3 * c + (p1 - p3)) + (c - a)(v2 * b - v3 * c + (p2 - p3))
0 = ab*v1 - bc*v3 + b(p1 - p3)  - ac*v1 + cc*v3 - c(p1 - p3)  + bc*v2 - cc*v3 + c(p2 - p3)  - ab*v2 + ac*v3 - a(p2 - p3)
0 = ab*v1 - ab*v2  + bc*v2 - bc*v3  + ac*v3 - ac*v1  + a(p3 - p2)  + b(p1 - p3)  + c(p2 - p1)
0 = ab*(v1 - v2) + bc*(v2 - v3) + ac*(v3 - v1) + a(p3 - p2) + b(p1 - p3) + c(p2 - p1)   #6

extract c
- ac*(v3 - v1) - bc*(v2 - v3) - c(p2 - p1) = ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3)
ac*(v1 - v3) + bc*(v3 - v2) + c(p1 - p2) = ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3)
c*(a(v1 - v3) + b(v3 - v2) + (p1 - p2)) = ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3)
c = (ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2)) #7

#6 apply #7
0 = ab*(v1 - v2) + bc*(v2 - v3) + ac*(v3 - v1) + a(p3 - p2) + b(p1 - p3) + c(p2 - p1)
c = (ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))

0 = ab*(v1 - v2)
    + b*(v2 - v3)*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + a*(v3 - v1)*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + (p2 - p1)  *(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + a(p3 - p2) + b(p1 - p3)

0 = ab*(v1 - v2)
    + bv2*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    - bv3*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + av3*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    - av1)*(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + p2(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    - p1(ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3))  /  (a(v1 - v3) + b(v3 - v2) + (p1 - p2))
    + a(p3 - p2) + b(p1 - p3)

0 = ab*(v1 - v2)
    + bv2*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - bv3*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + av3*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - av1*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + p2*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - p1*(abv1 - abv2 + ap3 - ap2 + bp1 - bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + a(p3 - p2) + b(p1 - p3)

0 = ab*(v1 - v2)
    + (abbv2v1 - abbv2v2 + abv2p3 - abv2p2 + bbv2p1 - bbv2p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (abbv1v3 - abbv2v3 + abv3p3 - abv3p2 + bbv3p1 - bbv3p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + (aav3bv1 - aav3bv2 + aav3p3 - aav3p2 + bav3p1 - bav3p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (aav1bv1 - aav1bv2 + aav1p3 - aav1p2 + av1bp1 - av1bp3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + (abv1p2 - abv2p2 + ap3p2 - ap2p2 + bp1p2 - bp3p2) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (abv1p1 - abv2p1 + ap3p1 - ap2p1 + bp1p1 - bp3p1) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + a(p3 - p2) + b(p1 - p3)

0 = ab*(v1 - v2)
    + (abbv1v2 - abbv2v2 + abv2p3 - abv2p2 + bbv2p1 - bbv2p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (abbv1v3 - abbv2v3 + abv3p3 - abv3p2 + bbv3p1 - bbv3p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + (aabv1v3 - aabv2v3 + aav3p3 - aav3p2 + abv3p1 - abv3p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (aabv1v1 - aabv1v2 + aav1p3 - aav1p2 + abv1p1 - abv1p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + (abv1p2 - abv2p2 + ap2p3 - ap2p2 + bp1p2 - bp2p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    - (abv1p1 - abv2p1 + ap1p3 - ap1p2 + bp1p1 - bp1p3) / (av1 - av3 + bv3 - bv2 + p1 - p2)
    + a(p3 - p2) + b(p1 - p3)

0 =   (abv1 - abv2)*(av1 - av3 + bv3 - bv2 + p1 - p2)
    + (abbv1v2 - abbv2v2 + abv2p3 - abv2p2 + bbv2p1 - bbv2p3)
    - (abbv1v3 - abbv2v3 + abv3p3 - abv3p2 + bbv3p1 - bbv3p3)
    + (aabv1v3 - aabv2v3 + aav3p3 - aav3p2 + abv3p1 - abv3p3)
    - (aabv1v1 - aabv1v2 + aav1p3 - aav1p2 + abv1p1 - abv1p3)
    + (abv1p2 - abv2p2 + ap2p3 - ap2p2 + bp1p2 - bp2p3)
    - (abv1p1 - abv2p1 + ap1p3 - ap1p2 + bp1p1 - bp1p3)
    + (ap3 - ap2 + bp1 - bp3)*(av1 - av3 + bv3 - bv2 + p1 - p2)

0 =   (abv1 - abv2)*(bv3 - bv2)
    + (abv1 - abv2)*(av1 - av3 + p1 - p2)
    + (abbv1v2 - abbv2v2 + bbv2p1 - bbv2p3)
    + (abv2p3 - abv2p2)
    - (abbv1v3 - abbv2v3 + bbv3p1 - bbv3p3)
    - (abv3p3 - abv3p2)
    + (aabv1v3 - aabv2v3 + abv3p1 - abv3p3)
    + (aav3p3 - aav3p2)
    - (aabv1v1 - aabv1v2 + abv1p1 - abv1p3)
    - (aav1p3 - aav1p2)
    + (abv1p2 - abv2p2 + bp1p2 - bp2p3)
    + (ap2p3 - ap2p2)
    - (abv1p1 - abv2p1 + bp1p1 - bp1p3)
    - (ap1p3 - ap1p2)
    + (bp1 - bp3)*(bv3 - bv2)
    + (bp1 - bp3)*(av1 - av3 + p1 - p2)
    + (ap3 - ap2)*(bv3 - bv2)
    + (ap3 - ap2)*(av1 - av3 + p1 - p2)

    //
    + (bbv3p1 - bbv2p1 - bbv3p3 + bbv2p3)
    + (abv1p1 - abv3p1 + bp1p1 - bp1p2 - abv1p3 + abv3p3 - bp1p3 + bp2p3)
    + (abv3p3 - abv2p3 - abv3p2 + abv2p2)
    + (aav1p3 - aav3p3 + ap1p3 - ap2p3 - aav1p2 + aav3p2 - ap1p2 + ap2p2)

0 =
    + (abbv1v2 - abbv2v2 + bbv2p1 - bbv2p3)
    - (abbv1v3 - abbv2v3 + bbv3p1 - bbv3p3)
    + (bbv3p1 - bbv2p1 - bbv3p3 + bbv2p3)

    + (abv1 - abv2)*(bv3 - bv2)
    + (abv1 - abv2)*(av1 - av3 + p1 - p2)
    + (abv2p3 - abv2p2)
    - (abv3p3 - abv3p2)
    + (aabv1v3 - aabv2v3 + abv3p1 - abv3p3)
    - (aabv1v1 - aabv1v2 + abv1p1 - abv1p3)
    + (abv1p2 - abv2p2 + bp1p2 - bp2p3)
    - (abv1p1 - abv2p1 + bp1p1 - bp1p3)
    + (abv1p1 - abv3p1 + bp1p1 - bp1p2 - abv1p3 + abv3p3 - bp1p3 + bp2p3)
    + (abv3p3 - abv2p3 - abv3p2 + abv2p2)

    + (aav3p3 - aav3p2)
    - (aav1p3 - aav1p2)
    + (ap2p3 - ap2p2)
    - (ap1p3 - ap1p2)
    + (aav1p3 - aav3p3 + ap1p3 - ap2p3 - aav1p2 + aav3p2 - ap1p2 + ap2p2)

0 =
    + (abbv1v2 - abbv2v2 + bbv2p1 - bbv2p3)
    + (- abbv1v3 + abbv2v3 - bbv3p1 + bbv3p3)
    + (bbv3p1 - bbv2p1 - bbv3p3 + bbv2p3)
    + (abv1 - abv2)*(bv3 - bv2)

    + (abv1 - abv2)*(av1 - av3 + p1 - p2)
    + (abv2p3 - abv2p2)
    + (- abv3p3 + abv3p2)
    + (aabv1v3 - aabv2v3 + abv3p1 - abv3p3)
    + (- aabv1v1 + aabv1v2 - abv1p1 + abv1p3)
    + (abv1p2 - abv2p2 + bp1p2 - bp2p3)
    + (- abv1p1 + abv2p1 - bp1p1 + bp1p3)
    + (abv1p1 - abv3p1 + bp1p1 - bp1p2 - abv1p3 + abv3p3 - bp1p3 + bp2p3)
    + (abv3p3 - abv2p3 - abv3p2 + abv2p2)

    + (aav3p3 - aav3p2)
    + (- aav1p3 + aav1p2)
    + (ap2p3 - ap2p2)
    + (- ap1p3 + ap1p2)
    + (aav1p3 - aav3p3 + ap1p3 - ap2p3 - aav1p2 + aav3p2 - ap1p2 + ap2p2)

0 =
    + bb(av1v2 - av2v2 + v2p1 - v2p3- av1v3 + av2v3 - v3p1 + v3p3 + v3p1 - v2p1 - v3p3 + v2p3 + av1v3 - av1v2 - av2v3 + av2v2)

    + b(aav1v1 - aav1v3 + av1p1 - av1p2 - aav1v2 + aav2v3 - av2p1 + av2p2)
    + b(av2p3 - av2p2)
    + b(- av3p3 + av3p2)
    + b(aav1v3 - aav2v3 + av3p1 - av3p3)
    + b(- aav1v1 + aav1v2 - av1p1 + av1p3)
    + b(av1p2 - av2p2 + p1p2 - p2p3)
    + b(- av1p1 + av2p1 - p1p1 + p1p3)
    + b(av1p1 - av3p1 + p1p1 - p1p2 - av1p3 + av3p3 - p1p3 + p2p3)
    + b(av3p3 - av2p3 - av3p2 + av2p2)

    + (aav3p3 - aav3p2)
    + (- aav1p3 + aav1p2)
    + (ap2p3 - ap2p2)
    + (- ap1p3 + ap1p2)
    + (aav1p3 - aav3p3 + ap1p3 - ap2p3 - aav1p2 + aav3p2 - ap1p2 + ap2p2)

// need  OMG need #4 apply 7 and #5 apply7
// everything since #6 apply #7 is useless
*/
