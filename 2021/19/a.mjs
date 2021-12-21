'use strict';

import fs from 'fs/promises';

// ᑌ
// const ᑎ = (a, b) => new Set([...a].filter(x => b.has(x)));

const main = async () => {
    const input = await fs.readFile('input.ex', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const scanners = [];
    // const beacons = [];

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

            // beacons.push({
            //     bidx,
            //     sidx,
            //     x: Number(m[1]),
            //     y: Number(m[2]),
            //     z: Number(m[3])
            // });

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
        const s1map = new Map(s1rel.map(x => [x.dist, x]));
        if (s1rel.length !== s1map.size * 2) {
            console.error('DUPLICATE DISTANCE!!! 1', s1rel.length, s1map.size);
        }

        for (const scanner2 of scanners) {
            if (scanner1.sidx != scanner2.sidx) {
                const s2rel = [];
                for (const beacon of scanner2.beacons) {
                    for (const b2idx in scanner2.rel[beacon.bidx]) {
                        s2rel.push({ b1: beacon.bidx, b2: Number(b2idx), dist: scanner2.rel[beacon.bidx][b2idx] });
                    }
                }
                const s2map = new Map(s2rel.map(x => [x.dist, x]));
                if (s2rel.length !== s2map.size * 2) {
                    console.error('DUPLICATE DISTANCE!!! 2', s2rel.length, s2map.size);
                }

                const is = [...s1rel].map(x => x.dist).filter(d => s2map.has(d));

                // console.log(s1map);
                // console.log(s2map);

                // console.log('size', is.length);
                //console.log('bcns', [...is].map(({ b1, b2 }) => [b1, b2]), [...is2].map(({ b1, b2 }) => [b1, b2]));
                //console.log('k', [...is.keys()]);

                if (is.length >= 132) {
                    console.log('merge', is.length, scanner1.sidx, scanner2.sidx);

                    const s12map = new Map();
                    for (const dist of is) {
                        const c1 = s1map.get(dist);
                        const c2 = s2map.get(dist);

                        for (const c1b of [c1.b1, c1.b2]) {
                            if (!s12map.has(c1b)) {
                                s12map.set(c1b, [c2.b1, c2.b2]);
                            } else if (s12map.get(c1b).length === 2) {
                                if ((s12map.get(c1b)[0] === c2.b1 || s12map.get(c1b)[1] === c2.b1) &&
                                    (s12map.get(c1b)[0] !== c2.b2 && s12map.get(c1b)[1] !== c2.b2)) {
                                    s12map.set(c1b, [c2.b1]);
                                } else if ((s12map.get(c1b)[0] === c2.b2 || s12map.get(c1b)[1] === c2.b2) &&
                                    (s12map.get(c1b)[0] !== c2.b1 && s12map.get(c1b)[1] !== c2.b1)) {
                                    s12map.set(c1b, [c2.b2]);
                                // } else {
                                //     console.error('CONFLICT A');
                                }
                            } else if (s12map.get(c1b).length === 1) {
                                if (s12map.get(c1b)[0] !== c2.b1 && s12map.get(c1b)[0] !== c2.b2) {
                                    console.error('CONFLICT B');
                                }
                            }
                        }
                    }

                    // console.log(s12map);

                    const v1aidx = [...s12map.keys()][0];
                    const v1bidx = [...s12map.keys()][1];

                    const v2aidx = s12map.get(v1aidx)[0];
                    const v2bidx = s12map.get(v1bidx)[0];

                    const v1a = scanner1.beacons.find(b => b.bidx === v1aidx);
                    const v1b = scanner1.beacons.find(b => b.bidx === v1bidx);
                    const v2a = scanner2.beacons.find(b => b.bidx === v2aidx);
                    const v2b = scanner2.beacons.find(b => b.bidx === v2bidx);

                    // console.log(v1a, v1b);
                    // console.log(v2a, v2b);

                    const v1 = { x: v1b.x - v1a.x, y: v1b.y - v1a.y, z: v1b.z - v1a.z };
                    const v2 = { x: v2b.x - v2a.x, y: v2b.y - v2a.y, z: v2b.z - v2a.z };

                    if (v1.x === v1.y || v1.y === v1.z || v1.z === v1.x) console.error('DUPLICATE NUM 1');
                    if (v2.x === v2.y || v2.y === v2.z || v2.z === v2.x) console.error('DUPLICATE NUM 2');

                    const find_tr = (val) => {
                        if (val === v2.x) return ['x', 1];
                        if (val === -v2.x) return ['x', -1];
                        if (val === v2.y) return ['y', 1];
                        if (val === -v2.y) return ['y', -1];
                        if (val === v2.z) return ['z', 1];
                        if (val === -v2.z) return ['z', -1];
                    }
                    const tr = {};
                    tr['x'] = find_tr(v1.x);
                    tr['y'] = find_tr(v1.y);
                    tr['z'] = find_tr(v1.z);

                    console.log(v1);
                    console.log(v2);
                    console.log(tr);
                }
            }
        }
    }
};

// const couldBe = (bidx1, bidx2, rel) => {
// };

await main();

// 335 too low
// 593 too high
