import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const loc = [0, 2];

const pad = [
    [   ,    , '1',    ,    ],
    [   , '2', '3', '4',    ],
    ['5', '6', '7', '8', '9'],
    [   , 'A', 'B', 'C',    ],
    [   ,    , 'D',    ,    ]
];

// 2,0
// 1,1 3,1
// 0,2 4,2
// 1,3 3,3
// 2,4

for (const d of data) {
    for (const i of d) {
        switch (i) {
            case 'U': if (pad[loc[1] - 1]?.[loc[0]]) loc[1] -= 1; break;
            case 'D': if (pad[loc[1] + 1]?.[loc[0]]) loc[1] += 1; break;
            case 'L': if (pad[loc[1]]?.[loc[0] - 1]) loc[0] -= 1; break;
            case 'R': if (pad[loc[1]]?.[loc[0] + 1]) loc[0] += 1; break;
        }
    }
    console.log(loc, pad[loc[1]][loc[0]]);
}

//console.log('result', );
// 26562 low