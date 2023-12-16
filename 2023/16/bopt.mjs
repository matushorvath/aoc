import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const nz = n => n === -0 ? 0 : n;

const addBeam = (beams, bmap, pr, pc, sr, sc) => {
    const key = ((pr * data.length + pc) * data[0].length + (sr + 1)) * 3 + (sc + 1);
    if (bmap[key]) return;

    beams.push({ p: [pr, pc], s: [sr, sc] });
    bmap[key] = 1;
};

const sim = (ipr, ipc, isr, isc) => {
    let beams = [{ p: [ipr, ipc], s: [isr, isc] }];
    const energized = [];

    const bmap = {};

    let changed = true;
    while (changed) {
        changed = false;

        let nbeams = [];

        for (const b of beams) {
            const [pr, pc] = b.p;
            const [sr, sc] = b.s;

            if (pr < 0 || pr > data.length - 1 || pc < 0 || pc > data[0].length - 1) continue;

            const key = `${sr}${sc}`;
            if (!energized[pr]?.[pc] || !energized[pr]?.[pc].has(key)) {
                if (!energized[pr]) energized[pr] = [];
                if (!energized[pr][pc]) energized[pr][pc] = new Set();
                energized[pr][pc].add(key);
                changed = true;
            }

            if ((data[pr][pc] === '/' && sr) || (data[pr][pc] === '\\' && sc)) {
                // right
                const ns = [sc, nz(-sr)];
                addBeam(nbeams, bmap, pr + ns[0], pc + ns[1], ns[0], ns[1]);
            } else if ((data[pr][pc] === '/' && sc) || (data[pr][pc] === '\\' && sr)) {
                // left
                const ns = [nz(-sc), sr];
                addBeam(nbeams, bmap, pr + ns[0], pc + ns[1], ns[0], ns[1]);
            } else if (data[pr][pc] === '-' && sr) {
                addBeam(nbeams, bmap, pr, pc - 1, 0, -1);
                addBeam(nbeams, bmap, pr, pc + 1, 0, 1);
            } else if (data[pr][pc] === '|' && sc) {
                addBeam(nbeams, bmap, pr - 1, pc, -1, 0);
                addBeam(nbeams, bmap, pr + 1, pc, 1, 0);
            } else {
                addBeam(nbeams, bmap, pr + sr, pc + sc, sr, sc);
            }
        }

        beams = nbeams;
    }

    let sum = 0;
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[0].length; c++) {
            if (energized[r]?.[c]?.size) sum++;
        }
    }

    return sum;
}

let max = 0;

for (let ir = 0; ir < data.length; ir++) {
    //console.log('r', ir, data.length, max);

    const suml = sim(ir, 0, 0, 1);
    const sumr = sim(ir, data[0].length - 1, 0, -1);

    max = Math.max(max, suml, sumr);
}

for (let ic = 0; ic < data[0].length; ic++) {
    //console.log('c', ic, data[0].length, max);

    const sumt = sim(0, ic, 1, 0);
    const sumb = sim(data.length - 1, ic, -1, 0);

    max = Math.max(max, sumt, sumb);
}

console.log('result', max);
