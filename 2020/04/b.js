const fs = require('fs');

const data = fs.readFileSync('input', 'utf8').trim().split('\n\n')
    .map(l => l.split(/[ \n]/).reduce((p, c) => p
        + /^byr:(19[2-9][0-9]|200[0-2])$/.test(c)
        + /^iyr:(201[0-9]|2020)$/.test(c)
        + /^eyr:(202[0-9]|2030)$/.test(c)
        + /^hgt:((59|6[0-9]|7[0-6])in|(1[5-8][0-9]|19[0-3])cm)$/.test(c)
        + /^hcl:#[0-9a-f]{6}$/.test(c)
        + /^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/.test(c)
        + /^pid:[0-9]{9}$/.test(c)
    , 0))
    .reduce((p, c) => c === 7 ? p + 1 : p, 0);

console.log(data);
