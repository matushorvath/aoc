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
c = (ab*(v1 - v2) + a(p3 - p2) + b(p1 - p3)) / (a(v1 - v3) + b(v3 - v2) + (p1 - p2)) #7

write out for x, y, z

c = (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x)) / (a(v1x - v3x) + b(v3x - v2x) + (p1x - p2x))    #8
c = (ab*(v1y - v2y) + a(p3y - p2y) + b(p1y - p3y)) / (a(v1y - v3y) + b(v3y - v2y) + (p1y - p2y))    #9
c = (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z)) / (a(v1z - v3z) + b(v3z - v2z) + (p1z - p2z))    #10

#8 - #10
0 =
      (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x)) / (a(v1x - v3x) + b(v3x - v2x) + (p1x - p2x))
    - (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z)) / (a(v1z - v3z) + b(v3z - v2z) + (p1z - p2z))  #11

#9 - #10
0 =
      (ab*(v1y - v2y) + a(p3y - p2y) + b(p1y - p3y)) / (a(v1y - v3y) + b(v3y - v2y) + (p1y - p2y))
    - (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z)) / (a(v1z - v3z) + b(v3z - v2z) + (p1z - p2z))  #12

extract b from #11 -> #13

0 =   (a(v1z - v3z) + b(v3z - v2z) + (p1z - p2z)) * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    - (a(v1x - v3x) + b(v3x - v2x) + (p1x - p2x)) * (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z))

0 =   (a(v1z - v3z) + b(v3z - v2z) + (p1z - p2z)) * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + (a(v1x - v3x) + b(v3x - v2x) + (p1x - p2x)) * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))

0 =
    + a(v1z - v3z) * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + b(v3z - v2z) * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + (p1z - p2z)  * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + a(v1x - v3x) * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + b(v3x - v2x) * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + (p1x - p2x)  * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))

0 =
    + av1z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    - av3z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + bv3z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    - bv2z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + p1z  * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    - p2z  * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + av1x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    - av3x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + bv3x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    - bv2x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + p1x  * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    - p2x  * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))

0 =
    + av1z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + av3z * (ab*(v2x - v1x) + a(p2x - p3x) + b(p3x - p1x))
    + bv3z * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + bv2z * (ab*(v2x - v1x) + a(p2x - p3x) + b(p3x - p1x))
    + p1z  * (ab*(v1x - v2x) + a(p3x - p2x) + b(p1x - p3x))
    + p2z  * (ab*(v2x - v1x) + a(p2x - p3x) + b(p3x - p1x))
    + av1x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + av3x * (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z))
    + bv3x * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + bv2x * (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z))
    + p1x  * (ab*(v2z - v1z) + a(p2z - p3z) + b(p3z - p1z))
    + p2x  * (ab*(v1z - v2z) + a(p3z - p2z) + b(p1z - p3z))

0 =
    + av1z * (ab*(v1x - v2x) + b(p1x - p3x))
    + av1z * (a(p3x - p2x))
    + av3z * (ab*(v2x - v1x) + b(p3x - p1x))
    + av3z * (a(p2x - p3x))
    + bv3z * (ab*(v1x - v2x) + b(p1x - p3x))
    + bv3z * (a(p3x - p2x))
    + bv2z * (ab*(v2x - v1x) + b(p3x - p1x))
    + bv2z * (a(p2x - p3x))
    + p1z  * (ab*(v1x - v2x) + b(p1x - p3x))
    + p1z  * (a(p3x - p2x))
    + p2z  * (ab*(v2x - v1x) + b(p3x - p1x))
    + p2z  * (a(p2x - p3x))
    + av1x * (ab*(v2z - v1z) + b(p3z - p1z))
    + av1x * (a(p2z - p3z))
    + av3x * (ab*(v1z - v2z) + b(p1z - p3z))
    + av3x * (a(p3z - p2z))
    + bv3x * (ab*(v2z - v1z) + b(p3z - p1z))
    + bv3x * (a(p2z - p3z))
    + bv2x * (ab*(v1z - v2z) + b(p1z - p3z))
    + bv2x * (a(p3z - p2z))
    + p1x  * (ab*(v2z - v1z) + b(p3z - p1z))
    + p1x  * (a(p2z - p3z))
    + p2x  * (ab*(v1z - v2z) + b(p1z - p3z))
    + p2x  * (a(p3z - p2z))

0 =
    + bv3z * (ab*(v1x - v2x) + b(p1x - p3x))
    + bv2z * (ab*(v2x - v1x) + b(p3x - p1x))
    + bv3x * (ab*(v2z - v1z) + b(p3z - p1z))
    + bv2x * (ab*(v1z - v2z) + b(p1z - p3z))

    + av1z * (ab*(v1x - v2x) + b(p1x - p3x))
    + av3z * (ab*(v2x - v1x) + b(p3x - p1x))
    + p1z  * (ab*(v1x - v2x) + b(p1x - p3x))
    + p2z  * (ab*(v2x - v1x) + b(p3x - p1x))
    + av1x * (ab*(v2z - v1z) + b(p3z - p1z))
    + av3x * (ab*(v1z - v2z) + b(p1z - p3z))
    + p1x  * (ab*(v2z - v1z) + b(p3z - p1z))
    + p2x  * (ab*(v1z - v2z) + b(p1z - p3z))
    + bv3z * (a(p3x - p2x))
    + bv2z * (a(p2x - p3x))
    + bv3x * (a(p2z - p3z))
    + bv2x * (a(p3z - p2z))

    + av1z * (a(p3x - p2x))
    + av3z * (a(p2x - p3x))
    + p1z  * (a(p3x - p2x))
    + p2z  * (a(p2x - p3x))
    + av1x * (a(p2z - p3z))
    + av3x * (a(p3z - p2z))
    + p1x  * (a(p2z - p3z))
    + p2x  * (a(p3z - p2z))

0 =
    + bv3z * (ab*(v1x - v2x) + b(p1x - p3x))
    + bv2z * (ab*(v2x - v1x) + b(p3x - p1x))
    + bv3x * (ab*(v2z - v1z) + b(p3z - p1z))
    + bv2x * (ab*(v1z - v2z) + b(p1z - p3z))

    + av1z * (ab*(v1x - v2x) + b(p1x - p3x))
    + av3z * (ab*(v2x - v1x) + b(p3x - p1x))
    + p1z  * (ab*(v1x - v2x) + b(p1x - p3x))
    + p2z  * (ab*(v2x - v1x) + b(p3x - p1x))
    + av1x * (ab*(v2z - v1z) + b(p3z - p1z))
    + av3x * (ab*(v1z - v2z) + b(p1z - p3z))
    + p1x  * (ab*(v2z - v1z) + b(p3z - p1z))
    + p2x  * (ab*(v1z - v2z) + b(p1z - p3z))
    + bv3z * (a(p3x - p2x))
    + bv2z * (a(p2x - p3x))
    + bv3x * (a(p2z - p3z))
    + bv2x * (a(p3z - p2z))

    + av1z * (a(p3x - p2x))
    + av3z * (a(p2x - p3x))
    + p1z  * (a(p3x - p2x))
    + p2z  * (a(p2x - p3x))
    + av1x * (a(p2z - p3z))
    + av3x * (a(p3z - p2z))
    + p1x  * (a(p2z - p3z))
    + p2x  * (a(p3z - p2z))

0 =
    + bb * v3z * (a*(v1x - v2x) + (p1x - p3x))
    + bb * v2z * (a*(v2x - v1x) + (p3x - p1x))
    + bb * v3x * (a*(v2z - v1z) + (p3z - p1z))
    + bb * v2x * (a*(v1z - v2z) + (p1z - p3z))

    + b * av1z * (a*(v1x - v2x) + (p1x - p3x))
    + b * av3z * (a*(v2x - v1x) + (p3x - p1x))
    + b * p1z  * (a*(v1x - v2x) + (p1x - p3x))
    + b * p2z  * (a*(v2x - v1x) + (p3x - p1x))
    + b * av1x * (a*(v2z - v1z) + (p3z - p1z))
    + b * av3x * (a*(v1z - v2z) + (p1z - p3z))
    + b * p1x  * (a*(v2z - v1z) + (p3z - p1z))
    + b * p2x  * (a*(v1z - v2z) + (p1z - p3z))
    + b * v3z * (a(p3x - p2x))
    + b * v2z * (a(p2x - p3x))
    + b * v3x * (a(p2z - p3z))
    + b * v2x * (a(p3z - p2z))

    + av1z * (a(p3x - p2x))
    + av3z * (a(p2x - p3x))
    + p1z  * (a(p3x - p2x))
    + p2z  * (a(p2x - p3x))
    + av1x * (a(p2z - p3z))
    + av3x * (a(p3z - p2z))
    + p1x  * (a(p2z - p3z))
    + p2x  * (a(p3z - p2z))

0 =
    + bb * (av1xv3z - av2xv3z + v3zp1x - v3zp3x)
    + bb * (- av1xv2z + v2zp3x - v2zp1x)
    + bb * (av2zv3x - av1zv3x + v3xp3z - v3xp1z)
    + bb * (av1zv2x + v2xp1z - v2xp3z)

    + b * (- aav1zv2x - av1zp3x)
    + b * (aav2xv3z - aav1xv3z + av3zp3x - av3zp1x)
    + b * (- av2xp1z - p1zp3x)
    + b * (av2xp2z - av1xp2z + p2zp3x - p1xp2z)
    + b * (aav1xv2z + av1xp3z)
    + b * (aav1zv3x - aav2zv3x + av3xp1z)
    + b * (av2zp1x + p1xp3z)
    + b * (av1zp2x + p1zp2x - p2xp3z)
    + b * (av3zp3x - av3zp2x)
    + b * (- av2zp3x)
    + b * (av3xp2z)
    + b * (av2xp3z - apv2x2z)

    + av1zap3x - av1zap2x
    + av3zap2x - av3zap3x
    + ap1zp3x - ap1zp2x
    - ap2zp3x
    + aav1xp2z - aav1xp3z
    + aav3xp3z - aav3xp2z
    + ap1xp2z - ap1xp3z
    + ap2xp3z   #13

extract b from #12 -> #14
(= same equation as #13, replace x with y) #14

0 =
    + bb * (av1yv3z - av2yv3z + v3zp1y - v3zp3y)
    + bb * (- av1yv2z + v2zp3y - v2zp1y)
    + bb * (av2zv3y - av1zv3y + v3yp3z - v3yp1z)
    + bb * (av1zv2y + v2yp1z - v2yp3z)

    + b * (- aav1zv2y - av1zp3y)
    + b * (aav2yv3z - aav1yv3z + av3zp3y - av3zp1y)
    + b * (- av2yp1z - p1zp3y)
    + b * (av2yp2z - av1yp2z + p2zp3y - p1yp2z)
    + b * (aav1yv2z + av1yp3z)
    + b * (aav1zv3y - aav2zv3y + av3yp1z)
    + b * (av2zp1y + p1yp3z)
    + b * (av1zp2y + p1zp2y - p2yp3z)
    + b * (av3zp3y - av3zp2y)
    + b * (- av2zp3y)
    + b * (av3yp2z)
    + b * (av2yp3z - apv2y2z)

    + av1zap3y - av1zap2y
    + av3zap2y - av3zap3y
    + ap1zp3y - ap1zp2y
    - ap2zp3y
    + aav1yp2z - aav1yp3z
    + aav3yp3z - aav3yp2z
    + ap1yp2z - ap1yp3z
    + ap2yp3z   #14

TODO solve #13 and #14 for a, b
*/
