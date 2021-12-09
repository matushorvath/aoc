import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(',').map(Number);

    const mn = Math.min(...data);
    const mx = Math.max(...data);

    let minf = Infinity;
    let pos = NaN;

    for (let i = mn; i <= mx; i++) {
        const fuel = data.reduce((f, p) => f + (1 + Math.abs(p - i)) * (Math.abs(p - i) / 2), 0);
        if (fuel < minf) {
            pos = i;
            minf = fuel;
        }
    }

    console.log(pos, minf);
};

await main();
