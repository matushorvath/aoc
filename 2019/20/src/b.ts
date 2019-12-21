import { promises as fs } from 'fs';

const aset = (a: any[], ...is: number[]) => (v: any) => {
    for (const i of is.slice(0, -1)) {
        if (a[i] === undefined) {
            a[i] = [];
        }
        a = a[i];
    }
    a[is.slice(-1)[0]] = v;
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let data = input.slice(0, -1).split(/\r?\n/).map(l => l.split(''));

    const mx = Math.trunc(data.length / 2);
    const my = Math.trunc(data[0].length / 2);

    const [x0, y0] = [1, 1];
    const [x1, y1] = [
        data.slice(x0 + 1).findIndex(l => l[my].match(/^[A-Z ]$/)) + x0 + 1,
        data[mx].slice(y0 + 1).findIndex(p => p.match(/^[A-Z ]$/)) + y0 + 1
    ];
    const [x2, y2] = [
        data.slice(x1).findIndex(l => !l[my].match(/^[A-Z ]$/)) + x1 - 1,
        data[mx].slice(y1).findIndex(p => !p.match(/^[A-Z ]$/)) + y1 - 1
    ];
    const [x3, y3] = [data.length - 2, data[0].length - 2];

    const psrcs: { [key: string]: [number, number] }[] = [{}, {}];
    const ptgts: { [key: string]: [number, number, number] }[] = [{}, {}];

    for (let x = x0 + 1; x < x3; x += 1) {
        data[x][y0] = data[x][y0 - 1] + data[x][y0];
        data[x][y0 - 1] = ' ';
        if (data[x][y0].trim()) {
            psrcs[0][data[x][y0]] = [x, y0];
            ptgts[0][data[x][y0]] = [x, y0 + 1, 1];
        }
        data[x][y3] = data[x][y3] + data[x][y3 + 1];
        data[x][y3 + 1] = ' ';
        if (data[x][y3].trim()) {
            psrcs[0][data[x][y3]] = [x, y3];
            ptgts[0][data[x][y3]] = [x, y3 - 1, 1];
        }
    }
    for (let x = x1 + 1; x < x2; x += 1) {
        data[x][y1] = data[x][y1] + data[x][y1 + 1];
        data[x][y1 + 1] = ' ';
        if (data[x][y1].trim()) {
            psrcs[1][data[x][y1]] = [x, y1];
            ptgts[1][data[x][y1]] = [x, y1 - 1, -1];
        }
        data[x][y2] = data[x][y2 - 1] + data[x][y2];
        data[x][y2 - 1] = ' ';
        if (data[x][y2].trim()) {
            psrcs[1][data[x][y2]] = [x, y2];
            ptgts[1][data[x][y2]] = [x, y2 + 1, -1];
        }
    }
    for (let y = y0 + 1; y < y3; y += 1) {
        data[x0][y] = data[x0 - 1][y] + data[x0][y];
        data[x0 - 1][y] = ' ';
        if (data[x0][y].trim()) {
            psrcs[0][data[x0][y]] = [x0, y];
            ptgts[0][data[x0][y]] = [x0 + 1, y, 1];
        }
        data[x3][y] = data[x3][y] + data[x3 + 1][y];
        data[x3 + 1][y] = ' ';
        if (data[x3][y].trim()) {
            psrcs[0][data[x3][y]] = [x3, y];
            ptgts[0][data[x3][y]] = [x3 - 1, y, 1];
        }
    }
    for (let y = y1 + 1; y < y2; y += 1) {
        data[x1][y] = data[x1][y] + data[x1 + 1][y];
        data[x1 + 1][y] = ' ';
        if (data[x1][y].trim()) {
            psrcs[1][data[x1][y]] = [x1, y];
            ptgts[1][data[x1][y]] = [x1 - 1, y, -1];
        }
        data[x2][y] = data[x2 - 1][y] + data[x2][y];
        data[x2 - 1][y] = ' ';
        if (data[x2][y].trim()) {
            psrcs[1][data[x2][y]] = [x2, y];
            ptgts[1][data[x2][y]] = [x2 + 1, y, -1];
        }
    }

//    console.log(data.map(l => l.map(p => ('  ' + p).slice(-2)).join(',')).join('\n'));
//    console.log(ports);

    const { AA: _1, ZZ: _2, ...psrcs0 } = psrcs[0];
    const { AA: _3, ZZ: _4, ...psrcs1 } = psrcs[1];
    const { AA: aa0, ZZ: zz0, ...ptgts0 } = ptgts[0];
    const { AA: aa1, ZZ: zz1, ...ptgts1 } = ptgts[1];

    let aa = aa0 ?? aa1;
    let zz = zz0 ?? zz1;

    console.log('zz', zz);

    let flds = data as (string|[number, number, number])[][];

    for (const [n, [x, y]] of Object.entries(psrcs0)) {
        flds[x][y] = ptgts1[n];
    }
    for (const [n, [x, y]] of Object.entries(psrcs1)) {
        flds[x][y] = ptgts0[n];
    }

    //console.log(flds.map(l => l.map(p => ('     ' + p).slice(-5)).join(',')).join('\n'));

    let [x, y] = aa;
    let level = 0;

    const vals: number[][][] = [];
    const vist: boolean[][][] = [];
    aset(vals, 0, x, y)(0);

    let q: { [dist: number]: [number, number, number][] } = {};

    while (level !== 0 || x != zz[0] || y != zz[1]) {
        const nv = vals[level][x][y] + 1;

        for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
            if (flds[i][j] === '.') {
                const ov = vals[level]?.[i]?.[j];
                if (nv < (ov ?? Infinity)) {
                    if (ov) q[ov] = q[ov].filter(p => p[0] !== level || p[1] !== i || p[2] !== j);
                    aset(vals, level, i, j)(nv);
                    (q[nv] = q[nv] ?? []).push([level, i, j]);
                }
            } else if (flds[i][j] instanceof Array) {
                const [a, b, li] = flds[i][j] as [number, number, number];
                if (level + li >= 0) {
                    const ov = vals[level + li]?.[a]?.[b];
                    if (nv < (ov ?? Infinity)) {
                        if (ov) q[ov] = q[ov].filter(p => p[0] !== level + li || p[1] !== a || p[2] !== b);
                        aset(vals, level + li, a, b)(nv);
                        (q[nv] = q[nv] ?? []).push([level + li, a, b]);
                    }
                }
            }
        }

        aset(vist, level, x, y)(true);

        const min = Math.min(...Object.keys(q).map(n => Number(n)).filter(n => q[n].length > 0));
        [level, x, y] = q[min].shift();

        if (min % 100 === 0) console.log(min, [level, x, y]);

        // console.log('----- lxy', [level, x, y]);
        // console.log(
        //     [...vals.keys()].map(l =>
        //         Array.from({ length: x3 }).map((_1, i) =>
        //             Array.from({ length: y3 }).map((_2, j) =>
        //                 ('   ' + (vals[l]?.[i]?.[j] ?? '')).slice(-2)).join(',')).join('\n')).join('\n\n'));
    }

    console.log('steps', vals[0][zz[0]][zz[1]]);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
