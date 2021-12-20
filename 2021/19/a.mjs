'use strict';

import fs from 'fs/promises';

// ᑌ
const ᑎ = (a, b) => new Set([...a].filter(x => b.has(x)));

const main = async () => {
    const input = await fs.readFile('input.ex', 'utf8');
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
        scanner.rel = [];
        for (const beacon1 of scanner.beacons) {
            scanner.rel[beacon1.bidx] = [];
            for (const beacon2 of scanner.beacons) {
                scanner.rel[beacon1.bidx][beacon2.bidx] = dist(beacon1, beacon2);
            }
        }
    }

    for (const scanner1 of scanners) {
        const s1rel = [];
        for (const beacon of scanner1.beacons) {
            for (const rdist of scanner1.rel[beacon.bidx]) {
                s1rel.push(rdist);
            }
        }
        const s1set = new Set(s1rel.filter(n => n !== undefined));

        for (const scanner2 of scanners) {
            if (scanner1.sidx != scanner2.sidx) {
                const s2rel = [];
                for (const beacon of scanner2.beacons) {
                    for (const rdist of scanner2.rel[beacon.bidx]) {
                        s2rel.push(rdist);
                    }
                }
                const s2set = new Set(s2rel.filter(n => n !== undefined));

                console.log(scanner1.sidx, scanner2.sidx, ᑎ(s1set, s2set).size);
            }
        }
    }


    // for (const scanner1 of scanners) {
    //     for (const scanner2 of scanners) {
    //         //const matching = [];
    //         for (const beacon1 of scanner1.beacons) {
    //             for (const beacon2 of scanner2.beacons) {
    //                 if (matching.every(b => b[0] !== beacon1.ridx && b[1] !== beacon1.ridx) &&
    //                     matching.every(b => b[0] !== beacon2.ridx && b[1] !== beacon2.ridx) &&
    //                     couldBe(beacon1.bidx, beacon2.bidx, rel)) {
    //                         console.log('match', beacon1.bidx, beacon2.bidx);
    //                         matching.push([beacon1.bidx, beacon2.bidx]);
    //                 }
    //             }
    //         }

    //         if (matching.length >= 12) {
    //             console.log('merge', scanner1.sidx, scanner2.sidx);
    //         }
    //     }
    // }
};

// const couldBe = (bidx1, bidx2, rel) => {
// };

await main();

// 335 too low
// 593 too high
