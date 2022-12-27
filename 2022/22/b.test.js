const { run } = require('./b.js');

const makeinput = (...points) => {
    const map = [];

    for (let x = 0; x < 200; x++) {
        map[x] = [];
        const [ymn, ymx] =
            x >= 0 && x < 50 ? [50, 150] :
            x >= 50 && x < 100 ? [50, 100] :
            x >= 100 && x < 150 ? [0, 100] :
            x >= 150 && x < 200 ? [0, 50] : undefined;

        for (let y = 0; y < ymx; y++) {
            map[x][y] = y >= ymn ? '.' : ' ';
        }
    }

    for (const point of points) {
        map[point[0]][point[1]] = '#';
    }

    return map;
};

const print = map => console.log(map.map(r => r.join('')).join('\n'));

test('Counts steps correctly', async () => {
    await expect(run(makeinput(), [13])).resolves.toStrictEqual([{ x: 0, y: 63 }, { x: 0, y: 1 }]);
});

test('Hits a wall and stops', async () => {
    await expect(run(makeinput([0, 60]), [13])).resolves.toStrictEqual([{ x: 0, y: 59 }, { x: 0, y: 1 }]);
});

test('Turns right', async () => {
    await expect(run(makeinput(), ['R', 13])).resolves.toStrictEqual([{ x: 13, y: 50 }, { x: 1, y: 0 }]);
});

test('Turns left', async () => {
    await expect(run(makeinput(), ['R', 13, 'L', 6])).resolves.toStrictEqual([{ x: 13, y: 56 }, { x: 0, y: 1 }]);
});

test.each(['L', 'R'])('Turns 180 for X and %s', async (dir) => {
    await expect(run(makeinput(), ['R', 13, dir, dir, 4])).resolves.toStrictEqual([{ x: 9, y: 50 }, { x: -1, y: 0 }]);
});

test.each(['L', 'R'])('Turns 180 for Y and %s', async (dir) => {
    await expect(run(makeinput(), [13, dir, dir, 4])).resolves.toStrictEqual([{ x: 0, y: 59 }, { x: 0, y: -1 }]);
});

test('Wraps around for scenario 1', async () => {
    await expect(run(makeinput(), [13, 'L', 1])).resolves.toStrictEqual([{ x: 163, y: 0 }, { x: 0, y: 1 }]);
});
