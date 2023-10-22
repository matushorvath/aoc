import fs from 'fs/promises';

let input = '1113222113';
//let input = '111221';

for (let j = 0; j < 40; j++) {
    let i = 0;
    let output = '';

    while (i < input.length) {
        let cnt = 1;
        const num = input[i];
        while (i < input.length && input[++i] === num) cnt++;
        output += `${cnt}${num}`;
    }
    input = output;
}

console.log('result', input.length);
