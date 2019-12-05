import { promises as fs } from 'fs';

const getOp = (s: string) => {
    switch (s) {
        case 'turn on': return (v: number) => v + 1;
        case 'turn off': return (v: number) => v ? v - 1 : v;
        case 'toggle': return (v: number) => v + 2;
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = 'toggle 0,0 through 999,999';
    const lines = input.trimRight().split(/\r?\n/);

    const field = Array.from({ length: 1000 }, () => Array.from({ length: 1000 }, () => 0));

    for (const line of lines) {
        const m = line.match(/(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/);

        const op = getOp(m[1]);
        const x1 = Math.min(Number(m[2]), Number(m[4]));
        const x2 = Math.max(Number(m[2]), Number(m[4]));
        const y1 = Math.min(Number(m[3]), Number(m[5]));
        const y2 = Math.max(Number(m[3]), Number(m[5]));
        //console.log(x1, x2, y1, y2);

        for (let x = x1; x <= x2; x += 1) for (let y = y1; y <= y2; y += 1) {
            //console.log(x, y, field[x][y]);
            field[x][y] = op(field[x][y]);
            //console.log(x, y, field[x][y]);
        }

        //console.log(field[0], field[999]);
    }

    console.log(field.reduce((px, cx) => px + cx.reduce((py, cy) => py + cy, 0), 0));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
