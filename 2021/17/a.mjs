import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('challenge.input', 'utf8');
    const data = input.trimEnd().trim();
    const m = data.match(/target area: x=([-0-9]+)..([-0-9]+), y=([-0-9]+)..([-0-9]+)/);

    const xmn = Number(m[1]);
    const xmx = Number(m[2]);
    const ymn = Number(m[3]);
    const ymx = Number(m[4]);

    const vx = Math.ceil(0.5 * (Math.sqrt(8 * xmn + 1) - 1));

    // (x+1)*x/2 = V, solve for x
    // n^2 - n*(2vy+1) +2y = 0, solve for n

    let vymx = 0;

    for (let vy = 0; vy < 999999; vy++) {
        const nmx = 0.5 * (2*vy + Math.sqrt((2*vy + 1)**2 - 8*ymx) + 1);
        const nmn = 0.5 * (2*vy + Math.sqrt((2*vy + 1)**2 - 8*ymn) + 1);

        if (Math.ceil(nmx) === Math.floor(nmn)) {
            if (vy > vymx) vymx = vy;
        }
    }

    console.log(vymx * (vymx+1)/2);
};

await main();
