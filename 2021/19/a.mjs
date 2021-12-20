'use strict';

import fs from 'fs/promises';

// ᑌ
const ᑎ = (a, b) => new Set([...a].filter(x => b.has(x)));

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const scanners = [];
    const beacons = [];

    let row = 0;
    let bidx = 0;

    while (true) {
        if (data[row] === undefined) break;
        const m = data[row++].match(/--- scanner ([0-9]+) ---/);
        if (!m) break;

        const sidx = Number(m[1]);
        const scanner = { sidx, beacons: [] };

        while (true) {
            if (data[row] === undefined) break;
            const m = data[row++].match(/([-0-9]+),([-0-9]+),([-0-9]+)/);
            if (!m) break;

            scanner.beacons.push({
                bidx,
                x: Number(m[1]),
                y: Number(m[2]),
                z: Number(m[3])
            });

            beacons.push({
                bidx,
                sidx,
                x: Number(m[1]),
                y: Number(m[2]),
                z: Number(m[3])
            });

            bidx++;
        }

        scanners.push(scanner);
    }

    const rel = [];

    const dist = (b1, b2) => (b1.x - b2.x)**2 + (b1.y - b2.y)**2 + (b1.z - b2.z)**2;

    for (const scanner of scanners) {
        for (const beacon1 of scanner.beacons) {
            rel[beacon1.bidx] = [];
            for (const beacon2 of scanner.beacons) {
                rel[beacon1.bidx][beacon2.bidx] = dist(beacon1, beacon2);
            }
        }
    }

    let matched = 0;

    for (const beacon1 of beacons) {
        const b1rel = rel[beacon1.bidx];
        const b1set = new Set(b1rel.filter(n => n !== undefined));
        for (const beacon2 of beacons) {
            if (beacon1.sidx !== beacon2.sidx && beacon1.bidx !== beacon2.bidx) {
                const b2rel = rel[beacon2.bidx];
                const b2set = new Set(b2rel.filter(n => n !== undefined));

                let conflict = false;
                for (let i = 0; i < beacons.length; i++) {
                    if (b1rel[i] !== undefined && b2rel[i] !== undefined && b1rel[i] !== b2rel[i]) {
                        console.log('out', b1rel[i], b2rel[i]);
                        conflict = true;
                        break;
                    }
                }

                if (!conflict && ᑎ(b1set, b2set).size >= 12) {
                    console.log('got one', beacon1.sidx, beacon1.bidx, beacon2.sidx, beacon2.bidx);
                    matched++;
                }
            }
        }
    }

    console.log(matched, beacons.length - matched/2);

    // console.log(rel);
};

await main();

// 335 too low
// 593 too high
