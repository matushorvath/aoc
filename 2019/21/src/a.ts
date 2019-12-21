import { promises as fs, exists } from 'fs';
import { Vm } from './vm-a';

let vm: Vm;

async function* getIns() {
    const inputs = `
NOT A J
NOT C T
AND D T
OR T J
WALK
`.trim().split(/\r?\n/);
    console.log('inputs', inputs);

    for (const input of inputs) {
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
