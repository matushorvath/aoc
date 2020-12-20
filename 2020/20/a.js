const data = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
    .map(t => t.split('\n'));

//console.log(data);

const have = {};

for (const tile of data) {
    const [head, ...body] = tile;

    const id = head.substring(5, head.length - 1);
    //console.log(id);

    const edges = [
        body[0].split(''),
        body.map(r => r[r.length - 1]),
        body[body.length - 1].split(''),
        body.map(r => r[0]),
    ];
    //console.log(edges);

    const eints = edges.map(e => {
        const x = parseInt(e.join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        const y = parseInt([...e].reverse().join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        return x < y ? x : y;
    });
    console.log(eints);

    for (const edge of eints) {
        if (!(edge in have)) {
            have[edge] = [id];
        } else {
            have[edge].push(id);
        }
    }
}

console.log(have);

const borders = {};

let mul = 1;

for (const [edge, ids] of Object.entries(have)) {
    if (ids.length === 1) {
        if (borders[ids[0]]) {
            console.log('corner', ids[0]);
            mul *= parseInt(ids[0], 10);
        }
        borders[ids[0]] = true;
    }
}

//    const ids = Object.values(have).flat().sort((a, b) => a - b);

console.log(mul);
