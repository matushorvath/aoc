import { promises as fs } from 'fs';

const getFn = (op: string) => {
    switch (op) {
        case undefined: return (o1: number) => o1;
        case 'AND': return (o1: number, o2: number) => (o1 & o2) & 0xffff;
        case 'OR': return (o1: number, o2: number) => (o1 | o2) & 0xffff;
        case 'LSHIFT': return (o1: number, o2: number) => (o1 << o2) & 0xffff;
        case 'RSHIFT': return (o1: number, o2: number) => (o1 >>> o2) & 0xffff;
        case 'NOT': return (o1: number) => ~o1 & 0xffff;
        default: throw new Error('invalid op');
    }
};

const ops: { [wire: string]: { fn: (...ops: number[]) => number, ps: string[] } } = {};
const values: { [wire: string]: number } = {};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const wires = ['a'];

    /*const wires = ['x', 'y', 'd', 'e', 'f', 'g', 'h', 'i'];
    const input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;*/

    const lines = input.trimRight().split(/\r?\n/);

    for (const line of lines) {
        const m = line.match(/([a-z0-9]+) -> ([a-z0-9]+)|([a-z0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z0-9]+) -> ([a-z0-9]+)|(NOT) ([a-z0-9]+) -> ([a-z0-9]+)/);

        if (m[1] && m[2]) {
            ops[m[2]] = {
                fn: getFn(undefined),
                ps: [m[1]]
            };
        } else if (m[3] && m[4] && m[5] && m[6]) {
            ops[m[6]] = {
                fn: getFn(m[4]),
                ps: [m[3], m[5]]
            };
        } else if (m[7] && m[8] && m[9]) {
            ops[m[9]] = {
                fn: getFn(m[7]),
                ps: [m[8]]
            };
        }
    }

    console.log(ops);

    console.log(wires.sort().map(w => `${w} = ${exec(w)}`));
};

const exec = (wire: string) => {
    const num = Number(wire);
    if (!isNaN(num)) {
        return num;
    } else {
        if (!values[wire]) {
            values[wire] = ops[wire].fn(...ops[wire].ps.map(exec));
        }
        return values[wire];
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
