import fs from 'fs/promises';

const check = (B: number, X: number, Y: number, hits: Set<string>) => {
    for (let b = 0; b < B; b++) {
        for (let x = 0; x < X; x++) {
            for (let y = 0; y < Y; y++) {
                if (!hits.has([b, x, y].toString())) break;
                if (y === Y - 1) return b;
            }
        }
        for (let y = 0; y < Y; y++) {
            for (let x = 0; x < X; x++) {
                if (!hits.has([b, x, y].toString())) break;
                if (x === X - 1) return b;
            }
        }
    }
};

const score = (num: number, X: number, Y: number, boards: number[][][], hits: Set<string>, b: number) => {
    let sum = 0;
    for (let x = 0; x < X; x++) {
        for (let y = 0; y < Y; y++) {
            if (!hits.has([b, x, y].toString())) sum += boards[b][x][y];
        }
    }
    return sum * num;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.split(/\r?\n/);

    const nums = d[0].split(',').map(Number);

    const boards = d.slice(2).reduce((p: any, c) =>
        c === '' ?
            { r: [...p.r, p.c], c: [] } :
            { r: p.r, c: [...p.c, c.trim().split(/ +/).map(Number)] },
        { r:[], c:[] }
    ).r;

    const locs: string[][] = [];

    for (let b = 0; b < boards.length; b++) {
        for (let x = 0; x < boards[b].length; x++) {
            for (let y = 0; y < boards[b][x].length; y++) {
                if (!locs[boards[b][x][y]]) locs[boards[b][x][y]] = [[b, x, y].toString()];
                else locs[boards[b][x][y]].push([b, x, y].toString());
            }
        }
    }

    const hits = new Set<string>();

    for (const num of nums) {
        for (const loc of locs[num]) {
            hits.add(loc);
        }

        const res = check(boards.length, 5, 5, hits);
        if (res) {
            console.log(score(num, 5, 5, boards, hits, res));
            break;
        }
    }

    //console.log(locs, hits);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
