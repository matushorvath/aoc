const data = require('fs').readFileSync('sample', 'utf8').trim().split('\n\n')
    .map(t => t.split('\n'));

//console.log(data);

const tiles = {};
const joins = {};

for (const tile of data) {
    const [head, ...body] = tile;

    const id = head.substring(5, head.length - 1);
    //console.log(id);

    const edges = [
        body[0].split(''),
        body[body.length - 1].split(''),
        body.map(r => r[r.length - 1]),
        body.map(r => r[0]),
    ];
    //console.log(edges);

    const eints = edges.map(e => {
        const x = parseInt(e.join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        const y = parseInt([...e].reverse().join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        return x < y ? x : y;
    });
    //console.log(eints);

    for (const edge of eints) {
        if (!(edge in joins)) {
            joins[edge] = [id];
        } else {
            joins[edge].push(id);
        }
    }

    tiles[id] = {
        body,
        hedges: [eints[0], eints[1]],
        vedges: [eints[2], eints[3]],
    };
}

//console.log(joins);

const borders = {};
const corners = {}

for (const [edge, ids] of Object.entries(joins)) {
    if (ids.length === 1) {
        if (borders[ids[0]]) {
            corners[ids[0]] = true;
        }
        borders[ids[0]] = true;
    }
}

const arrayRemove = (a, v) => {
    const index = a.indexOf(v);
    a.splice(index, 1);
    return a;
}

let startId = Object.keys(corners)[0];
let startTile = tiles[startId];
let startRot = false;

let img = [[{
    id: startId,
    rot: startRot,
}]];

let row = 0;

while (true) {
    let thisId = startId;
    let thisTile = startTile;
    let thisRot = startRot;

    while (true) {
        let thisEdge, thatId;

        if (!thisRot) {
            thisEdge = thisTile.vedges.filter(e => joins[e] && joins[e].length === 2)[0];
        } else {
            thisEdge = thisTile.hedges.filter(e => joins[e] && joins[e].length === 2)[0];
        }
        if (!thisEdge) break; // line end

        thatId = joins[thisEdge].filter(i => i !== thisId)[0];
        const thatTile = tiles[thatId];

        const thatRot = !(thatTile.vedges[0] === thisEdge || thatTile.vedges[1] === thisEdge);

        img[row].push({
            id: thatId,
            rot: thatRot,
        });

        console.log(img);

        delete joins[thisEdge];
        if (!thisRot) {
            arrayRemove(thisTile.vedges, thisEdge);
        } else {
            arrayRemove(thisTile.hedges, thisEdge);
        }
        if (!thatRot) {
            arrayRemove(thatTile.vedges, thisEdge);
        } else {
            arrayRemove(thatTile.hedges, thisEdge);
        }

        thisId = thatId;
        thisRot = thatRot;
        thisTile = thatTile;
    }

    let startEdge, belowId;

    if (!startRot) {
        startEdge = startTile.hedges.filter(e => joins[e] && joins[e].length === 2)[0];
    } else {
        startEdge = startTile.vedges.filter(e => joins[e] && joins[e].length === 2)[0];
    }
    if (!startEdge) break; // done

    belowId = joins[startEdge].filter(i => i !== startId)[0];
    const belowTile = tiles[belowId];

    const belowRot = !(belowTile.hedges[0] === startEdge || belowTile.hedges[1] === startEdge);

    img.push([{
        id: belowId,
        rot: belowRot,
    }]);
    row++;

    console.log(img);

    delete joins[startEdge];
    if (!startRot) {
        arrayRemove(startTile.hedges, startEdge);
    } else {
        arrayRemove(startTile.vedges, startEdge);
    }
    if (!belowRot) {
        arrayRemove(belowTile.hedges, startEdge);
    } else {
        arrayRemove(belowTile.vedges, startEdge);
    }

    startId = belowId;
    startRot = belowRot;
    startTile = belowTile;
}

console.log(img);
