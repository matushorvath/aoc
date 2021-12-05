import fs from 'fs/promises';

const inc = (m: number[][], x: number, y: number) => {
    if (!m[x]) m[x] = [];
    m[x][y] = (m[x][y]??0) + 1;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/);
        return [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
    });

    const m: number[][] = [];

    for (const p of d) {
        if (p[0] === p[2]) {
            const mn = Math.min(p[1], p[3]);
            const mx = Math.max(p[1], p[3]);
            for (let y = mn; y <= mx; y++) {
                inc(m, p[0], y);
            }
        } else if (p[1] === p[3]) {
            const mn = Math.min(p[0], p[2]);
            const mx = Math.max(p[0], p[2]);
            for (let x = mn; x <= mx; x++) {
                inc(m, x, p[1]);
            }
        } else {
            const xmn = Math.min(p[0], p[2]);
            const xmx = Math.max(p[0], p[2]);
            const ymn = Math.min(p[1], p[3]);
            const ymx = Math.max(p[1], p[3]);

            if ((p[0] < p[2]) === (p[1] < p[3])) {
                for (let x = xmn; x <= xmx; x++) {
                    inc(m, x, ymn + (x - xmn));
                }
            } else {
                for (let x = xmn; x <= xmx; x++) {
                    inc(m, x, ymx - (x - xmn));
                }
            }
        }
    }

    let cnt = 0;
    for (let x = 0; x < m.length; x++) {
        if (m[x]) for (let y = 0; y < m[x].length; y++) {
            if (m[x][y] > 1) cnt++;
        }
    }

    console.log(cnt);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
