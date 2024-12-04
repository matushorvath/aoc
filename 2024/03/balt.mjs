import fs from 'fs/promises';

console.log([
    ...(await fs.readFile('input', 'utf8'))
        .trimEnd()
        .replaceAll(/don't\(\).*?do\(\)/g, '')
        .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
    ].map(i => Number(i[1])*Number(i[2])).reduce((p, c) => p + c, 0)
);
