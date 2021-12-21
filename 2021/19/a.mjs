'use strict';

import fs from 'fs/promises';

// ᑌ
// const ᑎ = (a, b) => new Set([...a].filter(x => b.has(x)));

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

    const dist = (b1, b2) => (b1.x - b2.x)**2 + (b1.y - b2.y)**2 + (b1.z - b2.z)**2;

    for (const scanner of scanners) {
        scanner.rel = [];
        for (const beacon1 of scanner.beacons) {
            scanner.rel[beacon1.bidx] = [];
            for (const beacon2 of scanner.beacons) {
                if (beacon1.bidx !== beacon2.bidx) {
                    scanner.rel[beacon1.bidx][beacon2.bidx] = dist(beacon1, beacon2);
                }
            }
        }
    }

    for (const scanner1 of scanners) {
        const s1rel = [];
        for (const beacon of scanner1.beacons) {
            for (const b2idx in scanner1.rel[beacon.bidx]) {
                s1rel.push({ b1: beacon.bidx, b2: Number(b2idx), dist: scanner1.rel[beacon.bidx][b2idx] });
            }
        }
        const s1map = new Map(s1rel.filter(n => n !== undefined).map(x => [x.dist, x]));

        for (const scanner2 of scanners) {
            if (scanner1.sidx != scanner2.sidx) {
                const s2rel = [];
                for (const beacon of scanner2.beacons) {
                    for (const b2idx in scanner2.rel[beacon.bidx]) {
                        s2rel.push({ b1: beacon.bidx, b2: Number(b2idx), dist: scanner2.rel[beacon.bidx][b2idx] });
                    }
                }
                const s2map = new Map(s2rel.filter(n => n !== undefined).map(x => [x.dist, x]));

                const is1 = new Set([...s1rel].filter(x => s2map.has(x.dist)));
                const is2 = new Set([...s2rel].filter(x => s1map.has(x.dist)));

                // console.log(s1map);
                // console.log(s2map);

                console.log('size', is1.size, is2.size);
                //console.log('bcns', [...is1].map(({ b1, b2 }) => [b1, b2]), [...is2].map(({ b1, b2 }) => [b1, b2]));

                if (is1.size >= 132) {
                    console.log('merge', scanner1.sidx, scanner2.sidx);
                    // console.log(is1);
                    // console.log(is2);
                    // merge
                }
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
