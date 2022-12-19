'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Blueprint (\d+)\: Each ore robot costs (\d+) ore\. Each clay robot costs (\d+) ore\. Each obsidian robot costs (\d+) ore and (\d+) clay\. Each geode robot costs (\d+) ore and (\d+) obsidian\./);
        return {
            id: Number(m[1]),
            oo: Number(m[2]),
            co: Number(m[3]),
            bo: Number(m[4]),
            bc: Number(m[5]),
            go: Number(m[6]),
            gb: Number(m[7])
        };
    });

    const time = 24; // Number(process.argv[2]); // 12;
    //let mxG = 0;
    let sumG = 0;

    for (let b = 0; b < data.length; b++) {
        const q = [{ t: 0, o: 1, c: 0, b: 0, g: 0, O: 0, C: 0, B: 0, G: 0 }];
        const m = {};

        let s;
        while (s = q.pop()) {
            const key = `${s.t} ${s.o} ${s.c} ${s.b} ${s.g}`;
            if (!m[key]) m[key] = {};

            let ch = false;
            if (s.O > (m[key].mxO ?? -1)) {
                m[key].mxO = s.O; ch = true;
            }
            if (s.C > (m[key].mxC ?? -1)) {
                m[key].mxC = s.C; ch = true;
            }
            if (s.B > (m[key].mxB ?? -1)) {
                m[key].mxB = s.B; ch = true;
            }
            if (s.G > (m[key].mxG ?? -1)) {
                m[key].mxG = s.G; ch = true;
            }
            if (!ch) continue;

            if (s.t < time) {
                q.push({
                    t: s.t + 1,
                    o: s.o, c: s.c, b: s.b, g: s.g,
                    O: s.O + s.o, C: s.C + s.c, B: s.B + s.b, G: s.G + s.g
                });
                if (s.O >= data[b].oo) {
                    q.push({
                        t: s.t + 1,
                        o: s.o + 1, c: s.c, b: s.b, g: s.g,
                        O: s.O + s.o - data[b].oo, C: s.C + s.c, B: s.B + s.b, G: s.G + s.g
                    });
                }
                if (s.O >= data[b].co) {
                    q.push({
                        t: s.t + 1,
                        o: s.o, c: s.c + 1, b: s.b, g: s.g,
                        O: s.O + s.o - data[b].co, C: s.C + s.c, B: s.B + s.b, G: s.G + s.g
                    });
                }
                if (s.O >= data[b].bo && s.C >= data[b].bc) {
                    q.push({
                        t: s.t + 1,
                        o: s.o, c: s.c, b: s.b + 1, g: s.g,
                        O: s.O + s.o - data[b].bo, C: s.C + s.c - data[b].bc, B: s.B + s.b, G: s.G + s.g
                    });
                }
                if (s.O >= data[b].go && s.B >= data[b].gb) {
                    q.push({
                        t: s.t + 1,
                        o: s.o, c: s.c, b: s.b, g: s.g + 1,
                        O: s.O + s.o - data[b].go, C: s.C + s.c, B: s.B + s.b - data[b].gb, G: s.G + s.g
                    });
                }
            }
        }
        const G = Math.max(...Object.values(m).map(s => s.mxG));
        //if (mxG < G) mxG = G;
        sumG += (b + 1) * G;
        console.log(b + 1, G);
    }

    //console.log(data);
    //console.log(m);
    //console.log(Object.entries(m).filter(([k, s]) => k.startsWith(`${time}`)));

//    console.log(Math.max(...Object.values(m).map(s => s.mxG)));
    console.log('>>', sumG);
};

await main();

// WA 15
// WA 84