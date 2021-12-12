import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const con = {};
    for (const line of data) {
        const m = line.match(/([a-zA-Z]+)-([a-zA-Z]+)/);
        if (!con[m[1]]) con[m[1]] = [];
        con[m[1]].push(m[2]);
        if (!con[m[2]]) con[m[2]] = [];
        con[m[2]].push(m[1]);
    }

    const st = [{ p: ['start'], v: { 'start': true } }];
    const r = [];
    while (st.length > 0) {
        const x = st.pop();
        //console.log(st);
        for (const tgt of con[x.p[x.p.length - 1]]) {
            if (tgt === 'end') {
                r.push([...x.p, tgt]);
            } else if ((tgt[0] >= 'A' && tgt[0] <= 'Z') || !x.v[tgt]) {
                st.push({ p: [...x.p, tgt], v: { ...x.v, [tgt]: true } });
            }
        }
    }

    console.log(r.length);
};

await main();
