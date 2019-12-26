import { promises as fs } from 'fs';
import { Vm } from './vm-a';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const boot = [
    'west',
    'west',
    'west',
    'take hologram',
    'east',
    'east',
    'east',
    'south',
    'take fixed point',
    'north',
    'north',
    'take candy cane',
    'west',
    'take antenna',
    'west',
    'take shell',
    // 'west',
    // 'take escape pod',
    // 'east',
    // 'south',
    // 'take giant electromagnet',
    // 'north',
    'east',
    'south',
    'take whirled peas',
    'north',
    'east',
    'north',
    'north',
    'take polygon',
    'south',
    'west',
    'take fuel cell',
    'west',
    'inv',
];

const inv = [
    'hologram',
    'fixed point',
    'candy cane',
    'antenna',
    'shell',
    'whirled peas',
    'polygon',
    'fuel cell',
];

async function* getAnswers() {
    for (const answer of boot) {
        yield answer;
    }

    let was = 255;
    for (let shouldBe = 255; shouldBe >= 0; shouldBe -= 1) {
        for (let i = 0; i < 8; i += 1) {
            if ((shouldBe & (1 << i)) && !(was & (1 << i)) ) yield `take ${inv[i]}`;
            if (!(shouldBe & (1 << i)) && (was & (1 << i)) ) yield `drop ${inv[i]}`;
        }
        yield 'west';
        was = shouldBe;
    }

    yield await new Promise<string>(resolve => rl.question('', resolve));
}

async function* getIns() {
    for await (const answer of getAnswers()) {
        console.log(answer);
        for (const char of answer) {
            yield BigInt(char.charCodeAt(0));
        }
        yield 10n;
    }
}

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };

    const vm = new Vm(0, mem);

    let line: string[] = [];
    for await (const char of vm.run(getIns())) {
        if (char === 10n) {
            console.log(line.join(''));
            line = [];
        } else {
            line.push(String.fromCharCode(Number(char)));
        }
    };
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
