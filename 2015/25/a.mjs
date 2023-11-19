import fs from 'fs/promises';

// To continue, please consult the code grid in the manual.  Enter the code at row 3010, column 3019.

let code = 20151125;
const mul = 252533;
const div = 33554393;

let r = 1, c = 1;
while (r !== 3010 || c !== 3019) {
    code = (code * mul) % div;
    if (r === 1) {
        console.log(r, c, code);

        r = c + 1;
        c = 1;
    } else {
        r--;
        c++;
    }
}

console.log(code);
