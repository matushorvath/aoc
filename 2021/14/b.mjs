import fs from 'fs/promises';

const merge = (...cs) => {
    const out = {};
    for (const c of cs) {
        for (const [ch, cnt] of Object.entries(c)) {
            if (out[ch] === undefined) out[ch] = cnt;
            else out[ch] += cnt;
        }
    }
    return out;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/);

    const s = d.slice(0, 1)[0];
    const r = d.slice(2).map(l => {
        const m = l.match(/(.)(.) -> (.)/);
        return [m[1], m[2], m[3]];
    });

    const c = {}
    // for (const rule of r) {
    //     c[`${rule[0]}${rule[1]}0`] = { [rule[2]]: 1 };
    // }

    for (let x = 0; x < 40; x++) {
        for (const rule of r) {
            c[`${rule[0]}${rule[1]}${x}`] = merge(
                c[`${rule[0]}${rule[2]}${x-1}`] ?? {},
                c[`${rule[2]}${rule[1]}${x-1}`] ?? {},
                { [rule[2]]: 1 });
        }
    }

    let cnt = {};
    for (let i = 0; i < s.length - 1; i++) {
        // console.log(`${s[i]}${s[i+1]}`, c[`${s[i]}${s[i+1]}0`]);
        cnt = merge(cnt, c[`${s[i]}${s[i+1]}39`] ?? {}, { [s[i]]: 1 });
    }
    cnt = merge(cnt, { [s[s.length-1]]: 1 });

    let mx = 0;
    let mxc;
    let mn = Infinity;
    let mnc;

    for (const [ch, qty] of Object.entries(cnt)) {
        if (qty > mx) { mx = qty; mxc = ch; }
        if (qty < mn) { mn = qty; mnc = ch; }
    }

    console.log(Object.fromEntries(Object.entries(cnt).sort((a, b) => a[0] < b[0] ? -1 : 1)));
    console.log(mx, mn, mxc, mnc, mx - mn);
};

await main();


//2276644000109