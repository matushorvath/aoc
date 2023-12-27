import fs from 'fs/promises';

//const input = await fs.readFile('example1', 'utf8');
//const input = await fs.readFile('example2', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = Object.fromEntries(input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/([%&]?)(\S+) -> (.+)/);
    const tgts = m[3].split(', ');
    return [m[2], { typ: m[1], src: m[2], tgts }];
}));

//console.log(data);

const ff = {};
const cn = {};

for (const { src, tgts } of Object.values(data)) {
    for (const tgt of tgts) {
        if (cn[tgt] === undefined) cn[tgt] = {};
        cn[tgt][src] = false;
    }
}

let limps = 0, himps = 0;

for (let i = 0; i < 1000; i++) {
    console.log(`---------- ${i} ----------`);

    let imps = [{ f: 'button', t: 'broadcaster', v: false }];
    while (imps.length) {
        limps += imps.filter(({ v }) => v === false).length;
        himps += imps.filter(({ v }) => v === true).length;

        const nimps = [];
        for (const imp of imps) {
            console.log(`${imp.f} -${imp.v ? 'high': 'low'}-> ${imp.t}`);

            const mod = data[imp.t];
            if (mod === undefined) continue;

            if (mod.typ === '%') { // ff
                if (imp.v === false) {
                    ff[imp.t] = !ff[imp.t];
                    nimps.push(...mod.tgts.map(tgt => ({ f: imp.t, t: tgt, v: ff[imp.t] })));
                }
            } else if (mod.typ === '&') { // cn
                cn[imp.t][imp.f] = imp.v;
                const out = !Object.values(cn[imp.t]).every(v => v === true);
                nimps.push(...mod.tgts.map(tgt => ({ f: imp.t, t: tgt, v: out })));
            } else if (mod.src === 'broadcaster') {
                nimps.push(...mod.tgts.map(tgt => ({ f: imp.t, t: tgt, v: imp.v })));
            }
        }
        imps = nimps;
    }
}

console.log('result', limps, himps, limps * himps);
