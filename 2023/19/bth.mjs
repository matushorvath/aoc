import fs from 'fs/promises';
import wt from 'worker_threads';
import url from 'url';

if (wt.isMainThread) {

const __filename = new url.URL('', import.meta.url).pathname;

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

const borders = {
    x: [4000],
    m: [4000],
    a: [4000],
    s: [4000]
};

for (const wf of Object.values(wfs)) {
    for (const rule of wf) {
        if (rule.cmp === '<') {
            borders[rule.cat].push(rule.val - 1);
        } else if (rule.cmp === '>') {
            borders[rule.cat].push(rule.val);
        }
    }
}

for (const b of Object.values(borders)) b.sort((a, b) => a - b);

//console.log(borders);

// check <= border vs > border

const promises = [];

for (let xi = 0; xi < borders.x.length; xi++) {
    const wp = new Promise((resolve, reject) => {
        const worker = new wt.Worker(__filename, { workerData: { borders, xi, wfs } });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
    promises.push(wp);
}

const res = await Promise.allSettled(promises);

const sum = res.map(({ value }) => value).reduce((p, c) => p + c, 0);

//console.log(acc);

//console.log(acc.reduce((p, c) => p + c, 0));

console.log(sum);

} else {
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
    
    const runwf = (wfs, wfn, part) => {
        const wf = wfs[wfn];
    
        for (const rule of wf) {
            const tgt = runrule(rule, part);
            if (tgt) return tgt;
        }
    };
    
    const check = (wfs, part) => {
        let wfn = 'in';
    
        while (true) {
            const nwfn = runwf(wfs, wfn, part);
            if (nwfn === 'A') return true;
            if (nwfn === 'R') return false;
            wfn = nwfn;
        }
    };

    const { borders, xi, wfs } = wt.workerData;

    console.log(`start ${xi}/${borders.x.length}`);

    let sum = 0;

    const x = borders.x[xi];
    for (let mi = 0; mi < borders.m.length; mi++) {
        const m = borders.m[mi];
        for (let ai = 0; ai < borders.a.length; ai++) {
            const a = borders.a[ai];
            for (let si = 0; si < borders.s.length; si++) {
                const s = borders.s[si];
                if (check(wfs, { x, m, a, s})) {
                    const xp = borders.x[xi - 1] ?? 0;
                    const mp = borders.m[mi - 1] ?? 0;
                    const ap = borders.a[ai - 1] ?? 0;
                    const sp = borders.s[si - 1] ?? 0;

                    const block = (x - xp) * (m - mp) * (a - ap) * (s - sp);
                    sum += block;
                }
            }
        }
    }

    console.log(`stop ${xi}/${borders.x.length}`);

    wt.parentPort.postMessage(sum);
}
