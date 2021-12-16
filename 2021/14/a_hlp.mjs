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

        console.log(x, os);

        const cnt = {};
        for (const c of os) {
            if (!cnt[c]) cnt[c] = 1;
            else cnt[c] += 1;
        }

        let mx = 0;
        let mxc;
        let mn = Infinity;
        let mnc;
    
        for (const [ch, qty] of Object.entries(cnt)) {
            if (qty > mx) { mx = qty; mxc = ch; }
            if (qty < mn) { mn = qty; mnc = ch; }
        }
    
        // console.log(cnt);
        console.log(Object.fromEntries(Object.entries(cnt).sort((a, b) => a[0] < b[0] ? -1 : 1)));
        console.log(mx, mn, mxc, mnc, mx - mn);
    }

};

await main();
