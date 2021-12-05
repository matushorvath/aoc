import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/(f|d|u).* ([0-9]+)/);
        return { dir: m[1], len: Number(m[2]) };
    });

    let dep = 0;
    let pos = 0;
    let aim = 0;

    for (const i of d) {
        switch (i.dir) {
            case 'f': pos += i.len; dep += aim * i.len; break;
            case 'u': aim -= i.len; break;
            case 'd': aim += i.len; break;
        }
    }

    console.log(dep * pos);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
