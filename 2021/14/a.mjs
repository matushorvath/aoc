import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/);

    const s = d.slice(0, 1)[0];
    const r = Object.fromEntries(d.slice(2).map(l => {
        const m = l.match(/(..) -> (.)/);
        return [m[1], m[2]];
    }));

    let os = s;

    for (let x = 0; x < 10; x++) {
        let nsa = [];
        for (let i = 0; i < os.length - 1; i++) {
            nsa.push(os[i], r[os.slice(i, i+2)]);
        }
        nsa.push(os[os.length-1]);
        os = nsa.join('');

        // console.log(x, os);

        const q = {};
        for (const c of os) {
            if (!q[c]) q[c] = 1;
            else q[c] += 1;
        }

        let mx = 0;
        let mn = Infinity;
        for (const [c, cnt] of Object.entries(q)) {
            if (cnt > mx) mx = cnt;
            if (cnt < mn) mn = cnt;
        }

    console.log(mx - mn);
}

};

await main();
