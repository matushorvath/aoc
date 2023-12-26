import fs from 'fs/promises';
import os from "os";

//const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('example2', 'utf8');
//const input = await fs.readFile('example3', 'utf8');
const input = await fs.readFile('input', 'utf8');

// const data = input.trimEnd().split(/\r?\n/).map(r => { // A
//     const m = r.match(/(.) (\d+) \(#(.{6})\)/);
//     return {
//         dir: m[1],
//         len: Number(m[2])
//     };
// });

const n2d = ['R', 'D', 'L', 'U']

const data = input.trimEnd().split(/\r?\n/).map(r => { // B
    const m = r.match(/. \d+ \(#(.{5})(.)\)/);
    return {
        dir: n2d[Number(m[2])],
        len: parseInt(m[1], 16)
    };
});

//console.log(data);

// const set = (f, r, c) => {
//     if (!f[r]) f[r] = {};
//     f[r][c] = true;
// }

const setv = (f, ri1, ri2, ci) => {
    const frs = f.filter(r => r.t >= ri1 && r.f <= ri2);

    for (const fr of frs) {
        if (fr.f !== fr.t) {
            if (fr.f <= ri1 - 1) f.push({ f: fr.f, t: ri1 - 1, cs: fr.cs });
            if (ri2 + 1 <= fr.t) f.push({ f: ri2 + 1, t: fr.t, cs: fr.cs });

            fr.f = Math.max(fr.f, ri1);
            fr.t = Math.min(fr.t, ri2);
        }

        fr.cs = structuredClone(fr.cs);
        const fc = fr.cs.find(c => c.f <= ci && c.t >= ci);

        if (fc.f !== fc.t) {
            if (fc.f <= ci - 1) fr.cs.push({ f: fc.f, t: ci - 1, v: fc.v });
            if (ci + 1 <= fc.t) fr.cs.push({ f: ci + 1, t: fc.t, v: fc.v });

            fc.f = ci;
            fc.t = ci;
        }

        fc.v = true;
    }
};

const seth = (f, ri, ci1, ci2) => {
    const fr = f.find(r => r.f <= ri && r.t >= ri);

    if (fr.f !== fr.t) {
        if (fr.f <= ri - 1) f.push({ f: fr.f, t: ri - 1, cs: fr.cs });
        if (ri + 1 <= fr.t) f.push({ f: ri + 1, t: fr.t, cs: fr.cs });

        fr.f = ri;
        fr.t = ri;
    }

    fr.cs = structuredClone(fr.cs);
    const fcs = fr.cs.filter(c => c.t >= ci1 && c.f <= ci2);

    for (const fc of fcs) {
        if (fc.f !== fc.t) {
            if (fc.f <= ci1 - 1) fr.cs.push({ f: fc.f, t: ci1 - 1, v: fc.v });
            if (ci2 + 1 <= fc.t) fr.cs.push({ f: ci2 + 1, t: fc.t, v: fc.v });

            fc.f = Math.max(fc.f, ci1);
            fc.t = Math.min(fc.t, ci2);
        }

        fc.v = true;
    }
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
    let ph = new Set();
    for (const row of f.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
        for (let r = (row.f === -Infinity ? rmn : row.f); r <= (row.t === Infinity ? rmx : row.t); r++) {
            let inside = false;
            let hashcount = 0;
            let hashstart;
            const ch = new Set();

            for (const col of row.cs.toSorted((a, b) => b.f < a.f ? 1 : -1)) {
                if (!col.v) {
                    if (hashcount > 0) {
                        if (hashcount === 1 || ph.has(hashstart) !== ph.has(col.f - 1)) inside = !inside;
                    }
                    hashcount = 0;
                } else {
                    if (hashcount === 0) hashstart = col.f;
                    hashcount += col.t - col.f + 1;
                    if (col.f === col.t) ch.add(col.f);
                }

                if (col.v || inside) {
                    const cf = (col.f === -Infinity ? cmn : col.f);
                    const ct = (col.t === Infinity ? cmx : col.t);
                    sum += ct - cf + 1;
                }
            }
            ph = ch;
            //console.log(sum);
        }
    }

    return sum;
};

const field = [{ f: -Infinity, t: Infinity, cs: [{ f: -Infinity, t: Infinity }] }];
let pos = [0, 0];

for (const { dir, len } of data) {
    //console.log(dir, len);

    const { type, src, tgt, npos } = lparam(pos, dir, len);
    if (type === 'v') {
        setv(field, src[0], tgt[0], src[1]);
        pos = npos;
    } else if (type === 'h') {
        seth(field, src[0], src[1], tgt[1]);
        pos = npos;
    }

    //print(field);
}

//print(field);

console.log('result', count(field));
