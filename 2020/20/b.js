const data = require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
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

//console.log(corners);

const edgeRemove = (a, e) => {
    const index = a.findIndex(x => x.e == e);
    a.splice(index, 1);
    return a;
}

let startId = Object.keys(corners)[1];
let startTile = tiles[startId];
let startRot = false;

let img = [[{
    id: startId,
    rot: startRot,
    vflp: undefined,
}]];

let row = 0;

while (true) {
    let thisId = startId;
    let thisTile = startTile;
    let thisRot = startRot;

    while (true) {
        let thisEdge, thisHflp, thatId;

        if (!thisRot) {
            const thisEdgeItem = thisTile.vedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
            if (!thisEdgeItem) break; // line end
            thisEdge = thisEdgeItem.e;
            thisHflp = thisEdgeItem.l;
        } else {
            const thisEdgeItem = thisTile.hedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
            if (!thisEdgeItem) break; // line end
            thisEdge = thisEdgeItem.e;
            thisHflp = thisEdgeItem.t;
        }

        // If we just started a row, flip first tile as needed
        if (thisId === startId) {
            img[row][0].hflp = thisHflp;
        }

        thatId = joins[thisEdge].filter(i => i !== thisId)[0];
        const thatTile = tiles[thatId];

        const thatRot = !(thatTile.vedges[0].e === thisEdge || thatTile.vedges[1].e === thisEdge);

        // hflip

        let thatHflp;
        if (!thatRot) {
            const thatEdgeItem = thatTile.vedges.filter(e => e.e === thisEdge)[0];
            thatHflp = !thatEdgeItem.l;
        } else {
            const thatEdgeItem = thatTile.hedges.filter(e => e.e === thisEdge)[0];
            thatHflp = !thatEdgeItem.t;
        }

        // vflip

        let thatVflp;
        if (row > 0) {
            const aboveImgItem = img[row - 1][img[row].length];
            const aboveId = aboveImgItem.id;
            const aboveTile = tiles[aboveId];
            const aboveRot = aboveImgItem.rot;

            let aboveEdge, aboveVflp;
            if (row === 1) {
                if (!aboveRot) {
                    const aboveEdgeItem = aboveTile.hedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
                    aboveEdge = aboveEdgeItem.e;
                    aboveVflp = aboveEdgeItem.t;
                } else {
                    const aboveEdgeItem = aboveTile.vedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
                    aboveEdge = aboveEdgeItem.e;
                    aboveVflp = !aboveEdgeItem.l;
                }
                aboveImgItem.vflp = aboveVflp;
            } else {
                if (!aboveRot) {
                    aboveEdge = aboveTile.hedges[0].e;
                } else {
                    aboveEdge = aboveTile.vedges[0].e;
                }
                aboveVflp = aboveImgItem.vflp;
            }

            if (!thatRot) {
                const thatEdgeItem = thatTile.hedges.filter(e => e.e === aboveEdge)[0];
                thatVflp = !thatEdgeItem.t;
            } else {
                const thatEdgeItem = thatTile.vedges.filter(e => e.e === aboveEdge)[0];
                thatVflp = thatEdgeItem.l;
            }

            delete joins[aboveEdge];
            if (!thatRot) {
                edgeRemove(thatTile.hedges, aboveEdge);
            } else {
                edgeRemove(thatTile.vedges, aboveEdge);
            }
            if (!aboveRot) {
                edgeRemove(aboveTile.hedges, aboveEdge);
            } else {
                edgeRemove(aboveTile.vedges, aboveEdge);
            }
        }

        img[row].push({
            id: thatId,
            rot: thatRot,
            vflp: thatVflp,
            hflp: thatHflp,
        });

        //console.log(img);

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

    let startEdge, startVflp, belowId;

    if (!startRot) {
        const startEdgeItem = startTile.hedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
        if (!startEdgeItem) break; // done
        startEdge = startEdgeItem.e;
        startVflp = startEdgeItem.t;
    } else {
        const startEdgeItem = startTile.vedges.filter(e => joins[e.e] && joins[e.e].length === 2)[0];
        if (!startEdgeItem) break; // done
        startEdge = startEdgeItem.e;
        startVflp = !startEdgeItem.l
    }

    // If we just started, flip [0, 0] tile as needed
    if (row === 0) {
        img[0][0].vflp = startVflp;
    }

    belowId = joins[startEdge].filter(i => i !== startId)[0];
    const belowTile = tiles[belowId];

    const belowRot = !(belowTile.hedges[0].e === startEdge || belowTile.hedges[1].e === startEdge);

    let belowVflp;
    if (!belowRot) {
        const belowEdgeItem = belowTile.hedges.filter(e => e.e === startEdge)[0];
        belowVflp = !belowEdgeItem.t;
    } else {
        const belowEdgeItem = belowTile.vedges.filter(e => e.e === startEdge)[0];
        belowVflp = belowEdgeItem.l;
    }

    img.push([{
        id: belowId,
        rot: belowRot,
        vflp: belowVflp,
    }]);
    row++;

    //console.log(img);

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

//console.log(img);

const transform = (body, rot, hflp, vflp) => {
    const out = [];
    if (rot) {
        for (let i = 1; i < body.length - 1; i++) {
            out.push([]);
            for (let j = 1; j < body[0].length - 1; j++) {
                out[i - 1][j - 1] = body[j][body.length - i - 1];
            }
        }
    } else {
        for (let i = 1; i < body.length - 1; i++) {
            out.push([]);
            for (let j = 1; j < body[0].length - 1; j++) {
                out[i - 1][j - 1] = body[i][j];
            }
        }
    }
    if (hflp) {
        for (let i = 0; i < out.length; i++) {
            for (let j = 0; j < Math.floor(out[0].length / 2); j++) {
                const tmp = out[i][out[0].length - j - 1];
                out[i][out[0].length - j - 1] = out[i][j];
                out[i][j] = tmp;
            }
        }
    }
    if (vflp) {
        for (let i = 0; i < Math.floor(out.length / 2); i++) {
            for (let j = 0; j < out[0].length; j++) {
                const tmp = out[out.length - i - 1][j];
                out[out.length - i - 1][j] = out[i][j];
                out[i][j] = tmp;
            }
        }
    }
    return out;
};

const out = [];

for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < img[0].length; j++) {
        const tile = tiles[img[i][j].id];
        const data = transform(tile.body, img[i][j].rot, img[i][j].hflp, img[i][j].vflp);

        for (let a = 0; a < data.length; a++) {
            if (!out[i * data.length + a]) {
                out[i * data.length + a] = [];
            }

            for (let b = 0; b < data[0].length; b++) {
                out[i * data.length + a][j * data[0].length + b] = data[a][b];
            }
        }
    }
}

const variants = (d) => {
    const hd = [];
    const vd = [];
    const hvd = []
    const rd = [];

    for (let i = 0; i < d.length; i++) {
        hd.push([]);
        vd.push([]);
        hvd.push([]);
        rd.push([]);

        for (let j = 0; j < d[0].length; j++) {
            hd[i][j] = d[i][d[0].length - j - 1];
            vd[i][j] = d[d.length - i - 1][j];
            hvd[i][j] = d[d.length - i - 1][d[0].length - j - 1];
            rd[i][j] = d[j][d.length - i - 1];
        }
    }

    const rhd = [];
    const rvd = [];
    const rhvd = []

    for (let i = 0; i < rd.length; i++) {
        rhd.push([]);
        rvd.push([]);
        rhvd.push([]);

        for (let j = 0; j < rd[0].length; j++) {
            rhd[i][j] = rd[i][rd[0].length - j - 1];
            rvd[i][j] = rd[rd.length - i - 1][j];
            rhvd[i][j] = rd[rd.length - i - 1][rd[0].length - j - 1];
        }
    }

    return [
        d, hd, vd, hvd,
        rd, rhd, rvd, rhvd
    ];
};

const vars = variants(out);

// for (const asdf of [vars[6]]) {
//     console.log('-----');
//     for (let i = 0; i < asdf.length; i++) {
//         console.log(asdf[i].join(''));
//     }
// }

let had;
let pic;

//   01234567890123456789
// 0                   # 
// 1 #    ##    ##    ###
// 2  #  #  #  #  #  #   

which = 0;
hads = 0;

//for (const asdf of [vars[6]]) {
for (const asdf of vars) {
    had = [];

    for (let i = 0; i < asdf.length; i++) {
        for (let j = 0; j < asdf[0].length; j++) {
            if (asdf[i + 0] && asdf[i + 1] && asdf[i + 2] &&
                asdf[i + 0][j + 18] === '#' &&
                asdf[i + 1][j +  0] === '#' &&
                asdf[i + 1][j +  5] === '#' &&
                asdf[i + 1][j +  6] === '#' &&
                asdf[i + 1][j + 11] === '#' &&
                asdf[i + 1][j + 12] === '#' &&
                asdf[i + 1][j + 17] === '#' &&
                asdf[i + 1][j + 18] === '#' &&
                asdf[i + 1][j + 19] === '#' &&
                asdf[i + 2][j +  1] === '#' &&
                asdf[i + 2][j +  4] === '#' &&
                asdf[i + 2][j +  7] === '#' &&
                asdf[i + 2][j + 10] === '#' &&
                asdf[i + 2][j + 13] === '#' &&
                asdf[i + 2][j + 16] === '#') {

                if (!had[i + 0]) {
                    had[i + 0] = [];
                }
                if (!had[i + 1]) {
                    had[i + 1] = [];
                }
                if (!had[i + 2]) {
                    had[i + 2] = [];
                }

                had[i + 0][j + 18] = true;
                had[i + 1][j +  0] = true;
                had[i + 1][j +  5] = true;
                had[i + 1][j +  6] = true;
                had[i + 1][j + 11] = true;
                had[i + 1][j + 12] = true;
                had[i + 1][j + 17] = true;
                had[i + 1][j + 18] = true;
                had[i + 1][j + 19] = true;
                had[i + 2][j +  1] = true;
                had[i + 2][j +  4] = true;
                had[i + 2][j +  7] = true;
                had[i + 2][j + 10] = true;
                had[i + 2][j + 13] = true;
                had[i + 2][j + 16] = true;
                hads++;
            }
        }
    }

    if (had.length > 0) {
        pic = asdf;
        //console.log(which);
        console.log(hads);
        break;
    }

    which++;
}

// console.log(pic);
// console.log(had);

let sum = 0;

for (let i = 0; i < pic.length; i++) {
    for (let j = 0; j < pic[0].length; j++) {
        if (pic[i][j] === '#' && !(had[i] && had[i][j])) {
            sum++;
        }
    }
}

console.log(sum);

const chalk = require('chalk');

for (let i = 0; i < pic.length; i++) {
    let line = '';
    for (let j = 0; j < pic[0].length; j++) {
        if (pic[i][j] === '#') {
            if (had[i] && had[i][j]) {
                line += chalk.magentaBright('O');
            } else {
                line += chalk.blue('~');
            }
        } else {
            line += chalk.blue('.');
        }
    }
    console.log(line);
}
