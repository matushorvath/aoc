'use strict';

import { cp } from 'fs';
import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => ({ v: Number(l) }));

    //console.log(data);

    const key = 811589153;

    const print = () => {
        let out = [];
        let c = data[0];
        do {
            out.push(c.v);
            c = c.n;
        } while (c !== data[0]);
        console.log(out.join(', '));
    };

    for (let i = 0; i < data.length; i++) {
        data[i].n = data[(i + 1) % data.length];
        data[i].p = data[(i - 1 + data.length) % data.length];
    }

    //print();

    for (let j = 0; j < 10; j++) {
        for (const o of data) {
            if (o.v > 0) {
                let c = o;
                const times = (o.v * key) % (data.length - 1);
                for (let i = 0; i < times; i++) {
                    const [n1, n3, n2, n4] = [c.p, c, c.n, c.n.n];

                    n1.n = n2;
                    n2.p = n1;

                    n2.n = n3;
                    n3.p = n2;

                    n3.n = n4;
                    n4.p = n3;
                }
            } else if (o.v < 0) {
                let c = o;
                const times = (o.v * key) % (data.length - 1);
                for (let i = 0; i > times; i--) {
                    const [n4, n2, n3, n1] = [c.n, c, c.p, c.p.p];

                    n1.n = n2;
                    n2.p = n1;

                    n2.n = n3;
                    n3.p = n2;

                    n3.n = n4;
                    n4.p = n3;
                }
            }
            //console.log(data);
            //print();
        }
    }

    // const tmp = data[2];
    // data[2] = data[1];
    // data[1] = tmp;

    const zero = data.find(({ v }) => v === 0);

    const i1 = 1000 % data.length;
    const i2 = 2000 % data.length;
    const i3 = 3000 % data.length;

    let v1, v2, v3;

    let c = zero;
    for (let i = 0; i < data.length; i++) {
        if (i === i1) {
            v1 = c.v;
        }
        if (i === i2) {
            v2 = c.v;
        }
        if (i === i3) {
            v3 = c.v;
        }
        if (v1 !== undefined && v2 !== undefined && v3 !== undefined) break;
        c = c.n;
    }

    console.log('>>', (v1 + v2 + v3) * key);
};

await main();
