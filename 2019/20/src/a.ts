import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input-a1', 'utf8');
    let data = input.slice(0, -1).split(/\r?\n/).map(l => l.split(''));

    data[1] = data[0].map((_, i) => data[0][i] + data[1][i]);

    const s = data.length - 1;
    data[s - 1] = data[s].map((_, i) => data[s - 1][i] + data[s][i]);

    data = data.slice(1, -1);
    data = data.map(l => [l.slice(0, 2).join(''), ...l.slice(2, -2), l.slice(-2).join('')]);

    const f = data[Math.trunc(data.length / 2)].findIndex(p => p === ' ');
    data = data.map(l => l
    const e = data[0].length - [...data[Math.trunc(data.length / 2)]].reverse().findIndex(p => p === ' ') - 1;

    const t = data.findIndex(l => l.some(p => p === ' '));
    data[t] = data[t].map((p, i) => p.match(/^[A-Z]$/) ? data[t][i] + data[t + 1][i] : p);
    data[t + 1] = data[t + 1].map((p, i) => p.match(/^[A-Z]$/) ? '' : p);

    const b = data.length - [...data].reverse().findIndex(l => l.some(p => p === ' ')) - 1;
    data[b] = data[b].map((p, i) => p.match(/^[A-Z]$/) ? data[b - 1][i] + data[b][i] : p);
    data[b - 1] = data[b - 1].map((p, i) => p.match(/^[A-Z]$/) ? '' : p);

    data = data.map(l => l.map(p => p.trim()));

    console.log(data.map(l => l.map(p => ('  ' + p).slice(-2)).join(',')).join('\n'));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
