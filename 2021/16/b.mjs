import fs from 'fs/promises';

const expand = (p) => {
    return p.split('').flatMap(ch => parseInt(ch, 16).toString(2).padStart(4, '0').split('').map(Number));
};

const b2n = (b) => parseInt(b.join(''), 2);

const parse = (p) => {
    const b = expand(p);

    return read(b, 0, 0);
};

const op = (type, ...args) => {
    switch (type) {
        case 0:
            return args.reduce((p, c) => p+c, 0);
        case 1:
            return args.reduce((p, c) => p*c, 1);
        case 2:
            return Math.min(...args);
        case 3:
            return Math.max(...args);
        case 5:
            return args[0] > args[1] ? 1 : 0;
        case 6:
            return args[0] < args[1] ? 1 : 0;
        case 7:
            return args[0] === args[1] ? 1 : 0;
    }
};

const read = (b, i) => {
    const type = b2n(b.slice(i+3, i+6));
    // console.log('t',type);
    i += 6;

    if (type === 4) {
        // console.log('lit')
        // Literal
        const number = [];
        while (true) {
            number.push(...b.slice(i+1, i+5));
            i += 5;
            if (b[i-5] === 0) break;
        }
        return [i, b2n(number)];
    } else {
        const mode = b[i];
        if (mode === 0) {
            const len = b2n(b.slice(i+1, i+1+15));
            // console.log('len', len)
            i += 1+15;

            const out = [];
            const imx = i + len;
            while (i < imx) {
                const [ni, res] = read(b, i);
                i = ni;
                out.push(res);
            }
            return [i, op(type, ...out)];
        } else {
            const num = b2n(b.slice(i+1, i+1+11));
            // console.log('num', num)
            i += 1+11;

            const out = [];
            for (let j = 0; j < num; j++) {
                const [ni, res] = read(b, i);
                i = ni;
                out.push(res);
            }
            return [i, op(type, ...out)];
        }
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd();

    const ps = [
        'C200B40A82', // finds the sum of 1 and 2, resulting in the value 3.
        '04005AC33890', // finds the product of 6 and 9, resulting in the value 54.
        '880086C3E88112', // finds the minimum of 7, 8, and 9, resulting in the value 7.
        'CE00C43D881120', // finds the maximum of 7, 8, and 9, resulting in the value 9.
        'D8005AC2A8F0', // produces 1, because 5 is less than 15.
        'F600BC2D8F', // produces 0, because 5 is not greater than 15.
        '9C005AC2F8F0', // produces 0, because 5 is not equal to 15.
        '9C0141080250320F1802104A08', // produces 1, because 1 + 3 = 2 * 2.
        d
    ];

    for (const p of ps) {
        console.log(JSON.stringify(parse(p)));
    }

    //console.log(d);
};

await main();
