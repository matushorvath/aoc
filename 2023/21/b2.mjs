import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8'); const steps = 5000;
//const input = await fs.readFile('input', 'utf8'); const steps = 26501365;

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let start;
let dotCount = 0;
let oddDotCount = 0;
let evenDotCount = 0;

const rmx = data.length;
const cmx = data[0].length

for (let r = 0; r < rmx; r++) {
    for (let c = 0; c < cmx; c++) {
        if (data[r][c] === 'S') {
            start = [r, c];
            data[r][c] = '.';
        }
        if (data[r][c] === '.') {
            dotCount++;
            if ((r + c) % 2 === 0) {
                evenDotCount++;
            } else {
                oddDotCount++;
            }
        }
    }
}
//console.log(start);

const rdim = 2 * Math.ceil(steps / rmx) + 1;
const cdim = 2 * Math.ceil(steps / cmx) + 1;

const flds = new Array(rdim).fill().map(() => new Array(cdim).fill());

const setOn = (ro, co, ri, ci) => {
    if (flds[ro][co] === undefined) {
        // Nothing on, allocate the field and map
        flds[ro][co] = {
            count: 0,
            map: new Array(rmx).fill().map(
                () => new Array(cmx).fill('.'))
        }
    } else if (flds[ro][co].count === dotCount) {
        // All on, nothing to do
        return;
    }

    const fld = flds[ro][co];
    if (fld.map[ri][ci] === 'O') {
        // This is already on, nothing to do
        return;
    }

    // Set on
    fld.map[ri][ci] = 'O';
    fld.count++;

    // If everything is on now, drop the map
    if (fld.count === dotCount) {
        delete fld.map;
    }
};

const setOff = (ro, co, ri, ci) => {
    if (flds[ro][co] === undefined || flds[ro][co].count === 0) {
        // Nothing on, nothing to do
        return;
    } else if (flds[ro][co].count === dotCount) {
        // All on, allocate the map
        flds[ro][co].map = new Array(rmx).fill().map(
            () => new Array(cmx).fill('O'));
    }

    const fld = flds[ro][co];
    if (fld.map[ri][ci] === '.') {
        // This is already off, nothing to do
        return;
    }

    // Set off
    fld.map[ri][ci] = '.';
    fld.count--;

    // If everything is off now, we could drop the map and field
    // But they will probably be recreated in the next step
    // if (fld.count === 0) {
    //     delete flds[ro][co];
    // }
};

const get = (ro, co, ri, ci) => {
    if (flds[ro][co] === undefined || flds[ro][co].count === 0) {
        // Everything off
        return '.';
    } else if (flds[ro][co].count === dotCount) {
        // Everything on
        return 'O';
    }

    return flds[ro][co].map[ri][ci];
};

const startOffset = [
    Math.floor(rdim / 2),
    Math.floor(cdim / 2)
];

setOn(...startOffset, ...start);

const calcnbr = (o, i, d, mx) => {
    if (i + d < 0) {
        return [o - 1, mx];
    } else if (i + d > mx) {
        return [o + 1, 0]
    } else {
        return [o, i + d];
    }
};

// Different param order
const inspectOne = (ro, ri, co, ci, res) => {
    if (data[ri][ci] !== '#') {
        const val = get(ro, co, ri, ci);
        if (val === '.') {
            res.offs.push([ro, co, ri, ci]);
        } else if (val === 'O') {
            res.ons++;
        }
    }
};

const inspect = (ro, co, ri, ci) => {
    let res = { ons: 0, offs: [] };

    inspectOne(...calcnbr(ro, ri, -1, rmx - 1), co, ci, res);
    inspectOne(...calcnbr(ro, ri,  1, rmx - 1), co, ci, res);
    inspectOne(ro, ri, ...calcnbr(co, ci, -1, cmx - 1), res);
    inspectOne(ro, ri, ...calcnbr(co, ci,  1, cmx - 1), res);

    return res;
}

const mkkey = (ro, co, ri, ci) => ((ro * cdim + co) * rmx + ri) * cmx + ci;

const addop = (ops, ro, co, ri, ci, val) => {
    const key = mkkey(ro, co, ri, ci);
    if (!ops[key]) {
        ops[key] = [ro, co, ri, ci, val];
    } // else we could sanity check if val is the same
};

const countOn = (step) => {
    let cnt = 0;

    // Step 0 is even parity, start[0] + start[1] is even (1)
    // We count before the step is executed, so step 0 (and even steps in general) count even parity
    const baseParity = (step % 2 === 0) ? 0 : 1;

    for (let ro = 0; ro < flds.length; ro++) {
        for (let co = 0; co < flds[ro].length; co++) {
            const fld = flds[ro][co];

            // Since rmx/cmx are odd (2), every other field flips parity
            // Start field has even ro + co (3), so even fields do not flip parity
            const fieldParity = ((ro + co) % 2 === 0) ? 0 : 1;

            const parity = (baseParity + fieldParity) % 2;

            if (fld === undefined || fld.count === 0) {
                // Empty field, nothing to count
                continue;
            } else if (fld.count === dotCount) {
                // Full field, count based on parity
                // Even parity is same as start position (1)
                cnt += (parity === 0) ? evenDotCount : oddDotCount;
            } else {
                // Mixed field, inspect details
                for (let ri = 0; ri < rmx; ri++) {
                    for (let ci = 0; ci < cmx; ci++) {
                        if ((ri + ci) % 2 === parity && data[ri][ci] !== '#' && fld.map[ri][ci] === 'O') {
                            cnt++;
                        }
                    }
                }
            }
        }
    }

    return cnt;
};

const mod = 100;

for (let step = 0; step < steps; step++) {
    const ops = {};

    if (step % mod === 0) {
        console.log('step', step, 'on count', countOn(step));
    }

    // Prepare ops
    for (let ro = 0; ro < flds.length; ro++) {
        for (let co = 0; co < flds[ro].length; co++) {
            const fld = flds[ro][co];

            if (fld === undefined || fld.count === 0) {
                // Empty field, nothing to expand
                continue;
            } else if (fld.count === dotCount) {
                // Full field, expand borders to neighbors
                // Don't check data for '#', because borders never have a '#' in input
                for (let ri = 0; ri < rmx; ri++) {
                    if (get(ro, co - 1, ri, cmx - 1) === '.') {
                        addop(ops, ops, ro, co - 1, ri, cmx - 1, '#');
                    }
                    if (get(ro, co + 1, ri, 0) === '.') {
                        addop(ops, ro, co + 1, ri, 0, '#');
                    }
                }

                for (let ci = 0; ci < cmx; ci++) {
                    if (get(ro - 1, co, rmx - 1, ci) === '.') {
                        addop(ops, ro - 1, co, rmx - 1, ci, '#');
                    }
                    if (get(ro + 1, co, 0, ci) === '.') {
                        addop(ops, ro + 1, co, 0, ci, '#');
                    }
                }
            } else {
                // Mixed field, inspect details
                for (let ri = 0; ri < rmx; ri++) {
                    for (let ci = 0; ci < cmx; ci++) {
                        if (data[ri][ci] !== '#' && fld.map[ri][ci] === 'O') {
                            const { ons, offs } = inspect(ro, co, ri, ci);

                            // // This is 'on', if there are no other 'on' nbrs, turn it off
                            // if (ons === 0) {
                            //     addop(ops, ro, co, ri, ci, '.');
                            // }

                            // Neighbors that are 'off' will be turned on
                            // TODO optimize, only turn them on once (this will kill performance)
                            // TODO maybe store ops in a map indexed with mkkey(r, c)
                            for (const off of offs) { // yep
                                addop(ops, ...off, '#');
                            }
                        }
                    }
                }
            }
        }
    }

    if (step % mod === 0) {
        console.log('    ', step, 'exec', Object.keys(ops).length);
    }

    // Execute ops
    for (const [ro, co, ri, ci, val] of Object.values(ops)) {
        if (val === '.') {
            setOff(ro, co, ri, ci);
        } else if (val === '#') {
            setOn(ro, co, ri, ci);
        }
    }
}

//console.log(flds[startOffset[0]][startOffset[1]]);

console.log('result', countOn(steps));

// this works for the example, with 1000 steps (668697); is able to get to 2000 steps in reasonable time

// TODO iterate over empty locations, determine if they should be filled - see b.mjs, but that has a but
// TODO use a copy of the field instead of ops map? for speed
// TODO use a tree-based fields structure, both for mem size and performance
