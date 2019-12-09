import { promises as fs } from 'fs';
import { Vm } from './vm-a';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    //const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
    //const input = '1102,34915192,34915192,7,4,7,99,0';
    //const input = '104,1125899906842624,99';
    const mem = input.split(',').map(s => Number(s));

    const vm = new Vm(0, mem);
    console.log(vm.run([1]));
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
