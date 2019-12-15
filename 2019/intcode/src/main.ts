import { promises as fs } from 'fs';
import { Vm } from './vm';

const main = async () => {
    // const input = await fs.readFile('input', 'utf8');
    // const mem = input.split(',').reduce((m, s, i) => ({ [`${i}`]: BigInt(s), ...m }), {});
    // const vm = new Vm(0, mem)

    //const getIns = async function* () { yield BigInt(1); };

    // for await (const out of vm.run(getIns())) {
    //     console.log(out);
    // }
    //console.log(new Vm(0, mem).dasm());
//     Vm.asm(`sym_0:
// 	in	[300]
// 	add	[sym_225], [rb + sym_6], 400
// `);

    const vm = new Vm(0, {});
    vm.asm(await fs.readFile('dasm-new2.s', 'utf8'));
    vm.dumpMem();
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
