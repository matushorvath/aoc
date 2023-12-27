import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/(\d+),(\d+),(\d+)~(\d+),(\d+),(\d+)/);
    return {
        p1: { x: Number(m[1]), y: Number(m[2]), z: Number(m[3]) },
        p2: { x: Number(m[4]), y: Number(m[5]), z: Number(m[6]) }
    }
});

//console.log(data);

const bricks = data.toSorted((a, b) => Math.min(a.p1.z, a.p2.z) - Math.min(b.p1.z, b.p2.z));

//console.log(datas);

const inithm = (bricks, hm) => {
    const xs = bricks.flatMap(b => [b.p1.x, b.p2.x]);
    const ys = bricks.flatMap(b => [b.p1.y, b.p2.y]);

    const xmn = Math.min(...xs);
    const xmx = Math.max(...xs);
    const ymn = Math.min(...ys);
    const ymx = Math.max(...ys);

    for (let x = xmn; x <= xmx; x++) {
        hm[x] = [];
        for (let y = ymn; y <= ymx; y++) {
            hm[x][y] = { z: 1 };
        }
    }
};

const hm = [];
inithm(bricks, hm);

const analyze = (br) => {
    const nw = { x: Math.min(br.p1.x, br.p2.x), y: Math.min(br.p1.y, br.p2.y) };
    const se = { x: Math.max(br.p1.x, br.p2.x), y: Math.max(br.p1.y, br.p2.y) };
    const zmn = Math.min(br.p1.z, br.p2.z);
    const zmx = Math.max(br.p1.z, br.p2.z);
    return { nw, se, zmn, zmx };
};

const supp = [];

const fall = (hm, abr, bri) => {
    let zfall = 1;

    for (let x = abr.nw.x; x <= abr.se.x; x++) {
        for (let y = abr.nw.y; y <= abr.se.y; y++) {
            if (hm[x][y].z >= zfall) {
                if (!supp[bri] || hm[x][y].z > zfall) {
                    supp[bri] = new Set();
                }
                supp[bri].add(hm[x][y].bri);

                zfall = hm[x][y].z;
            }
        }
    }
    return zfall;
};

const paint = (hm, zfall, abr, bri) => {
    const ztop = zfall + (abr.zmx - abr.zmn + 1);

    for (let x = abr.nw.x; x <= abr.se.x; x++) {
        for (let y = abr.nw.y; y <= abr.se.y; y++) {
            hm[x][y] = { bri, z: ztop };
        }
    }
};

for (let bri = 0; bri < bricks.length; bri++) {
    const br = bricks[bri];

    const abr = analyze(br);
    const zfall = fall(hm, abr, bri);
    paint(hm, zfall, abr, bri);
}

// const rsupp = [];
// for (let bri = 0; bri < supp.length; bri++) {
//     for (const sb of supp[bri]) {
//         if (sb !== undefined) {
//             if (!rsupp[sb]) rsupp[sb] = new Set();
//             rsupp[sb].add(bri);
//         }
//     }
//     if (!rsupp[bri]) rsupp[bri] = new Set(); // avoid undefined for top bricks
// }

console.log(supp); // what is supporting i-th brick
// console.log(rsupp); // what is i-th brick supporting

let count = 0;

for (let bri = 0; bri < bricks.length; bri++) {
    const sc = structuredClone(supp);

    console.log('>>>', bri);

    const q = [bri];
    while (q.length) {
        const btmbri = q.pop();

        for (let topbri = 0; topbri < sc.length; topbri++) {
            const btmbris = sc[topbri];
            const deleted = btmbris.delete(btmbri);

            if (deleted && btmbris.size === 0) {
                q.push(topbri);
                //console.log(topbri);
                count++;
            }
        }
    }
}

console.log('result', count);


// const allfalls = [];

// for (let bri = bricks.length - 1; bri >= 0; bri--) {
//     const falls = new Set();

//     for (const upbri of rsupp[bri]) {
//         // Immediately supported
//         falls.add(upbri);

//         // Indirectly supported
//         for (const upupbri of allfalls[upbri]) {
//             falls.add(upupbri);
//         }
//     }

//     allfalls[bri] = falls;
//     console.log(bri, falls);
// }

// console.log(supp);

// const removable = [...bricks.keys()].filter(bri => supp.every(sbs => sbs.size > 1 || !sbs.has(bri)));

// console.log(removable);
// console.log('result', removable.length);

