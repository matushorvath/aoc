import { promises as fs } from 'fs';

const set = (field: string[][], pos: { x: number, y: number }, value: string = '.') => {
    if (field[pos.x] === undefined) field[pos.x] = [];
    field[pos.x][pos.y] = value;
};

const logField = (field: string[][]) => {
    const xmin = Math.min(...Object.keys(field).map(x => Number(x)));
    const xmax = Math.max(...Object.keys(field).map(x => Number(x)));

    const ymin = Math.min(...Object.values(field.map(y => Math.min(...Object.keys(y).map(x => Number(x))))));
    const ymax = Math.max(...Object.values(field.map(y => Math.max(...Object.keys(y).map(x => Number(x))))));

    console.log(xmin, xmax, ymin, ymax);

    for (let y = ymax - ymin; y >= 0; y -= 1) {
        let line = '';
        for (let x = 0; x <= xmax - xmin; x += 1) {
            const value = field[xmin + x][ymin + y];
            line = line + (value || ' ');
        }
        console.log(line);
    }
};

const main = async () => {
    const input = await fs.readFile('input.txt', 'utf8');
    //const input = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83';
    //const input = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
    //const input = 'R8,U5,L5,D3\nU7,R6,D4,L4';
    const data = input.split(/\r?\n/).map(line => line.split(',').map(s => {
        const l = Number(s.slice(1));
        switch (s[0]) {
            case 'U': return { x: 0, y: 1, l };
            case 'D': return { x: 0, y: -1, l };
            case 'R': return { x: 1, y: 0, l};
            case 'L': return { x: -1, y: 0, l };
        }
    }));

    //console.log(data);

    const field: string[][] = [];

    let pos = { x: 0, y: 0 };
    set(field, pos, 'o');

    for (const inst of data[0]) {
        for (let delta = 0; delta < inst.l; delta += 1) {
            pos.x = pos.x + inst.x;
            pos.y = pos.y + inst.y;
            set(field, pos);
        }
    }

    //logField(field);

    const ints = [];
    pos = { x: 0, y: 0 }
    for (const inst of data[1]) {
        for (let delta = 0; delta < inst.l; delta += 1) {
            pos.x = pos.x + inst.x;
            pos.y = pos.y + inst.y;

            if (field[pos.x] !== undefined && field[pos.x][pos.y] === '.') {
                set(field, pos, 'x');
                ints.push({ ...pos });
            } else {
                set(field, pos, ',');
            }
        }
    }

    //logField(field);

    //console.log('ints', ints);

    let minint = { l: 0, ...ints[0] };
    minint.l = Math.abs(minint.x) + Math.abs(minint.y);

    for (const int of ints) {
        const intl = Math.abs(int.x) + Math.abs(int.y);
        if (intl < minint.l) {
            minint = { l: intl, ...int };
        }
    }

    console.log('out', minint);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
