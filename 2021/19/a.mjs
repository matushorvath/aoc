'use strict';

import fs from 'fs/promises';
import { connect } from 'http2';
import stringify from "json-stringify-pretty-compact";

const main = async () => {
    //const input = await fs.readFile('simple', 'utf8'); const COMMON = 3;
    const input = await fs.readFile('example', 'utf8'); const COMMON = 12;
    //const input = await fs.readFile('input', 'utf8'); const COMMON = 12;
    const data = input.trimEnd().split(/\r?\n\r?\n/)
        .map((s, sid) => ({
            sid,
            beacons: s.split(/\r?\n/).slice(1).map((b, bid) => {
                const m = b.match(/([^,]+),([^,]+),([^,]+)/);
                return {
                    bid,
                    loc: [Number(m[1]), Number(m[2]), Number(m[3])]
                };
            })
        }));

    //console.log(stringify(data, { maxLength: 240 }));

    // Calc relative coordinates between beacons within one scanner
    for (const scanner of data) {
        scanner.rel = [];
        for (const bcn1 of scanner.beacons) {
            scanner.rel[bcn1.bid] = [];
            for (const bcn2 of scanner.beacons) {
                scanner.rel[bcn1.bid][bcn2.bid] = [bcn2.loc[0] - bcn1.loc[0], bcn2.loc[1] - bcn1.loc[1], bcn2.loc[2] - bcn1.loc[2]]
            }
        }
    }

    //console.log(stringify(data.map(s => s.rel), { maxLength: 240 }));

    // Calc relative coordinates between beacons under each of the 24 possible scanner orientations; sort them in a repeatable way
    const compareRelCoords = (a, b) => {
        if (a.rel[0] !== b.rel[0]) {
            return a.rel[0] - b.rel[0];
        } else if (a.rel[1] !== b.rel[1]) {
            return a.rel[1] - b.rel[1];
        } else {
            return a.rel[2] - b.rel[2];
        }
    };

    const mkrkey = (mul0, mul1, mul2, rot) => `${mul0} ${mul1} ${mul2} ${rot}`;

    for (const scanner of data) {
        scanner.rotated = {};
        for (const mul0 of [-1, 1]) {
            for (const mul1 of [-1, 1]) {
                for (const mul2 of [-1, 1]) {
                    for (const rot of [[0, 1, 2], [1, 2, 0], [2, 0, 1]]) {
                        const rkey = mkrkey(mul0, mul1, mul2, rot);
                        scanner.rotated[rkey] = [];

                        for (let bid1 = 0; bid1 < scanner.beacons.length; bid1++) {
                            for (let bid2 = 0; bid2 < scanner.beacons.length; bid2++) {
                                if (bid1 !== bid2) {
                                    const tmp = [
                                        scanner.rel[bid1][bid2][0] * mul0 || 0,
                                        scanner.rel[bid1][bid2][1] * mul1 || 0,
                                        scanner.rel[bid1][bid2][2] * mul2 || 0
                                    ];
                                    const rel = [tmp[rot[0]], tmp[rot[1]], tmp[rot[2]]];

                                    scanner.rotated[rkey].push({ bid1, bid2, rel });
                                }
                            }
                        }

                        scanner.rotated[rkey] = scanner.rotated[rkey].sort(compareRelCoords);
                    }
                }
            }
        }
    }

    // Match beacon distances between two scanners, using first orientation of scanner 1 and each orientation of scanner 2
    const intersectSortedDistances = (distances1, distances2) => {
        const [common, extra1, extra2] = [[], [], []];
        let [i1, i2] = [0, 0];

        while (i1 < distances1.length && i2 < distances2.length) {
            const cmp = compareRelCoords(distances1[i1], distances2[i2]);
            if (cmp < 0) {
                extra1.push(distances1[i1]);
                i1++;
            } else if (cmp > 0) {
                extra2.push(distances2[i2]);
                i2++;
            } else {
                common.push({ bid3: distances2[i2].bid1, bid4: distances2[i2].bid2, ...distances1[i1] });
                i1++; i2++;
            }
        }

        while (i1 < distances1.length) {
            extra1.push(distances1[i1]);
            i1++;
        }

        while (i2 < distances2.length) {
            extra2.push(distances2[i2]);
            i2++;
        }

        return [common, extra1, extra2];
    };

    const mkrkey_native = (s) => mkrkey(s.orientation.mul0, s.orientation.mul1, s.orientation.mul2, s.orientation.rot);

    const CONNS = COMMON * (COMMON - 1) / 2;

    data[0].orientation = { mul0: 1, mul1: 1, mul2: 1, rot: [0, 1, 2] };
    data[0].position = [0, 0, 0]; // all positions are rel to this beacon
    const squeue = [data[0]];
    const beacons = [...data[0].beacons.map(b => b.loc)];

    let scanner1;
    while (scanner1 = squeue.pop()) {
        const distances1 = scanner1.rotated[mkrkey_native(scanner1)];

        for (const scanner2 of data) if (scanner1 !== scanner2) {
            const candidate_beacons = [];

            rotation_loop: for (const [rot, distances2] of Object.entries(scanner2.rotated)) {
                const [common, , extra] = intersectSortedDistances(distances1, distances2);
                if (common.length >= CONNS) {
                    //console.log('found', scanner2.sid, 'rot', rot);
                    //console.log('c', common, 'e', extra);

                    const m = rot.match(/(.+) (.+) (.+) (.+),(.+),(.+)/);
                    const [, mul0, mul1, mul2, rot0, rot1, rot2] = m.map(Number);
                    //console.log(mul0, mul1, mul2, rot0, rot1, rot2);

                    const commonBids2 = [...new Set(common.flatMap(({ bid3, bid4 }) => [bid3, bid4]))].sort((a, b) => a - b);
                    //console.log(scanner1.sid, scanner2.sid, commonBids);

                    const bidMap = {}; // map scanner 2 bid to scanner 1 bid
                    // bid1-4 are very confusing in this cycle, careful
                    for (const bid2 of commonBids2) {
                        const connections = common.filter(({ bid3, bid4 }) => bid2 === bid3 || bid2 === bid4);
                        if (connections.every(({ bid1, bid2 }) => bid1 === connections[0].bid1 || bid2 === connections[0].bid1)) {
                            // bid2 corresponds to connections[0].bid1
                            bidMap[bid2] = connections[0].bid1;
                        } else if (connections.every(({ bid1, bid2 }) => bid1 === connections[0].bid2 || bid2 === connections[0].bid2)) {
                            // bid2 corresponds to connections[0].bid2
                            bidMap[bid2] = connections[0].bid2;
                        } else throw new Error('wtf');
                    }

                    console.log(scanner1.sid, scanner2.sid, rot, stringify(bidMap, { maxLength: 240 }));

                    // TODO Then map each beacon position rel to data[0]
                    // = (I think) Convert beacon position using orientation (done below) + scanner 2 position rel to data[0]

                    // determine scanner 2 position rel to data[0]
                    // = scanner 1 position rel to data[0] + beacon position rel to scanner 1 - beacon position rel to scanner 2 (I think converted using orientation)
                    // do that for each beacon, they should be equal; if not equal, this is not the correct orientation

                    let scanner2Position;
                    for (const bid2 of commonBids2) {
                        const beaconToScanner2 = [];
                        beaconToScanner2[rot0] = -scanner2.beacons[bid2].loc[0] * mul0 || 0;
                        beaconToScanner2[rot1] = -scanner2.beacons[bid2].loc[1] * mul1 || 0;
                        beaconToScanner2[rot2] = -scanner2.beacons[bid2].loc[2] * mul2 || 0;

                        const scanner1ToBeacon = scanner1.beacons[bidMap[bid2]].loc;
                        const newScanner2Position = [0, 0, 0].map((_, i) => scanner1.position[i] + scanner1ToBeacon[i] + beaconToScanner2[i]);
                        //console.log(scanner2.sid, scanner2Position);
                        if (scanner2Position && !scanner2Position.every((_, i) => scanner2Position[i] === newScanner2Position[i])) {
                            // this is not the correct orientation
                            continue rotation_loop;
                        }
                        scanner2Position = newScanner2Position;
                    }

                    console.log(scanner2.sid, scanner2Position);

                    // const beacons = [];
                    // for (const bid2 of commonBids2) {
                    //     const tmp = [];
                    //     tmp[rot0] = scanner2.beacons[bid2].loc[0] * mul0 || 0;
                    //     tmp[rot1] = scanner2.beacons[bid2].loc[1] * mul1 || 0;
                    //     tmp[rot2] = scanner2.beacons[bid2].loc[2] * mul2 || 0;
                    //     beacons.push(tmp);
                    // }
                    // candidate_beacons.push({
                    //     orientation: { mul0, mul1, mul2, rot: [rot0, rot1, rot2] },
                    //     beacons
                    // })
                }
            }

            console.log(stringify(candidate_beacons, { maxLength: 240 }));
            //break;
        }
    }

    //console.log(stringify(data.map(s => s.rotated), { maxLength: 240 }));
};

await main();
