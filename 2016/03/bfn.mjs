import fs from 'fs/promises';

console.log((await fs.readFile('input', 'utf8'))
    .trim().split(/\s+/).map(Number)
    .reduce((p, c) => p.slice(-1)[0]?.length === 9 ? [...p, [c]] : [...p.slice(0, -1), [...p.slice(-1)?.[0] ?? [], c]], [])
    .flatMap(a => [[a[0], a[3], a[6]], [a[1], a[4], a[7]], [a[2], a[5], a[8]]])
    .map(([a, b, c]) => a + b > c && a + c > b && b + c > a)
    .filter(x => x).length);
