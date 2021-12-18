import fs from 'fs/promises';

const b2n = (bits) => bits.reduce((p, c) => 2 * p + c, 0);

const parse = (packet) => {
    const bits = packet
        .split('')
        .map(ch => parseInt(ch, 16))
        .flatMap(n => [n / 8, (n % 8) / 4, (n % 4) / 2, n % 2])
        .map(Math.floor);

    return read(bits, 0, 0);
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

const read = (bits, idx) => {
    const version = b2n(bits.slice(idx, idx+3));
    const type = b2n(bits.slice(idx+3, idx+6));
    idx += 6;

    if (type === 4) {
        const number = [];
        do {
            number.push(...bits.slice(idx+1, idx+5));
            idx += 5;
        } while (bits[idx-5] === 1);
        return [idx, b2n(number)];
    } else if (bits[idx] === 0) {
        const len = b2n(bits.slice(idx+1, idx+1+15));
        idx += 1+15;

        const args = [];
        const imx = idx + len;
        while (idx < imx) {
            const [nidx, arg] = read(bits, idx);
            args.push(arg);
            idx = nidx;
        }
        return [idx, op(type, ...args)];
    } else {
        const num = b2n(bits.slice(idx+1, idx+1+11));
        idx += 1+11;

        const args = [];
        for (let j = 0; j < num; j++) {
            const [nidx, arg] = read(bits, idx);
            args.push(arg);
            idx = nidx;
        }
        return [idx, op(type, ...args)];
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd();

    const packets = [
        ['C200B40A82', 40, 3],
        ['04005AC33890', 44, 54],
        ['880086C3E88112', 55, 7],
        ['CE00C43D881120', 51, 9],
        ['D8005AC2A8F0', 44, 1],
        ['F600BC2D8F', 40, 0],
        ['9C005AC2F8F0', 44, 0],
        ['9C0141080250320F1802104A08', 102, 1],
        [data, 5598, 96257984154]
    ];

    for (const [packet, ...expected] of packets) {
        const actual = parse(packet);
        const equal = actual.length === expected.length
            && actual.reduce((p, c, i) => p && c === expected[i], true);

        console.log(equal, actual);
    }
};

await main();
