import fs from 'fs/promises';

const input = 'hxbxwxba';
//const input = 'abcdefgh';
//const input = 'ghijklmn';

const A = 'a'.charCodeAt(0);
const forbidden = new Set(['i'.charCodeAt(0), 'o'.charCodeAt(0), 'l'.charCodeAt(0)])
const Z = 'z'.charCodeAt(0);

const inc = (pwd) => {
    let i = pwd.length - 1;

    while (pwd[i] === Z) {
        pwd[i] = A;
        i--;
    }

    pwd[i]++;
    if (forbidden.has(pwd[i])) {
        pwd[i]++;
    }
};

const valid = (pwd) => {
    // 1
    let straight = false;
    for (let i = 0; i < pwd.length - 2; i++) {
        if (pwd[i] + 1 === pwd[i + 1] && pwd[i + 1] + 1 === pwd[i + 2]) {
            straight = true;
            break;
        }
    }
    if (!straight) {
        return false;
    }

    // 2
    for (let i = 0; i < pwd.length; i++) {
        if (forbidden.has(pwd[i])) {
            return false;
        }
    }

    // 3
    let pairs = 0;
    const have = new Set();
    for (let i = 0; i < pwd.length - 1; i++) {
        if (pwd[i] === pwd[i + 1] && !have.has(pwd[i])) {
            pairs++;
            if (pairs === 2) break;
            have.add(pwd[i]);
        }
    }
    if (pairs !== 2) {
        return false;
    }

    return true;
};

let pwd = input.split('').map(ch => ch.charCodeAt(0));

while (true) {
    inc(pwd);
    if (valid(pwd)) {
        break;
    }
}

console.log('result', pwd.map(n => String.fromCharCode(n)).join(''));
