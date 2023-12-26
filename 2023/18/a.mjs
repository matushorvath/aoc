import { countReset } from 'console';
import fs from 'fs/promises';
import os from "os";

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/(.) (\d+) \(#(.{6})\)/);
    return {
        dir: m[1],
        len: Number(m[2]),
        color: m[3]
    };
});

//console.log(data);

const set = (f, r, c) => {
    if (!f[r]) f[r] = {};
    f[r][c] = true;
}

const lparam = (pos, dir, len) => {
    switch (dir) {
        case 'U': return { type: 'v', src: [pos[0] - len, pos[1]], tgt: [pos[0], pos[1]], npos: [pos[0] - len, pos[1]] };
        case 'D': return { type: 'v', src: [pos[0], pos[1]], tgt: [pos[0] + len, pos[1]], npos: [pos[0] + len, pos[1]] };
        case 'L': return { type: 'h', src: [pos[0], pos[1] - len], tgt: [pos[0], pos[1]], npos: [pos[0], pos[1] - len] };
        case 'R': return { type: 'h', src: [pos[0], pos[1]], tgt: [pos[0], pos[1] + len], npos: [pos[0], pos[1] + len] };
    }
};

const bounds = (f) => {
    const rs = Object.keys(f);
    const cs = Object.values(f).flatMap(c => Object.keys(c));

    const rmn = Math.min(...rs);
    const rmx = Math.max(...rs);

    const cmn = Math.min(...cs);
    const cmx = Math.max(...cs);

    return { rmn, rmx, cmn, cmx };
};

const print = (f) => {
    const { rmn, rmx, cmn, cmx } = bounds(f);

    const out = [];
    for (let r = rmn; r <= rmx; r++) {
        for (let c = cmn; c <= cmx; c++) {
            out.push(f[r]?.[c] ? '#' : '.');
        }
        out.push(os.EOL);
    }

    console.log(out.join(''));
};

const count = (f) => {
    const { rmn, rmx, cmn, cmx } = bounds(f);

    let cnt = 0;
    for (let r = rmn; r <= rmx; r++) {
        for (let c = cmn; c <= cmx; c++) {
            if (f[r]?.[c]) cnt++;
        }
    }

    return cnt;
};

const floodfill = (f) => {
    const { rmn, rmx, cmn, cmx } = bounds(f);

    const queue = [[1, 1]]; // TODO detect
    while (queue.length) {
        const [r, c] = queue.pop();
        if (!f[r]?.[c]) {
            set(f, r, c);

            if (r > rmn) queue.push([r - 1, c]);
            if (r < rmx) queue.push([r + 1, c]);
            if (c > cmn) queue.push([r, c - 1]);
            if (c < cmx) queue.push([r, c + 1]);
        }
    }
};

const field = {};
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

//print(field);

floodfill(field);

print(field);

console.log('result', count(field));
