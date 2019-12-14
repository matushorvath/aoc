import { promises as fs } from 'fs';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
//     const input = `10 ORE => 10 A
//     1 ORE => 1 B
//     7 A, 1 B => 1 C
//     7 A, 1 C => 1 D
//     7 A, 1 D => 1 E
//     7 A, 1 E => 1 FUEL
// `;
// const input = `9 ORE => 2 A
// 8 ORE => 3 B
// 7 ORE => 5 C
// 3 A, 4 B => 1 AB
// 5 B, 7 C => 1 BC
// 4 C, 1 A => 1 CA
// 2 AB, 3 BC, 4 CA => 1 FUEL
// `;

    const eqs = input.trimRight().split(/\r?\n/)
        .map(l => l.split('=>'))
        .map(l => ({
            ins: l[0]
                .split(',')
                .map(c => c.match(/([0-9]+) ([A-Z]+)/))
                .map(c => ({ qty: Number(c[1]), chm: c[2] })),
            outm: l[1]
                .match(/([0-9]+) ([A-Z]+)/)
        }))
        .map(l => ({ ins: l.ins, out: ({ qty: Number(l.outm[1]), chm: l.outm[2] })}));

    //console.log(JSON.stringify(eqs, null, 2));

    const srcs: { [chm: string]: any } = {};

    for (const eq of eqs) {
        srcs[eq.out.chm] = eq;
    }

    make(998536, 'FUEL', srcs);

    console.log('ORE', ore, Math.log10(ore));
};

const extra: { [chm: string]: any } = {};
let ore = 0;

const make = (qty: number, out: string, eqs: { [chm: string]: any }) => {
    //console.log(`make ${qty} of ${out}`);
    if (out !== 'ORE') {
        const eq = eqs[out];

        if (qty > (extra[out] || 0)) {
            const mul = Math.ceil((qty - (extra[out] || 0)) / eq.out.qty);
            extra[out] = (extra[out] || 0) + mul * eq.out.qty - qty;
            //console.log(`    need ${mul} copies (extra ${extra[out]})`);
            for (const inn of eqs[out].ins) {
                make(mul * inn.qty, inn.chm, eqs);
            }
        } else {
            //console.log(`    using extra`);
            extra[out] -= qty;
        }
    } else {
        ore += qty;
    }
    //console.log(`done ${qty} of ${out}\n`);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
