import { countReset } from 'console';
import fs from 'fs/promises';
import os from "os";

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => { // A
    const m = r.match(/(.) (\d+) \(#(.{6})\)/);
    return {
        dir: m[1],
        len: Number(m[2])
    };
});

// const n2d = ['R', 'D', 'L', 'U']
//
// const data = input.trimEnd().split(/\r?\n/).map(r => { // B
//     const m = r.match(/. \d+ \(#(.{5})(.)\)/);
//     return {
//         dir: n2d[Number(m[2])],
//         len: parseInt(m[1], 16)
//     };
// });

//console.log(data);

// const set = (f, r, c) => {
//     if (!f[r]) f[r] = {};
//     f[r][c] = true;
// }

const set = (f, ri, ci) => {
    const fri = f.findIndex(r => r.f <= ri && r.t >= ri);
    let fr = f[fri];

    const fci = fr.cs.findIndex(c => c.f <= ci && c.t >= ci);
    let fc = fr.cs[fci];

    if (fc.v) return;

    if (fr.f !== fr.t) {
        if (fr.f <= ri - 1) f.push({ f: fr.f, t: ri - 1, cs: fr.cs });
        if (ri + 1 <= fr.t) f.push({ f: ri + 1, t: fr.t, cs: fr.cs });
        fr = f[fri] = { f: ri, t: ri, cs: [...fr.cs] };
    }

    if (fc.f !== fc.t) {
        if (fc.f <= ci - 1) fr.cs.push({ f: fc.f, t: ci - 1, v: fc.v });
        if (ci + 1 <= fc.t) fr.cs.push({ f: ci + 1, t: fc.t, v: fc.v });
        fc = fr.cs[fci] = { f: ci, t: ci, v: fc.v };
    }

    fc.v = true;
};

const lparam = (pos, dir, len) => {
    switch (dir) {
        case 'U': return { type: 'v', src: [pos[0] - len, pos[1]], tgt: [pos[0], pos[1]], npos: [pos[0] - len, pos[1]] };
        case 'D': return { type: 'v', src: [pos[0], pos[1]], tgt: [pos[0] + len, pos[1]], npos: [pos[0] + len, pos[1]] };
        case 'L': return { type: 'h', src: [pos[0], pos[1] - len], tgt: [pos[0], pos[1]], npos: [pos[0], pos[1] - len] };
        case 'R': return { type: 'h', src: [pos[0], pos[1]], tgt: [pos[0], pos[1] + len], npos: [pos[0], pos[1] + len] };
    }
};

const bounds = (f) => {
    const rmn = Math.min(...Object.values(f).flatMap(({ f }) => f === -Infinity ? [] : [f]));
    const rmx = Math.max(...Object.values(f).flatMap(({ t }) => t === Infinity ? [] : [t]));

    const cmn = Math.min(...Object.values(f).flatMap(({ cs }) => cs.flatMap(({ f }) => f === -Infinity ? [] : [f])));
    const cmx = Math.max(...Object.values(f).flatMap(({ cs }) => cs.flatMap(({ t }) => t === Infinity ? [] : [t])));

    return { rmn, rmx, cmn, cmx };
};

const print = (f) => {
    const { rmn, rmx, cmn, cmx } = bounds(f);

    const out = [];
    for (const row of f.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
        for (let r = (row.f === -Infinity ? rmn : row.f); r <= (row.t === Infinity ? rmx : row.t); r++) {
            for (const col of row.cs.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
                for (let c = (col.f === -Infinity ? cmn : col.f); c <= (col.t === Infinity ? cmx : col.t); c++) {
                    out.push(col.v ? '#' : '.');
                }
            }
            out.push(os.EOL);
        }
    }

    console.log(out.join(''));
};

const count = (f) => {
    const { rmn, rmx, cmn, cmx } = bounds(f);

    let sum = 0;
    for (const row of f.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
        for (let r = (row.f === -Infinity ? rmn : row.f); r <= (row.t === Infinity ? rmx : row.t); r++) {
            let inside = false;
            let lastv = false;

            for (const col of row.cs.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
                if (col.v && !lastv) inside = !inside;
                lastv = col.v;

                if (col.v || inside) {
                    const cf = (col.f === -Infinity ? cmn : col.f);
                    const ct = (col.t === Infinity ? cmx : col.t);
                    sum += ct - cf + 1;
                }
            }
        }
    }

    return sum;
};

const field = [{ f: -Infinity, t: Infinity, cs: [{ f: -Infinity, t: Infinity }] }];
set(field, 0, 0);

let pos = [0, 0];

for (const { dir, len } of data) {
    const { type, src, tgt, npos } = lparam(pos, dir, len);
    if (type === 'v') {
        for (let r = src[0]; r <= tgt[0]; r++) {
            set(field, r, src[1]);
        }
        pos = npos;
    } else if (type === 'h') {
        for (let c = src[1]; c <= tgt[1]; c++) {
            set(field, src[0], c);
        }
        pos = npos;
    }

    //print(field);
}

print(field);

console.log('result', count(field));
