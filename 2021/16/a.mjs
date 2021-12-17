import fs from 'fs/promises';

const expand = (p) => {
    return p.split('').flatMap(ch => parseInt(ch, 16).toString(2).padStart(4, '0').split('').map(Number));
};

const b2n = (b) => parseInt(b.join(''), 2);

const parse = (p) => {
    const b = expand(p);

    return read(b, 0, 0);
};

const read = (b, i) => {
    const ver = b2n(b.slice(i, i+3));
    // console.log('v', ver);
    const type = b.slice(i+3, i+6).join('');
    // console.log('t',type);
    i += 6;

    if (type === '100') {
        // console.log('lit')
        // Literal
        const number = [];
        while (true) {
            number.push(...b.slice(i+1, i+5));
            i += 5;
            if (b[i-5] === 0) break;
        }
        return [i, b2n(number), ver];
    } else {
        const mode = b[i];
        if (mode === 0) {
            const len = b2n(b.slice(i+1, i+1+15));
            // console.log('len', len)
            i += 1+15;

            const out = [];
            let vertotal = ver;
            const imx = i + len;
            while (i < imx) {
                const [ni, res, ver] = read(b, i);
                i = ni;
                out.push(res);
                vertotal += ver;
            }
            return [i, out, vertotal];
        } else {
            const num = b2n(b.slice(i+1, i+1+11));
            // console.log('num', num)
            i += 1+11;

            const out = [];
            let vertotal = ver;
            for (let j = 0; j < num; j++) {
                const [ni, res, ver] = read(b, i);
                i = ni;
                out.push(res);
                vertotal += ver;
            }
            return [i, out, vertotal];
        }
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd();

    const ps = [
        // 'D2FE28',                    // literal 011111100101, dec 2021
        // '38006F45291200',            // 2 sub 10 20
        // 'EE00D40C823060',            // 3 sub 1 2 3
        '8A004A801A8002F478',        // op -> op -> lit sum 16
        '620080001611562C8802118E34',
        'C0015000016115A2E0802F182340',
        'A0016C880162017C3686B18A3D4780',
        d
    ];

    for (const p of ps) {
        console.log(JSON.stringify(parse(p)));
    }

    //console.log(d);
};

await main();
