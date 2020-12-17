const d = [
    undefined,
    require('fs').readFileSync('samplea', 'utf8').trim().split('\n')
        .map(r => r.split('').map(c => c === '#' ? 1 : 0))
];

const dim = d[1].length;

const neig = (d, x, y, z) => {
    let o = 0;
    for (const dx of [-1, 0, 1]) {
        for (const dy of [-1, 0, 1]) {
            for (const dz of [-1, 0, 1]) {
                //console.log('?', x, y, z, dx, dy, dz, d[x + dx] && d[x + dx][y + dy] && d[x + dx][y + dy][z + dz]);
                if ((dx !== 0 || dy !== 0 || dz !== 0)
                        && d[x + dx] && d[x + dx][y + dy] && d[x + dx][y + dy][z + dz]) {
                    o++;
                }
            }
        }
    }
    return o;
};

const copy = (d, i) => {
    const o = [];
    for (let x = 0-i; x < dim + i; x++) {
        if (d[x]) {
            o[x] = [];
            for (let y = 0-i; y < dim + i; y++) {
                if (d[x][y]) {
                    o[x][y] = [...d[x][y]];
                }
            }
        }
    }
    return o;
};

const print = (d, i) => {
    console.log('-----');
    for (let x = 0-i; x < dim + i; x++) {
        console.log(`x=${x}`);
        for (let y = 0-i; y < dim + i; y++) {
            let s = '';
            for (let z = 0-i; z < dim + i; z++) {
                s += (d[x] && d[x][y] && d[x][y][z]) ? '# ' : '. ';
            }
            console.log(s);
        }
    }
};

const count = (d, i) => {
    let o = 0;
    for (let x = 0-i; x < dim + i; x++) {
        if (d[x]) {
            for (let y = 0-i; y < dim + i; y++) {
                if (d[x][y]) {
                    for (let z = 0-i; z < dim + i; z++) {
                        if (d[x][y][z]) o++;
                    }
                }
            }
        }
    }
    return o;
};

//for (const z of Object.keys(old[x][y]).map(Number)) {
//print(d, 0);

for (let i = 1; i < 7; i++) {
    const old = copy(d, i);

    for (let x = 0-i; x < dim + i; x++) {
        for (let y = 0-i; y < dim + i; y++) {
            for (let z = 0-i; z < dim + i; z++) {
                const n = neig(old, x, y, z);
                //console.log('n', x, y, z, n);

                if (d[x] && d[x][y] && d[x][y][z] && (n < 2 || n > 3)) {
                    d[x][y][z] = 0;
                }
                else if ((!d[x] || !d[x][y] || !d[x][y][z]) && n === 3) {
                    if (!d[x]) d[x] = [];
                    if (!d[x][y]) d[x][y] = [];
                    d[x][y][z] = 1;
                }
            }
        }
    }

    print(d, i);
    console.log(count(d, i));
}

console.log(count(d, 6));
