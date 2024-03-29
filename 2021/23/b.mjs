'use strict';

import fs from 'fs/promises';

// TODO lend a rend musia podporovat prvky ktore su na obidvoch poziciach
// ked pride prvok do prazdneho, pride na poziciu 0
// ak potom pride dalsi, posunie sa aj existujuci prvok ako keby uz prisiel na poziciu 1
// potom ak odide prvok, ten druhy musi uz ostat na pozicii 1, aby neminal energiu co nemusi (poziciu 0 este moze niekto vyuzit)

const mkkey = pos => `${pos.lend} ${pos.rend} ${pos.mids} ${pos.rooms[0]} ${pos.rooms[1]} ${pos.rooms[2]} ${pos.rooms[3]}`;

const main = async () => {
    //const input = await fs.readFile('inputa.done', 'utf8');
    //const input = await fs.readFile('examplea', 'utf8');
    //const input = await fs.readFile('exampleb', 'utf8');
    //const input = await fs.readFile('inputa', 'utf8');
    const input = await fs.readFile('inputb', 'utf8');

    const amphipods = input.trimEnd().split(/\r?\n/).slice(2, -1)
        .map(row => [row[3], row[5], row[7], row[9]].map(ch => ch.charCodeAt(0) - 'A'.charCodeAt(0)));

    const CAP = amphipods.length;

    const print = (pos) => {
        const lends = pos.lend.map(a => a >= 0 ? String.fromCharCode('A'.charCodeAt(0) + a) : '.').join('');
        const rends = pos.rend.map(a => a >= 0 ? String.fromCharCode('A'.charCodeAt(0) + a) : '.').reverse().join('');
        const midss = pos.mids.map(a => a >= 0 ? String.fromCharCode('A'.charCodeAt(0) + a) : '.').join('');
        const roomss = pos.rooms.map(room => room.map(a => String.fromCharCode('A'.charCodeAt(0) + a)));

        console.log('#############');
        console.log(`#${lends}.${midss[0]}.${midss[1]}.${midss[2]}.${rends}#`)
        for (let i = 0; i < CAP; i++) {
            console.log([
                `${i === 0 ? '##' : '  '}#`,
                `${roomss[0][CAP - i - 1] ?? '.'}#`,
                `${roomss[1][CAP - i - 1] ?? '.'}#`,
                `${roomss[2][CAP - i - 1] ?? '.'}#`,
                `${roomss[3][CAP - i - 1] ?? '.'}#`,
                `${i === 0 ? '##' : '  '}`
            ].join(''));
        }
        console.log('  #########  ');
        console.log();
    };
 
    const data = {
        lend: [-1, -1], rend: [-1, -1], mids: [-1, -1, -1],
        rooms: amphipods[0].map((_, c) => amphipods.map((_, r) => amphipods[CAP - r - 1][c]))
    };

    const todo = [];
    todo.push({ pos: data, energy: 0 });

    const seen = {};
    let minenergy = Infinity;

    // let maxq = -Infinity;
    // let pos_maxq;
    // let energy_maxq;

    let state;
    while (state = todo.pop()) {
        const { pos, energy } = state;
        const { lend, rend, mids, rooms } = pos;

        // console.log(energy);
        // print(pos);

        if (energy >= minenergy) continue;

        const key = mkkey(pos);
        if (seen[key] && seen[key] <= energy) continue;
        seen[key] = energy;

        // const quality = rooms.reduce((tc, room, rtype) => tc + room.reduce((rc, atype) => rc + ((atype === rtype) ? 1 : 0), 0), 0);
        // if (quality > maxq) {
        //     maxq = quality;
        //     pos_maxq = pos;
        //     energy_maxq = energy;
        // }

        if (lend.every(a => a === -1) && rend.every(a => a === -1) && mids.every(a => a === -1)
                && rooms.every((room, rtype) => room.every(atype => atype === rtype))) {
            minenergy = energy;
            console.log(minenergy);
            continue;
        }

        // Move topmost lend/rend to room
        {
            // Left end
            const idx = lend[1] >= 0 ? 1 : 0;
            const atype = lend[idx];
            const room = rooms[atype];

            // Move the room if it has no foreigners and the route is free
            const move = atype >= 0 && room.every(oatype => oatype === atype)
                && mids.every((a, i) => i >= atype || a < 0);

            if (move) {
                const nlend = [...lend];
                nlend[idx] = -1;
                const nrooms = [...rooms];
                nrooms[atype] = [...rooms[atype], atype];

                todo.push({
                    pos: { lend: nlend, rend, mids, rooms: nrooms },
                    energy: energy + ((2 - idx) + (2 * atype) + (CAP - room.length)) * (10 ** atype)
                });
            }
        }

        {
            // Right end
            const idx = rend[1] >= 0 ? 1 : 0;
            const atype = rend[idx];
            const room = rooms[atype];

            // Move the room if it has no foreigners and the route is free
            const move = atype >= 0 && room.every(oatype => oatype === atype)
                && mids.every((a, i) => i < atype || a < 0);

            if (move) {
                const nrend = [...rend];
                nrend[idx] = -1;
                const nrooms = [...rooms];
                nrooms[atype] = [...rooms[atype], atype];

                todo.push({
                    pos: { lend, rend: nrend, mids, rooms: nrooms },
                    energy: energy + ((2 - idx) + (2 * (3 - atype)) + (CAP - room.length)) * (10 ** atype)
                });
            }
        }

        // Move mid points to room
        {
            const MIDCHK = [
                [[     ], [0    ], [0,1  ]],
                [[     ], [     ], [  1  ]],
                [[  1  ], [     ], [     ]],
                [[  1,2], [    2], [     ]]
            ];
            // midi: 0-3 (= mididx below - 1)
            // MIDCHK[atype][midi].every(i => mids[i] < 0)

            // 0   -1 -3 -5
            // 1    1 -1 -3
            // 2    3  1 -1
            // 3    5  3  1
            // Math.abs(2 * (rtype - midi) - 1)

            for (let midi = 0; midi < 4; midi++) {
                const atype = mids[midi];
                const room = rooms[atype];

                // Move the room if it has no foreigners and the route is free
                const move = atype >= 0 && room.every(oatype => oatype === atype)
                    && MIDCHK[atype][midi].every(i => mids[i] < 0);
                if (!move) continue;

                const nmids = [...mids];
                nmids[midi] = -1;
                const nrooms = [...rooms];
                nrooms[atype] = [...rooms[atype], atype];

                todo.push({
                    pos: { lend, rend, mids: nmids, rooms: nrooms },
                    energy: energy + (Math.abs(2 * (atype - midi) - 1) + (CAP - room.length)) * (10 ** atype)
                });
            }
        }

        // Move topmost ams from rooms
        for (let rtype = 0; rtype < 4; rtype++) {
            const room = rooms[rtype];
            const atype = room[room.length - 1];

            // Move if in incorrect room, or if foreigners are below
            const move = atype !== undefined && atype !== rtype || !room.every(oatype => oatype === atype);
            if (!move) continue;

            const nrooms = [...rooms];
            nrooms[rtype] = room.slice(0, -1);

            // mididx = 0, 1, 2, 3, 4
            // 0   -1 1 3 5 7
            // 1   -3 -1 1 3 5
            // 2   -5 -3 -1 1 3
            // 3   -7 -5 -3 -1 1
            // Math.abs(2 * (mididx - rtype) - 1)

            // mididx = 0, 1, 2, 3, 4
            //     |   |   |   |   |  
            // 0       0   01  012 012
            // 1   0   0    1   12  12
            // 2   01  01   1   1   12
            // 3   012 012  12   2    
            const MIDCHK = [
                [[     ], [0    ], [0,1  ], [0,1,2], [0,1,2]],
                [[0,   ], [0    ], [  1  ], [  1,2], [  1,2]],
                [[0,1  ], [0,1  ], [  1  ], [    2], [    2]],
                [[0,1,2], [0,1,2], [  1,2], [    2], [     ]]
            ];
            // MIDCHK[rtype][mididx].every(i => mids[i] < 0)

            if (MIDCHK[rtype][0].every(i => mids[i] < 0)) {
                if (lend[0] < 0 && lend[1] >= 0) todo.push({
                    pos: { lend: [lend[1], atype], rend, mids, rooms: nrooms },
                    energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (0 - rtype) - 1)) * (10 ** atype)
                        + (10 ** lend[1]) // with retroactive move
                });
                else if (lend[1] < 0) todo.push({
                    pos: { lend: [lend[0], atype], rend, mids, rooms: nrooms },
                    energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (0 - rtype) - 1)) * (10 ** atype)
                });
            };
            if (MIDCHK[rtype][1].every(i => mids[i] < 0)) todo.push({
                pos: { lend, rend, mids: [atype, mids[1], mids[2]], rooms: nrooms },
                energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (1 - rtype) - 1)) * (10 ** atype)
            });
            if (MIDCHK[rtype][2].every(i => mids[i] < 0)) todo.push({
                pos: { lend, rend, mids: [mids[0], atype, mids[2]], rooms: nrooms },
                energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (2 - rtype) - 1)) * (10 ** atype)
            });
            if (MIDCHK[rtype][3].every(i => mids[i] < 0)) todo.push({
                pos: { lend, rend, mids: [mids[0], mids[1], atype], rooms: nrooms },
                energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (3 - rtype) - 1)) * (10 ** atype)
            });
            if (MIDCHK[rtype][4].every(i => mids[i] < 0)) {
                if (rend[0] < 0 && rend[1] >= 0) todo.push({
                    pos: { lend, rend: [rend[1], atype], mids, rooms: nrooms },
                    energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (4 - rtype) - 1)) * (10 ** atype)
                        + (10 ** rend[1]) // with retroactive move
                });
                else if (rend[1] < 0) todo.push({
                    pos: { lend, rend: [rend[0], atype], mids, rooms: nrooms },
                    energy: energy + ((CAP - room.length) + 1 + Math.abs(2 * (4 - rtype) - 1)) * (10 ** atype)
                });
            };
        }
    }

    // console.log('maxq', maxq, 'energy', energy_maxq);
    // print(pos_maxq);

    console.log('>', minenergy);
};

await main();
