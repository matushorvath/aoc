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

    console.log(x0, x1, x2, x3);
    console.log(y0, y1, y2, y3);
    console.log(data.map(l => l.map(p => ('  ' + p).slice(-2)).join(',')).join('\n'));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
