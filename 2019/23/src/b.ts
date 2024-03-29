import { promises as fs } from 'fs';
import { Vm } from './vm-b';

type Queue = [bigint, bigint][];
type Item = { vm: Vm, q: Queue, idle: boolean };

const data: Item[] = [];

const natys = new Set<number>();
let nat: [bigint, bigint];
let quit = false;

async function* getIns(d: Item) {
    yield BigInt(d.vm.id);

    while (!quit) {
        if (d.q.length === 0) {
            //console.log('in', d.vm.id, -1);

            if (nat && data.every(d => d.idle && d.q.length === 0)) {
                //console.log('---------------> idle', d.vm.id, nat);
                //console.log('ips', data.map(d => d.vm.ip));
                data[0].q.push(nat);

                if (natys.has(Number(nat[1]))) {
                    console.log('dup nat y', nat[1]);
                    quit = true;
                }
                natys.add(Number(nat[1]));
            }

            d.idle = true;
            yield -1n;
        } else {
            const [x, y] = d.q.shift();
            d.idle = false;

            //console.log('in', d.vm.id, [x, y]);

            yield x;
            yield y;
        }
    }
}

const runVm = async (d: Item) => {
    let outs: bigint[] = [];

    for await (const out of d.vm.run(getIns(d))) {
        outs.push(out);

        if (outs.length === 3) {
            //console.log('out', d.vm.id, outs);

            const [abi, x, y] = outs;
            outs = [];

            const a = Number(abi);
            if (a === 255) {
                //console.log('---------------> nat', d.vm.id, [x, y]);
                nat = [x, y];
            } else {
                data[a].q.push([x, y]);
            }
        }
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');

    const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {}) as { [addr: string]: bigint };

    for (let i = 0; i < 50; i += 1) {
        data.push({
            vm: new Vm(i, { ...mem }),
            q: [],
            idle: false
        });
    }

    await Promise.all(data.map(d => runVm(d)));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
