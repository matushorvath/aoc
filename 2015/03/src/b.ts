import { promises as fs } from 'fs';

const inc = (field: number[][], pos: { x: number, y: number }) => {
    if (field[pos.x] === undefined) field[pos.x] = [];
    if (field[pos.x][pos.y] === undefined) field[pos.x][pos.y] = 0;
    field[pos.x][pos.y] = field[pos.x][pos.y] + 1;
};

const logField = (field: number[][]) => {
    const xmin = Math.min(...Object.keys(field).map(x => Number(x)));
    const xmax = Math.max(...Object.keys(field).map(x => Number(x)));

    const ymin = Math.min(...Object.values(field.map(y => Math.min(...Object.keys(y).map(x => Number(x))))));
    const ymax = Math.max(...Object.values(field.map(y => Math.max(...Object.keys(y).map(x => Number(x))))));

    console.log(xmin, xmax, ymin, ymax);

    for (let y = ymax - ymin; y >= 0; y -= 1) {
        let line = '';
        for (let x = 0; x <= xmax - xmin; x += 1) {
            const value = field[xmin + x][ymin + y];
            line = line + (value ? ('00000' + value).slice(-2) + ' ' : '   ');
        }
        console.log(line);
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '>';
    const data = input.split('').map(char => {
        switch (char) {
            case '^': return { x: 0, y: 1 };
            case 'v': return { x: 0, y: -1 };
            case '>': return { x: 1, y: 0 };
            case '<': return { x: -1, y: 0 };
        }
    });

    console.log(data);

    const field: number[][] = [];

    let current = 0;
    const pos = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    inc(field, pos[0]);
    inc(field, pos[1]);

    for (const inst of data) {
        pos[current].x = pos[current].x + inst.x;
        pos[current].y = pos[current].y + inst.y;

        inc(field, pos[current]);
        current = (current + 1) % 2;
    }

    logField(field);

    console.log(Object.values(field).reduce((rt, rv) => rt + Object.values(rv).reduce((ct, cv) => cv > 0 ? ct + 1 : ct, 0), 0));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
