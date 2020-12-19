// const [igram, idata] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

// const gram = igram.split('\n')
//     .map(l => {
//         const mt = l.match(/(\d+): (".")/);
//         if (mt) {
//             return { n: mt[1], t: mt[2] };
//         }
//         const mr = l.match(/(\d+): (".")/);

const exec = require('util').promisify(require('child_process').exec);

//const which = 'sample';
const which = 'acpp';

const data = require('fs').readFileSync(`${which}_data`, 'utf8').trim().split('\n');

const main = async () => {
    for (const line of data) {
        try {
            const { stdout, stderr } = await exec(`echo ${line} | ./${which}`);
            //console.log('stdout:', stdout);
            //console.error('stderr:', stderr);
            console.log('passed', line);
        } catch (e) {
            console.log('failed', line);
        }
    }
}

main().catch(e => console.log('error', e));
