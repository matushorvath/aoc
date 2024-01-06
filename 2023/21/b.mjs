import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8'); const steps = 5000;
//const input = await fs.readFile('input', 'utf8'); const steps = 26501365;

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let start;
let dotcount = 0;

const rmx = data.length;
const cmx = data[0].length

for (let r = 0; r < rmx; r++) {
    for (let c = 0; c < cmx; c++) {
        if (data[r][c] === 'S') {
            start = [r, c];
            data[r][c] = '.';
        }
        if (data[r][c] === '.') {
            dotcount++;
        }
    }
}

//console.log(start);

const rdim = 2 * Math.ceil(steps / rmx + 5);
const cdim = 2 * Math.ceil(steps / cmx + 5);

const flds = new Array(rdim).fill().map(() => []);

const setOn = (ro, co, ri, ci) => {
    if (flds[ro][co] === undefined) {
        // Nothing on, allocate the field and map
        flds[ro][co] = {
            count: 0,
            map: new Array(rmx).fill().map(
                () => new Array(cmx).fill('.'))
        }
    } else if (flds[ro][co].count === dotcount) {
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
    if (fld.count === dotcount) {
        delete fld.map;
    }
};

const setOff = (ro, co, ri, ci) => {
    if (flds[ro][co] === undefined || flds[ro][co].count === 0) {
        // Nothing on, nothing to do
        return;
    } else if (flds[ro][co].count === dotcount) {
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
    } else if (flds[ro][co].count === dotcount) {
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

const countOn = () => {
    let cnt = 0;

    for (let ro = 0; ro < flds.length; ro++) {
        for (let co = 0; co < flds[ro].length; co++) {
            const fld = flds[ro][co];

            if (fld === undefined || fld.count === 0) {
                // Empty field, nothing to count
                continue;
            } else if (fld.count === dotcount) {
                // Full field, count all
                cnt += fld.count;
            } else {
                // Mixed field, inspect details
                for (let ri = 0; ri < rmx; ri++) {
                    for (let ci = 0; ci < cmx; ci++) {
                        if (data[ri][ci] !== '#' && fld.map[ri][ci] === 'O') {
                            cnt++;
                        }
                    }
                }
            }
        }
    }

    return cnt;
};

for (let step = 0; step < steps; step++) {
    const ops = {};

    if (step % 100 === 0) {
        console.log('step', step, Object.keys(ops).length);
        console.log('    ', 'on count', countOn());
    }

    // Prepare ops
    for (let ro = 0; ro < flds.length; ro++) {
        for (let co = 0; co < flds[ro].length; co++) {
            const fld = flds[ro][co];

            if (fld === undefined || fld.count === 0) {
                // Empty field, nothing to expand
                continue;
            } else if (fld.count === dotcount) {
                // Full field, expand borders to neighbors
                // Don't check data for '#', because borders never have a '#' in input
                for (let ri = 0; ri < rmx; ri++) {
                    if (get(ro, co - 1, ri, cmx) === '.') {
                        addop(ops, ops, ro, co - 1, ri, cmx, '#');
                    }
                    if (get(ro, co + 1, ri, 0) === '.') {
                        addop(ops, ro, co + 1, ri, 0, '#');
                    }
                }

                for (let ci = 0; ci < cmx; ci++) {
                    if (get(ro - 1, co, rmx, ci) === '.') {
                        addop(ops, ro - 1, co, rmx, ci, '#');
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

                            // This is 'on', if there are no other 'on' nbrs, turn it off
                            if (ons === 0) {
                                addop(ops, ro, co, ri, ci, '.');
                            }

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

console.log('result', countOn());

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
