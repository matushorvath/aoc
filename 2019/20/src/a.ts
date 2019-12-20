import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input-a1', 'utf8');
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

    for (let x = x0 + 1; x < x3; x += 1) {
        data[x][y0] = data[x][y0 - 1] + data[x][y0];
        data[x][y0 - 1] = ' ';
        data[x][y3] = data[x][y3] + data[x][y3 + 1];
        data[x][y3 + 1] = ' ';
    }
    for (let x = x1 + 1; x < x2; x += 1) {
        data[x][y1] = data[x][y1] + data[x][y1 + 1];
        data[x][y1 + 1] = ' ';
        data[x][y2] = data[x][y2 - 1] + data[x][y2];
        data[x][y2 - 1] = ' ';
    }
    for (let y = y0 + 1; y < y3; y += 1) {
        data[x0][y] = data[x0 - 1][y] + data[x0][y];
        data[x0 - 1][y] = ' ';
        data[x3][y] = data[x3][y] + data[x3 + 1][y];
        data[x3 + 1][y] = ' ';
    }
    for (let y = y1 + 1; y < y2; y += 1) {
        data[x1][y] = data[x1][y] + data[x1 + 1][y];
        data[x1 + 1][y] = ' ';
        data[x2][y] = data[x2 - 1][y] + data[x2][y];
        data[x2 - 1][y] = ' ';
    }

    console.log(data.map(l => l.map(p => ('  ' + p).slice(-2)).join(',')).join('\n'));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
