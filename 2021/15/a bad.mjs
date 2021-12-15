import fs from 'fs/promises';

const sp = (m, x, y, r, v) => {
    if (!v[x]) v[x] = [];
    v[x][y] = true;

    //console.log(x, y);

    const wl = (x > 1 && !v[x-1]?.[y]) ? (r[`${x-1}:${y}`] ?? sp(m, x-1, y, r, v)) : NaN;
    const wr = (x < m.length - 1 && !v[x+1]?.[y]) ? (r[`${x+1}:${y}`] ?? sp(m, x+1, y, r, v)) : NaN;
    const wt = (y > 1 && !v[x]?.[y-1]) ? (r[`${x}:${y-1}`] ?? sp(m, x, y-1, r, v)) : NaN;
    const wb = (y < m[0].length - 1 && !v[x]?.[y+1]) ? (r[`${x}:${y+1}`] ?? sp(m, x, y+1, r, v)) : NaN;

    r[`${x}:${y}`] = Math.min(wl, wr, wt, wb) + m[x][y];
    return r[`${x}:${y}`];
};

const main = async () => {
    const input = await fs.readFile('input.ex', 'utf8');
    const m = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    const out = sp(m, m.length - 1, m[0].length - 1, {}, []);

    console.log(out);
};

await main();
