import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

//console.log(data);

const q = [{ r: 0, c: 0, len: 0, dr: 0, dc: 1, loss: 0, path: [] }];
const mins = {};

const mkkey = (r, c, dr, dc) => ((r * data.length + c) * data[0].length + (dr + 1)) * 3 + (dc + 1);

const nz = n => n === -0 ? 0 : n;

const push1 = (data, or, oc, olen, ndr, ndc, oloss, opath) => {
    const nr = or + ndr;
    const nc = oc + ndc;
    if (nr < 0 || nr > data.length - 1 || nc < 0 || nc > data[0].length - 1) return;

    const nlen = olen + 1;
    const nloss = oloss + data[nr][nc];

    const key = mkkey(nr, nc, ndr, ndc);
    if (mins[key]?.some(({ loss }, len) => len < nlen && loss <= nloss)) return;

    const npath = undefined;
    //const npath = [...opath, [nr, nc]];
    if (!mins[key]) mins[key] = [];
    mins[key][nlen] = { r: nr, c: nc, loss: nloss, path: npath };

    q.push({ r: nr, c: nc, len: nlen, dr: ndr, dc: ndc, loss: nloss, path: npath });
};

const push4 = (data, or, oc, olen, ndr, ndc, oloss, opath) => {
    const nr = or + 4 * ndr;
    const nc = oc + 4 * ndc;
    if (nr < 0 || nr > data.length - 1 || nc < 0 || nc > data[0].length - 1) return;

    const nlen = olen + 4;
    const nloss = oloss + data[or + ndr][oc + ndc] + data[or + 2 * ndr][oc + 2 * ndc]
        + data[or + 3 * ndr][oc + 3 * ndc] + data[or + 4 * ndr][oc + 4 * ndc];

    const key = mkkey(nr, nc, ndr, ndc);
    if (mins[key]?.some(({ loss }, len) => len <= nlen && loss <= nloss)) return;

    const npath = undefined;
    //const npath = [...opath, [nr, nc]];
    if (!mins[key]) mins[key] = [];
    mins[key][nlen] = { r: nr, c: nc, loss: nloss, path: npath };

    q.push({ r: nr, c: nc, len: nlen, dr: ndr, dc: ndc, loss: nloss, path: npath });
};

let cnt = 0;

while (q.length) {
    const { r, c, len, dr, dc, loss, path } = q.pop();

    if (cnt++ % 10000000 === 0) console.log(cnt, q.length, Object.keys(mins).length);

    // const key = mkkey(r, c, len, dr, dc);
    // if (mins[key] < loss) continue;
    // mins[key] = loss;

    // straight
    if (len === 0) {
        push4(data, r, c, len, dr, dc, loss, path);
    } else if (len < 9) {
        push1(data, r, c, len, dr, dc, loss, path);
    }

    // left, right
    push4(data, r, c, 0, dc, nz(-dr), loss, path);
    push4(data, r, c, 0, nz(-dc), dr, loss, path);
}

//console.log(Object.values(mins));

const tgts = Object.values(mins).flatMap(lm => lm).filter(({ r, c }) => r === data.length - 1 && c === data[0].length - 1);

const min = Math.min(...tgts.map(({ loss }) => loss));

const path = tgts.filter(({ loss }) => loss === min)[0].path;
if (path) console.log(path);

console.log('result', min);

// 1045 high
