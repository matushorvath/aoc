import fs from 'fs/promises';

const sp = (m, x, y, r, v) => {

};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const m = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    for (let x = 0; x < m.length; x++) {
        m[x] = [
            ...m[x],
            ...m[x].map(n => (n  ) % 9 + 1),
            ...m[x].map(n => (n+1) % 9 + 1),
            ...m[x].map(n => (n+2) % 9 + 1),
            ...m[x].map(n => (n+3) % 9 + 1)
        ]
    }

    const ml = m.length;
    for (let i = 0; i < 4; i++) {
        for (let x = 0; x < ml; x++) {
            m.push(m[x].map(n => (n + i) % 9 + 1));
        }
    }

    const r = [];
    r[0] = [0];
    m[0][0] = 0;

    let ch = true;
    while (ch) {
        ch = false;
        for (let x = 0; x < m.length; x++) {
            for (let y = 0; y < m[0].length; y++) {
                if (x === 0 && y === 0) continue;
                if (!r[x]) r[x] = [];
                const rn = Math.min(
                    r[x-1]?.[y] ?? Infinity,
                    r[x+1]?.[y] ?? Infinity,
                    r[x]?.[y-1] ?? Infinity,
                    r[x]?.[y+1] ?? Infinity
                    ) + m[x][y];
                if (rn != r[x][y]) ch = true;
                r[x][y] = rn;
            }
        }
        console.log(r);
    }

    console.log(r[r.length - 1][r[0].length - 1]);
};

await main();
