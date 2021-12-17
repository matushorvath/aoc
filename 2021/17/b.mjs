import fs from 'fs/promises';

let xmn, xmx, ymn, ymx;

const simulate = (vx, vy) => {
    let x = 0;
    let y = 0;

    while (x <= xmx && y >= ymn) {
        x += vx;
        y += vy;
        if (vx > 0) vx--;
        vy--;
        if (x >= xmn && x <= xmx && y >= ymn && y <= ymx) {
            return true;
        }
    }
    return false;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().trim();
    const m = data.match(/target area: x=([-0-9]+)..([-0-9]+), y=([-0-9]+)..([-0-9]+)/);

    xmn = Number(m[1]);
    xmx = Number(m[2]);
    ymn = Number(m[3]);
    ymx = Number(m[4]);

    let cnt = 0;
    for (let vx = 0; vx < 9999; vx++) {
        for (let vy = ymn; vy < 9999; vy++) {
            if (simulate(vx, vy)) cnt++;
        }
    }

    console.log(cnt);
};

await main();
