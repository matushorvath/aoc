import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8'); const steps = 5000;
//const input = await fs.readFile('input', 'utf8'); const steps = 64;
//const input = await fs.readFile('input', 'utf8'); const steps = 26501365;

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);
//console.log(data.length, data[0].length);

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

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

const rdim = 2 ** Math.ceil(Math.log2(2 * Math.ceil(steps / rmx) + 1));
const cdim = 2 ** Math.ceil(Math.log2(2 * Math.ceil(steps / cmx) + 1));

const dim = Math.max(rdim, cdim);
const maxbits = dim.toString(2).length;

const root = { emptyCount: dotCount };

const setOn = (ro, co, ri, ci) => {
    const rbits = ro.toString(2).padStart(maxbits, '0');
    const cbits = co.toString(2).padStart(maxbits, '0');

    const path = [];

    let curr = root;
    for (let bi = 0; bi < rbits.length; bi++) {
        if (curr.emptyCount === 0) {
            return;
        }

        const qi = (rbits[bi] === '0' ? 0 : 1) * 2 + (cbits[bi] === '0' ? 0 : 1);

        if (curr.quarters === undefined) {
            curr.quarters = [];
            delete curr.emptyCount;
        }
        if (curr.quarters[qi] === undefined) {
            curr.quarters[qi] = { emptyCount: 0 };
        }

        path.push(curr);
        curr = curr.quarters[qi];
    }

    curr.data = new Array(data.length).fill().map(() => new Array(data[0].length).fill('.'));
    curr.data[ri][ci] = 'O';
    curr.emptyCount--;

    while (curr.emptyCount === 0) {
        curr = path.pop();
        if (curr.quarters.every(q => q.emptyCount === 0)) {
            curr.emptyCount = 0;
            delete curr.quarters;
        }
    }
};

const startOffset = [
    Math.floor(dim / 2),
    Math.floor(dim / 2)
];

setOn(...startOffset, ...start);

const mkkey = (ro, co, ri, ci) => ((ro * dim + co) * rmx + ri) * cmx + ci;

const addop = (ops, ro, co, ri, ci) => {
    const key = mkkey(ro, co, ri, ci);
    if (!ops[key]) {
        ops[key] = [ro, co, ri, ci];
    }
};

// Assume
// 1. start position is on odd coordinates,
// 2. data dimensions are odd
// 3. start offset is odd
// This means we count the not-start fields (r + c === odd)
if (start[0] % 2 !== 1 || start[1] % 2 !== 1 || rmx % 2 !== 1 || cmx % 2 !== 1
    || startOffset[0] % 2 !== 1 || startOffset[1] % 2 !== 1) {

    console.log('wrong assumptions about input');
    console.log(start);
    console.log(rmx, cmx);
    console.log(startOffset);
    process.exit(1);
}

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

const stats = () => {
    let empty = 0;
    let full = 0;
    let mixed = 0;

    for (let ro = 0; ro < flds.length; ro++) {
        for (let co = 0; co < flds[ro].length; co++) {
            const fld = flds[ro][co];

            if (fld === undefined || fld.count === 0) {
                empty++;
            } else if (fld.count === dotCount) {
                full++;
            } else {
                mixed++;
            }
        }
    }

    return `empty ${empty} full ${full} mixed ${mixed}`;
};

const mod = 1;

for (let step = 0; step < steps; step++) {
    const ops = {};

    if (step % mod === 0) {
        console.log('step', step, 'on count', countOn(step));
        console.log('    ', step, 'stats', stats());
    }

    // Prepare ops for rows
    for (let ro = 0; ro < flds.length; ro++) {
        for (let ri = 0; ri < rmx; ri++) {
            let lastVal = '.';
            let lastCo;
            let lastCi;

            for (let co = 0; co < flds[ro].length; co++) {
                const fld = flds[ro][co];

                if (fld === undefined || fld.count === 0) {
                    // Empty field, check left border
                    if (lastVal === 'O') {
                        addop(ops, ro, co, ri, 0, 'O');
                    }
                    lastVal = '.'; lastCo = co; lastCi = cmx - 1;
                } else if (fld.count === dotCount) {
                    // Full field, check right border of prev field
                    if (lastVal === '.') {
                        addop(ops, ro, lastCo, ri, lastCi, 'O');
                    }
                    lastVal = 'O'; lastCo = co; lastCi = cmx - 1;
                } else {
                    // Mixed field, check each column
                    for (let ci = 0; ci < cmx; ci++) {
                        const thisVal = data[ri][ci] === '#' ? '#' : fld.map[ri][ci];
                        if (lastVal === 'O' && thisVal === '.') {
                            addop(ops, ro, co, ri, ci, 'O');
                        } else if (lastVal === '.' && thisVal === 'O') {
                            addop(ops, ro, lastCo, ri, lastCi, 'O');
                        }
                        lastVal = thisVal; lastCo = co; lastCi = ci;
                    }
                }
            }
        }
    }

    // if (step % mod === 0) {
    //     console.log('    ', step, 'rows');
    // }

    // Prepare ops for cols
    for (let co = 0; co < flds[0].length; co++) {
        for (let ci = 0; ci < cmx; ci++) {
            let lastVal = '.';
            let lastRo;
            let lastRi;

            for (let ro = 0; ro < flds.length; ro++) {
                const fld = flds[ro][co];

                if (fld === undefined || fld.count === 0) {
                    // Empty field, check left border
                    if (lastVal === 'O') {
                        addop(ops, ro, co, 0, ci);
                    }
                    lastVal = '.'; lastRo = ro; lastRi = rmx - 1;
                } else if (fld.count === dotCount) {
                    // Full field, check right border of prev field
                    if (lastVal === '.') {
                        addop(ops, lastRo, co, lastRi, ci);
                    }
                    lastVal = 'O'; lastRo = ro; lastRi = rmx - 1;
                } else {
                    // Mixed field, check each column
                    for (let ri = 0; ri < rmx; ri++) {
                        const thisVal = data[ri][ci] === '#' ? '#' : fld.map[ri][ci];
                        if (lastVal === 'O' && thisVal === '.') {
                            addop(ops, ro, co, ri, ci);
                        } else if (lastVal === '.' && thisVal === 'O') {
                            addop(ops, lastRo, co, lastRi, ci);
                        }
                        lastVal = thisVal; lastRo = ro; lastRi = ri;
                    }
                }
            }
        }
    }

    // if (step % mod === 0) {
    //     console.log('    ', step, 'cols');
    // }

    // Execute ops
    for (const [ro, co, ri, ci] of Object.values(ops)) {
        setOn(ro, co, ri, ci);
    }

    if (step % mod === 0) {
        console.log('    ', step, 'exec', Object.keys(ops).length);
    }
}

//console.log(flds[startOffset[0]][startOffset[1]]);

console.log('result', countOn(steps));

// this works for the example, with 500 steps (167004)

// TODO maybe iterate over empty locations, determine if they should be filled
// TODO we are only interested in empty locations on the border with filled locations
// TODO we can probably move along the borders (with holes!)
// TODO or iterate over rows and cols, do something when we move from empty to filled and back <<<<<

// TODO plus iterate over locations with no neighbors to delete them
// TODO maybe remember deletion candidates when moving over rows, confirm them when moving over cols
// TODO or just immediately handle candidates when discovered

// TODO use a copy of the field instead of ops map

// TODO precalc number of neighbors on each location in data, use that somehow? or even nbr locations?

// TODO but for 26501365 steps we need something much better anyway

// TODO remember not just 'on' and 'off', remember which locations are internal (> 0 nbrs)
// TODO and ignore them, they will remain internal

// TODO the internal 1-pixel holes are on every other step, we can handle them as "odd" and "even"
// TODO and pixels that are both "odd" and "even" are always on
// TODO also calculate number of "odd" and "even" pixels and drop the map
