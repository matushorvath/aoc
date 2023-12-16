import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const dump = () => {
    let out = [];
    for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < data[0].length; c++) {
            out.push(energized[r]?.[c] ? '#' : '.');
        }
        out.push('\n');
    }
    console.log(out.join(''));
    console.log();
};

let beams = [{ p: [0, 0], s: [0, 1] }];
const energized = [];

const nz = n => n === -0 ? 0 : n;

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
            nbeams.push({ p: [pr + ns[0], pc + ns[1]], s: ns});
        } else if ((data[pr][pc] === '/' && sc) || (data[pr][pc] === '\\' && sr)) {
            // left
            const ns = [nz(-sc), sr];
            nbeams.push({ p: [pr + ns[0], pc + ns[1]], s: ns});
        } else if (data[pr][pc] === '-' && sr) {
            nbeams.push({ p: [pr, pc - 1], s: [0, -1] });
            nbeams.push({ p: [pr, pc + 1], s: [0, 1] });
        } else if (data[pr][pc] === '|' && sc) {
            nbeams.push({ p: [pr - 1, pc], s: [-1, 0] });
            nbeams.push({ p: [pr + 1, pc], s: [1, 0] });
        } else {
            nbeams.push({ p: [pr + sr, pc + sc], s: [sr, sc] });
        }
    }

    const nbmap = Object.fromEntries(nbeams.map(b => [`${b.p[0]},${b.p[1]},${b.s[0]},${b.s[1]}`, b]));
    beams = Object.values(nbmap);

    //dump();
}

let sum = 0;
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
        if (energized[r]?.[c]?.size) sum++;
    }
}

console.log('result', sum);

// 37 WA