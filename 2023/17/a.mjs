import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

//console.log(data);

const q = [{ r: 0, c: 0, len: 0, dr: 0, dc: 1, loss: 0, path: [] }];
const mins = {};

const mkkey = (r, c, dr, dc) => ((r * data.length + c) * data[0].length + (dr + 1)) * 3 + (dc + 1);

const nz = n => n === -0 ? 0 : n;

const push = (data, or, oc, nlen, ndr, ndc, oloss, opath) => {
    const nr = or + ndr;
    const nc = oc + ndc;
    if (nr < 0 || nr > data.length - 1 || nc < 0 || nc > data[0].length - 1) return;

    const nloss = oloss + data[nr][nc];

    const key = mkkey(nr, nc, ndr, ndc);
    if (mins[key]?.some(({ loss }, len) => len <= nlen && loss <= nloss)) return;

    const npath = undefined;//[...opath, [nr, nc]];
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
    if (len < 2) {
        push(data, r, c, len + 1, dr, dc, loss, path);
    }
    // left, right
    push(data, r, c, 0, dc, nz(-dr), loss, path);
    push(data, r, c, 0, nz(-dc), dr, loss, path);
}

//console.log(Object.values(mins));

const tgts = Object.values(mins).flatMap(lm => lm).filter(({ r, c }) => r === data.length - 1 && c === data[0].length - 1);

const min = Math.min(...tgts.map(({ loss }) => loss));

//console.log(tgts.filter(({ loss }) => loss === min)[0].path);

console.log('result', min);
