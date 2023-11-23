import fs from 'fs/promises';

console.log((await fs.readFile('input', 'utf8'))
    .trimEnd().split(/\r?\n/).map(r => r.trim().split(/\s+/).map(Number))
    .map((_, i, a) => [a[i - (i % 3)][i % 3], a[i + 1 - (i % 3)][i % 3], a[i + 2 - (i % 3)][i % 3]])
    .map(([a, b, c]) => a + b > c && a + c > b && b + c > a)
    .filter(x => x).length);
