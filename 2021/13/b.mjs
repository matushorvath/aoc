import fs from 'fs/promises';

const print = (p, Xs, Ys) => {
    let cnt = 0;
    const out = []
    for (let y = 0; y < Ys; y++) {
        for (let x = 0; x < Xs; x++) {
            out.push(p[x]?.[y] ? '#' : '.');
            if (p[x]?.[y]) cnt++;
        }
        out.push('\n');
    }
    console.log(out.join(''), cnt);
    return cnt;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const mid = data.findIndex(l => l === '');
    const pts = data.slice(0, mid).map(l => l.split(',').map(Number));
    const fds = data.slice(mid + 1).map(l => {
        const m = l.match(/fold along ([xy])=([0-9]+)/);
        return [m[1], Number(m[2])];
    });

    console.log(pts);
    console.log(fds);

    let p = [];

    let Xs = 0;
    let Ys = 0;

    for (const [x, y] of pts) {
        if (p[x] === undefined) p[x] = [];
        p[x][y] = 1;
        if (x >= Xs) Xs = x + 1;
        if (y >= Ys) Ys = y + 1;
    }

    for (const fd of fds) {
        if (fd[0] === 'x') {
            for (let x = 0; x < Xs / 2; x++) {
                for (let y = 0; y < Ys; y++) {
                    if (p[Xs - x - 1]?.[y]) {
                        if (p[x] === undefined) p[x] = [];
                        p[x][y] = p[Xs - x - 1][y];
                    }
                }
            }
            Xs = Math.floor(Xs / 2);
            p = p.slice(0, Xs);
        } else {
            for (let y = 0; y < Ys / 2; y++) {
                for (let x = 0; x < Xs; x++) {
                    if (p[x]?.[Ys - y - 1]) {
                        if (p[x] === undefined) p[x] = [];
                        p[x][y] = p[x][Ys - y - 1];
                    }
                }
            }
            Ys = Math.floor(Ys / 2);
            for (let x = 0; x < Xs; x++) {
                if (p[x]) p[x] = p[x].slice(0, Ys);
            }
        }

        print(p, Xs, Ys);
    }
};

await main();
