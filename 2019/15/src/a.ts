import { promises as fs, exists } from 'fs';
import { Vm } from './vm-a';

const field: number[][] = [];
let reply: number;

function aset<T> (a: T[][], i0: number, i1: number, v: T) {
    if (a[i0] === undefined) {
        a[i0] = [];
    }
    a[i0][i1] = v;
}

const draw = (p: number) => {
    switch (Number(p)) {
        case 0: return '#';
        case 1: return ' ';
        case 2: return 'x';
    }
};

const logField = () => {
    console.log(field.reduce((pc, c) => c.map((p, i) => (pc[i] || '') + draw(p)), [] as string[]).join('\n'));
};

const rot = (d: number) => {
    if (d === 1) return 4;
    else if (d === 4) return 2;
    else if (d === 2) return 3;
    else return 1;
};

const mov = (nd: number, x: number, y: number) => {
    if (nd === 1) return [x, y - 1];
    else if (nd === 4) return [x + 1, y];
    else if (nd === 2) return [x, y + 1];
    else return [x - 1, y];
};

async function* getIns() {
    let x = 0, y = 0;
    let d = 1;

    const route: number[] = [];
    let back = false;
    while (true) {
        if (back) {
            if (r !== 1) {
                console.log('WTF', x, y, r, d);
            } else {
                [x, y] = mov(rot(rot(d)), x, y);
                console.log('bspc', x, y);
            }
            back = false;
        } else {
            if (r === 0) {
                const [wx, wy] = mov(d, x, y);
                setField(Number(wx), Number(wy), r);
                console.log('wall', wx, wy);
            } else {
                [x, y] = mov(d, x, y);
                route.push(d);
                setField(Number(x), Number(y), r);
                console.log('spce', x, y);
            }
            if (r === 2) {
                console.log('done', x, y);
                break;
            }
        }

        let i: number;
        for (i = 0; i < 4; i += 1) {
            const [nx, ny] = mov(d, x, y);
            if (getField(nx, ny) === undefined) {
                console.log('go', d);
                yield BigInt(d);
                break;
            }
            d = rot(d);
        }
        if (i === 4) {
            const d = route.pop();
            console.log('back', d);
            yield BigInt(rot(rot(d)));
            back = true;
        }
    }
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    const vm = new Vm(0, mem);

    for await (const out of vm.run(getIns())) {
        reply = Number(out);
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
