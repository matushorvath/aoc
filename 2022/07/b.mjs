'use strict';

import { dir } from 'console';
import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example.1', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/);

    const root = { parent: undefined, dirs: {}, files: {} };
    let curr = root;

    for (let i = 0; i < d.length; i++) {
        const line = d[i];

        const cmd = line.substring(2, 4);
        if (cmd === 'cd') {
            const where = line.substring(5);
            if (where === '/') {
                curr = root;
            } else if (where === '..') {
                curr = curr.parent;
            } else {
                if (!curr.dirs[where]) curr.dirs[where] = { parent: curr, dirs: {}, files: {} };
                curr = curr.dirs[where];
            }
        } else {
            while (d[i + 1] && d[i + 1][0] !== '$') {
                i++;
                const out = d[i];
                const m = out.match(/(.+) (.+)/);
                if (m[1] === 'dir') {
                    if (!curr.dirs[m[2]]) curr.dirs[m[2]] = { parent: curr, dirs: {}, files: {} };
                } else {
                    if (!curr.files[m[2]]) curr.files[m[2]] = Number(m[1]);
                }
            }
        }
    }
{
    let stack1 = [root];
    let stack2 = [];
    while (stack1.length > 0) {
        const dir = stack1.pop()
        stack2.push(dir, ...Object.values(dir.dirs));
        stack1.push(...Object.values(dir.dirs));
    }

    while (stack2.length > 0) {
        const dir = stack2.pop();
        dir.totalSize =
            Object.values(dir.files).reduce((ts, fs) => ts + fs, 0)
            + Object.values(dir.dirs).reduce((ts, d) => ts + d.totalSize, 0);
    }
}

{
    let stack = [[root, '/', 0, 0]];
    while (stack.length > 0) {
        const [dir, name, size, indent] = stack.pop()
        console.log('  '.repeat(indent) + name + ' ' + size + ' ts: ' + dir?.totalSize);
        if (dir) {
            stack.push(...Object.entries(dir.dirs).map(([n, d]) => [d, n, 0, indent + 1]));
            stack.push(...Object.entries(dir.files).map(([n, s]) => [undefined, n, s, indent + 1]));
        }
    }
}

    const freeSpace = 70000000 - root.totalSize;
    const needDelete = 30000000 - freeSpace;

    let currentDelete = 70000000;

{
    let stack = [root];
    while (stack.length > 0) {
        const dir = stack.pop()
        if (dir.totalSize >= needDelete && dir.totalSize < currentDelete) currentDelete = dir.totalSize;
        stack.push(...Object.values(dir.dirs));
    }
}

    console.log(currentDelete);
};

await main();
