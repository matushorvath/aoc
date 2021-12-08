import fs from 'fs/promises';

const intersect = function(a: Set<string>, b: Set<string>) { return new Set([...a].filter(x => b.has(x))); }

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.trim().split('|')
        .map(s => s.trim().split(' ').map(d => new Set(d.split('').sort()))));

    let sum = 0;

    for (const [digits, outputs] of data) {
        const ds: Set<string>[] = [];
        ds[1] = digits.find(d => d.size === 2);
        ds[7] = digits.find(d => d.size === 3);
        ds[4] = digits.find(d => d.size === 4);
        const d235 = digits.filter(d => d.size === 5);
        const d069 = digits.filter(d => d.size === 6);
        ds[8] = digits.find(d => d.size === 7);

        ds[3] = d235.find(d => intersect(d, ds[1]).size === 2);
        const d25 = d235.filter(d => d !== ds[3]);

        ds[2] = d25.find(d => intersect(d, ds[4]).size === 2);
        ds[5] = d25.find(d => d !== ds[2]);

        ds[6] = d069.find(d => intersect(d, ds[1]).size === 1);
        const d09 = d069.filter(d => d !== ds[6]);

        ds[0] = d09.find(d => intersect(d, ds[4]).size === 3);
        ds[9] = d09.find(d => d !== ds[0]);

        const dstrs = ds.map(d => [...d].sort().join(''));

        const nums: number[] = [];
        for (const output of outputs) {
            const outstr = [...output].sort().join('');
            nums.push(dstrs.findIndex(dstr => dstr === outstr));
        }

        sum += Number(nums.join(''));
    }

    console.log(sum);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
