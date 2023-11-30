import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const fnames = ['first', 'second', 'third', 'fourth'];
const elements = {};
let elementCount = 0;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const mf = r.match(/The (\S+) floor contains (.*)\./);
    const floor = fnames.indexOf(mf[1]);

    const items = mf[2].split(/, and |, | and /).flatMap(i => {
        const mi = i.match(/a (\S+)-compatible microchip|a (\S+) generator/);
        if (mi?.[1]) {
            const elem = elements[mi[1]] ?? (elements[mi[1]] = elementCount++);
            return [{ type: 'M', elem }];
        } else if (mi?.[2]) {
            const elem = elements[mi[2]] ?? (elements[mi[2]] = elementCount++);
            return [{ type: 'G', elem }];
        } else {
            return [];
        }
    });

    return { floor, items };
});

//console.log(data);

const floors = data.toSorted((a, b) => a.floor - b.floor).map(f => new Set(f.items.map(i => `${i.type}${i.elem ?? ''}`)));
//console.log(items);

const queue = [{ moves: 0, elev: 0, floors }];

// actions:
// move E up/down, with 0, 1 or 2 items from the floor

// constraints:
// E does not move empty
// chip and >0 RTGs on floor: RTGs must include the one for chip
// all on fourth: end
// E has capacity 2

const withMovedItems = (floors, from, to, ...items) => {
    const res = [...floors];

    res[from] = new Set(floors[from]);
    res[to] = new Set(floors[to]);

    for (const item of items) {
        res[from].delete(item);
        res[to].add(item);
    }

    return res;
};

const canMoveOne = (item, itemsFrom, itemsTo) => {
    // TODO optimize the item.substring() and items*.values()

    const cantLeave = item[0] === 'G' && itemsFrom.has(`M${item.substring(1)}`) &&
        [...itemsFrom.values()].filter(i => i[0] === 'G').length > 1;
    if (cantLeave) {
        return false;
    }

    // Generator can't arrive if at least one microchip in TO is not paired with a generator,
    // and is not paired with our generator
    const cantArriveG = item[0] === 'G' && [...itemsTo.values()].some(i =>
        i[0] === 'M' && i.substring(1) !== item.substring(1) && !itemsTo.has(`G${i.substring(1)}`));
    if (cantArriveG) {
        return false;
    }

    const cantArriveM = item[0] === 'M' && !itemsTo.has(`G${item.substring(1)}`) &&
        [...itemsTo.values()].some(i => i[0] === 'G');
    if (cantArriveM) {
        return false;
    }

    return true;
};

const canMoveTwo = (item1, item2, itemsFrom, itemsTo) => {
    return item1.substring(1) === item2.substring(1) ||
        (canMoveOne(item1, itemsFrom, itemsTo) && canMoveOne(item2, itemsFrom, itemsTo));
};

const mem = {};
const makeKey = s => `${s.elev}-${s.floors.map(f => [...f.values()].toSorted().join('.')).join('|')}`;

let tmp = 0;
let minMoves = Infinity;

while (queue.length) {
    const s = queue.pop();

    const key = makeKey(s);
    if (s.moves >= minMoves || (mem[key] !== undefined && mem[key] <= s.moves)) {
        continue;
    }
    mem[key] = s.moves;

    if (s.floors[3].size === 2 * elementCount) {
        //console.log('>>>', s, key, mem[key]);
        minMoves = s.moves;
        continue;
    }
    if (tmp++ % 100000 === 0) console.log(s, key, mem[key], minMoves);
    //console.log(s, key);
    //if (tmp++ > 10) break;

    for (const item1 of s.floors[s.elev]) {
        // Move elevator with one item
        if (s.elev < 3 && canMoveOne(item1, s.floors[s.elev], s.floors[s.elev + 1])) {
            queue.push({ moves: s.moves + 1, elev: s.elev + 1, floors: withMovedItems(s.floors, s.elev, s.elev + 1, item1) });
        }
        if (s.elev > 0 && canMoveOne(item1, s.floors[s.elev], s.floors[s.elev - 1])) {
            queue.push({ moves: s.moves + 1, elev: s.elev - 1, floors: withMovedItems(s.floors, s.elev, s.elev - 1, item1) });
        }

        for (const item2 of s.floors[s.elev]) if (item1 !== item2) {
            // Move elevator with two items
            if (s.elev < 3 && canMoveTwo(item1, item2, s.floors[s.elev], s.floors[s.elev + 1])) {
                queue.push({ moves: s.moves + 1, elev: s.elev + 1, floors: withMovedItems(s.floors, s.elev, s.elev + 1, item1, item2) });
            }
            if (s.elev > 0 && canMoveTwo(item1, item2, s.floors[s.elev], s.floors[s.elev - 1])) {
                queue.push({ moves: s.moves + 1, elev: s.elev - 1, floors: withMovedItems(s.floors, s.elev, s.elev - 1, item1, item2) });
            }
        }
    }
}

console.log('result', mem['3-|||G0.G1.M0.M1']);
