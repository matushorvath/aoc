import { promises as fs } from 'fs';

const increasing = (s: string) => {
    for (let c = 0; c < 5; c += 1) {
        if (s[c] > s[c + 1]) {
            return false;
        }
    }
    return true;
};

const main = async () => {
    const first = 153517;
    const last = 630395;

    let n = 0;
    for (let i = first; i <= last; i += 1) {
        const s = String(i);
        if (!s.match(/(.)\1/)) {
            continue;
        }
        if (!increasing(s)) {
            continue;
        }
        console.log(i);
        n += 1;
    }

    console.log(n);
};

main()
    .then(() => console.log('done'))
    .catch(error => console.log('error:', error));
