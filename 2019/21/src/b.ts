import { promises as fs } from 'fs';
import { Mem, Vm } from './vm-b';

let vm: Vm;

// https://www.charlie-coleman.com/experiments/kmap/
// f <= (i or h or f) and (h or e) and (d) and (not c or not b or not a);
// f <= (i or h or f) and (h or e) and (d) and not (c and b and a);

async function* getIns() {
    const inputs = `
OR A T
AND B T
AND C T
NOT T J

AND D J

NOT H T
NOT T T
OR E T
AND T J

NOT I T
NOT T T
OR H T
OR F T
AND T J

RUN
`.trim().split(/\r?\n/);
    console.log('inputs', inputs);

    for (const input of inputs.filter(i => i !== '' && !i.startsWith('#'))) {
        for (const char of input.split('')) {
            yield BigInt(char.charCodeAt(0));
        }
        yield BigInt('\n'.charCodeAt(0));
    }
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };
    const vm = new Vm(0, mem);

    let line: string[] = [];

    for await (const a of vm.run(getIns())) {
        if (a === BigInt(10)) {
            console.log(line.join(''));
            line = [];
        } else if (a > BigInt(127)) {
            console.log('output', a);
        } else {
            line.push(String.fromCharCode(Number(a)));
        }
    }
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));

/*

x..xx..x.
abcdefghi

*/