import fs from 'fs/promises';

// The screen is 50 pixels wide and 6 pixels tall, all of which start off,

// const input = await fs.readFile('example', 'utf8');
// const W = 7;
// const H = 3;

const input = await fs.readFile('input', 'utf8');
const W = 50;
const H = 6;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    let m;

    m = r.match(/rect (\d+)x(\d+)/);
    if (m) {
        return { o: 'rect', a: Number(m[1]), b: Number(m[2]) };
    }

    m = r.match(/rotate row y=(\d+) by (\d+)/);
    if (m) {
        return { o: 'rrow', a: Number(m[1]), b: Number(m[2]) };
    }

    m = r.match(/rotate column x=(\d+) by (\d+)/);
    if (m) {
        return { o: 'rcol', a: Number(m[1]), b: Number(m[2]) };
    }
});

console.log(data);

const s = new Array(H).fill([]).map(_ => new Array(W).fill(false));

const print = (s) => console.log(s.map(r => r.map(c => c ? '#' : '_').join('')).join('\n') + '\n');
print(s);

for (const i of data) {
    switch (i.o) {
        case 'rect':
            for (let x = 0; x < i.a; x++) {
                for (let y = 0; y < i.b; y++) {
                    s[y][x] = true;
                }
            }
            break;

        case 'rrow':
            const oldr = s[i.a];
            s[i.a] = [];

            for (let x = 0; x < W; x++) {
                s[i.a].push(oldr[(x - i.b + W) % W]);
            }
            break;

        case 'rcol':
            const oldc = s.map(r => r[i.a]);
            for (let y = 0; y < H; y++) {
                s[y][i.a] = oldc[(y - i.b + H) % H];
            }
            break;
    }

    print(s);
}

print(s);

const cnt = s.reduce((pr, cr) => pr + cr.reduce((pc, cc) => pc + (cc ? 1 : 0), 0), 0);

console.log('result', cnt);
