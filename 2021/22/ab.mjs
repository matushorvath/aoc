'use strict';

import fs from 'fs/promises';

const split = (node, step) => {
    const list = [];

    if (node.xf < step.xf) {
        list.push({
            xf: node.xf, xt: step.xf-1,
            yf: node.yf, yt: node.yt,
            zf: node.zf, zt: node.zt,
            v: node.v
        });
    }
    if (node.xt > step.xt) {
        list.push({
            xf: step.xt+1, xt: node.xt,
            yf: node.yf, yt: node.yt,
            zf: node.zf, zt: node.zt,
            v: node.v
        });
    }

    const cxf = Math.max(node.xf, step.xf);
    const cxt = Math.min(node.xt, step.xt);

    if (node.yf < step.yf) {
        list.push({
            xf: cxf, xt: cxt,
            yf: node.yf, yt: step.yf-1,
            zf: node.zf, zt: node.zt,
            v: node.v
        });
    }
    if (node.yt > step.yt) {
        list.push({
            xf: cxf, xt: cxt,
            yf: step.yt+1, yt: node.yt,
            zf: node.zf, zt: node.zt,
            v: node.v
        });
    }

    const cyf = Math.max(node.yf, step.yf);
    const cyt = Math.min(node.yt, step.yt);

    if (node.zf < step.zf) {
        list.push({
            xf: cxf, xt: cxt,
            yf: cyf, yt: cyt,
            zf: node.zf, zt: step.zf-1,
            v: node.v
        });
    }
    if (node.zt > step.zt) {
        list.push({
            xf: cxf, xt: cxt,
            yf: cyf, yt: cyt,
            zf: step.zt+1, zt: node.zt,
            v: node.v
        });
    }

    const czf = Math.max(node.zf, step.zf);
    const czt = Math.min(node.zt, step.zt);

    list.push({
        xf: cxf, xt: cxt,
        yf: cyf, yt: cyt,
        zf: czf, zt: czt,
        v: step.v
    });

    return list;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const steps = input.trimEnd().split(/\r?\n/).map(row => {
        const m = row.match(/(on|off) x=([-0-9]+)..([-0-9]+),y=([-0-9]+)..([-0-9]+),z=([-0-9]+)..([-0-9]+)/);
        return {
            xf: Number(m[2]), xt: Number(m[3]),
            yf: Number(m[4]), yt: Number(m[5]),
            zf: Number(m[6]), zt: Number(m[7]),
            v: m[1] === 'on'
        };
    });

    // part 1
    // const xmn = -50;
    // const xmx = 50
    // const ymn = -50;
    // const ymx = 50
    // const zmn = -50;
    // const zmx = 50

    // part 2
    let xmn = steps.reduce((p, c) => c.xf < p ? c.xf : p, Infinity);
    let xmx = steps.reduce((p, c) => c.xt > p ? c.xt : p, -Infinity);
    let ymn = steps.reduce((p, c) => c.yf < p ? c.yf : p, Infinity);
    let ymx = steps.reduce((p, c) => c.yt > p ? c.yt : p, -Infinity);
    let zmn = steps.reduce((p, c) => c.zf < p ? c.zf : p, Infinity);
    let zmx = steps.reduce((p, c) => c.zt > p ? c.zt : p, -Infinity);

    let nodes = [{
        xf: xmn, xt: xmx,
        yf: ymn, yt: ymx,
        zf: zmn, zt: zmx,
        v: false
    }];

    for (const step of steps) {
        const newNodes = [];
        for (let nidx = 0; nidx < nodes.length; nidx++) {
            const node = nodes[nidx];

            if (step.xf <= node.xt && step.xt >= node.xf &&
                step.yf <= node.yt && step.yt >= node.yf &&
                step.zf <= node.zt && step.zt >= node.zf &&
                step.v !== node.v) {

                delete nodes[nidx];
                newNodes.push(...split(node, step));
            }
        }

        nodes = [...nodes.filter(n => n !== undefined), ...newNodes];
    }

    let sum = nodes
        .filter(n => n.v)
        .reduce((p, c) => p + (c.xt - c.xf + 1) * (c.yt - c.yf + 1) * (c.zt - c.zf + 1), 0);

    console.log(sum);
};

await main();
