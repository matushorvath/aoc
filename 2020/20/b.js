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
        body.map(r => r[0]),
        body.map(r => r[r.length - 1]),
    ];
    //console.log(edges);

    const eintswf = edges.map(e => {
        const x = parseInt(e.join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        const y = parseInt([...e].reverse().join('').replace(/#/g, 1).replace(/\./g, 0), 2);
        return x < y ? { e: x, f: false } : { e: y, f: true };
    });
    const eints = eintswf.map(e => e.e);
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
        hedges: [{ t: true, e: eints[0] }, { t: false, e: eints[1] }],
        vedges: [{ l: true, e: eints[2] }, { l: false, e: eints[3] }],
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

const edgeRemove = (a, e) => {
    const index = a.findIndex(x => x.e == e);
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

    // TODO should we hflip startTile?

    while (true) {
        let thisEdge, thatId;

        if (!thisRot) {
            const thisEdgeItem = thisTile.vedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
            if (!thisEdgeItem) break; // line end
            thisEdge = thisEdgeItem.e;
        } else {
            const thisEdgeItem = thisTile.hedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
            if (!thisEdgeItem) break; // line end
            thisEdge = thisEdgeItem.e;
        }

        thatId = joins[thisEdge].filter(i => i !== thisId)[0];
        const thatTile = tiles[thatId];

        const thatRot = !(thatTile.vedges[0].e === thisEdge || thatTile.vedges[1].e === thisEdge);

        // let thatHflp;
        // if (!thatRot) {
        //     const thatEdgeItem = thatTile.vedges.filter(e => e.e === thisEdge)[0];
        //     thatHflp = thatEdgeItem.l;
        // } else {
        //     const thatEdgeItem = thatTile.hedges.filter(e => e.e === thisEdge)[0];
        //     thatHflp = thatEdgeItem.t;
        // }

        img[row].push({
            id: thatId,
            rot: thatRot,
            //hflp: thatHflp
        });

        console.log(img);

        delete joins[thisEdge];
        if (!thisRot) {
            edgeRemove(thisTile.vedges, thisEdge);
        } else {
            edgeRemove(thisTile.hedges, thisEdge);
        }
        if (!thatRot) {
            edgeRemove(thatTile.vedges, thisEdge);
        } else {
            edgeRemove(thatTile.hedges, thisEdge);
        }

        thisId = thatId;
        thisRot = thatRot;
        thisTile = thatTile;
    }

    let startEdge, belowId;

    if (!startRot) {
        const startEdgeItem = startTile.hedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
        if (!startEdgeItem) break; // done
        startEdge = startEdgeItem.e;
    } else {
        const startEdgeItem = startTile.vedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
        if (!startEdgeItem) break; // done
        startEdge = startEdgeItem.e;
    }

    belowId = joins[startEdge].filter(i => i !== startId)[0];
    const belowTile = tiles[belowId];

    const belowRot = !(belowTile.hedges[0].e === startEdge || belowTile.hedges[1].e === startEdge);

    img.push([{
        id: belowId,
        rot: belowRot,
    }]);
    row++;

    console.log(img);

    delete joins[startEdge];
    if (!startRot) {
        edgeRemove(startTile.hedges, startEdge);
    } else {
        edgeRemove(startTile.vedges, startEdge);
    }
    if (!belowRot) {
        edgeRemove(belowTile.hedges, startEdge);
    } else {
        edgeRemove(belowTile.vedges, startEdge);
    }

    startId = belowId;
    startRot = belowRot;
    startTile = belowTile;
}

console.log(img);
