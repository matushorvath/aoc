import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [wfData, partData] = input.trimEnd().split(/\r?\n\r?\n/);

const wfs = Object.fromEntries(wfData.split(/\r?\n/).map(l => {
    const [, name, ruleData] = l.match(/(.+)\{(.+)\}/);
    const rules = ruleData.split(',').map(r => {
        const m = r.match(/([xmas])([<>])(\d+):(\S+)|(\S+)/);
        return m[5] ? {
            tgt: m[5]
        } : {
            cat: m[1],
            cmp: m[2],
            val: Number(m[3]),
            tgt: m[4]
        };
    });

    return [name, rules];
}));

//console.log(JSON.stringify(wfs, undefined, 2));

const parts = partData.split(/\r?\n/).map(p => p.match(/\{(.*)\}/)[1]
    .split(',').map(c => {
        const m = c.match(/([xmas])=(\d+)/);
        return { [m[1]]: Number(m[2]) };
    }).reduce((p, c) => ({ ...p, ...c }), {})
);

//console.log(parts);

const runrule = (rule, part) => {
    if (!rule.cat) {
        return rule.tgt;
    }

    const pval = part[rule.cat];
    if (rule.cmp === '>') {
        if (pval > rule.val) return rule.tgt;
    } else if (rule.cmp === '<') {
        if (pval < rule.val) return rule.tgt;
    }
};

const runwf = (wfn, part) => {
    const wf = wfs[wfn];

    for (const rule of wf) {
        const tgt = runrule(rule, part);
        if (tgt) return tgt;
    }
};

const check = (part) => {
    let wfn = 'in';

    while (true) {
        const nwfn = runwf(wfn, part);
        if (nwfn === 'A') return true;
        if (nwfn === 'R') return false;
        wfn = nwfn;
    }
};

let sum = 0;

for (const part of parts) {
    if (check(part)) {
        sum += part.x + part.m + part.a + part.s;
    }
}

console.log('result', sum);
