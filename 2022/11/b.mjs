'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let data = input.trimEnd().split(/\r?\n\r?\n/);

    const monkeys = [];

    for (const monkey of data) {
        const m = monkey.match(/Monkey (\d):\n  Starting items: (.+)\n  Operation: (.+)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d)\n    If false: throw to monkey (\d)/);
        const [, id, items, op, test, tid, fid] = m;

        const op_renamed = op.replaceAll('new', 'neues');

        monkeys[id] = {
            id: Number(id),
            items: items.split(', ').map(Number),
            op: old => { let neues; eval(op_renamed); return neues; },
            test: Number(test),
            target: {
                true: Number(tid),
                false: Number(fid)
            },
            inspects: 0
        };
    }

    const mod = [...new Set(monkeys.map(m => m.test))].reduce((p, c) => p * c, 1);

    for (let round = 0; round < 10000; round++) {
        for (const monkey of monkeys) {
            //console.log('Monkey ', monkey.id);

            let item;
            while (item = monkey.items.shift()) {
                //console.log('  Inspect ', item);

                item = monkey.op(item);
                //console.log('    Increase to ', item);

                item = item % mod;
                //console.log('    Reduce to ', item);

                const res = item % monkey.test === 0;
                //console.log('    Test is ', res);

                monkeys[monkey.target[res]].items.push(item);
                //console.log('    Throw to ', monkey.target[res]);

                monkey.inspects++;
            }
        }
    }

    const sorted = monkeys.sort((a, b) => b.inspects - a.inspects);
    console.log(sorted[0].inspects * sorted[1].inspects);
    //console.log(sorted.map(m => m.inspects));
};

await main();
