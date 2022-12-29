'use strict';

import fs from 'fs/promises';
import stringify from "json-stringify-pretty-compact";

const main = async () => {
    const input = await fs.readFile('simple', 'utf8');
    //const input = await fs.readFile('example', 'utf8');
    //const input = await fs.readFile('input', 'utf8');
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

    console.log(stringify(data, { maxLength: 160 }));

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

    console.log(stringify(data.map(s => s.rel), { maxLength: 160 }));

    // Calc relative coordinates between beacons under each of the 24 possible scanner orientations; sort them in a repeatable way
    for (const scanner of data) {
        scanner.rotated = {};
        for (const mul0 of [-1, 1]) {
            for (const mul1 of [-1, 1]) {
                for (const mul2 of [-1, 1]) {
                    for (const rot of [[0, 1, 2], [1, 2, 0], [2, 0, 1]]) {
                        const rkey = `${mul0} ${mul1} ${mul2} ${rot}`;
                        scanner.rotated[rkey] = [];

                        for (let bid1 = 0; bid1 < scanner.beacons.length; bid1++) {
                            for (let bid2 = bid1 + 1; bid2 < scanner.beacons.length; bid2++) {
                                const tmp = [
                                    scanner.rel[bid1][bid2][0] * mul0,
                                    scanner.rel[bid1][bid2][1] * mul1,
                                    scanner.rel[bid1][bid2][2] * mul2
                                ];
                                const rel = [tmp[rot[0]], tmp[rot[1]], tmp[rot[2]]];

                                scanner.rotated[rkey].push({ bid1, bid2, rel });
                            }
                        }

                        scanner.rotated[rkey] = scanner.rotated[rkey].sort((a, b) => {
                            if (a.rel[0] !== b.rel[0]) {
                                return a.rel[0] - b.rel[0];
                            } else if (a.rel[1] !== b.rel[1]) {
                                return a.rel[1] - b.rel[1];
                            } else {
                                return a.rel[2] - b.rel[2];
                            }
                        });
                    }
                }
            }
        }
    }

    console.log(stringify(data.map(s => s.rotated), { maxLength: 160 }));
};

await main();
