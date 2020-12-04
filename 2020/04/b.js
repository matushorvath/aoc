const fs = require('fs');

const data = fs.readFileSync('input', 'utf8').trim().split('\n\n')
    .map(l => l.split(/[ \n]/).map(w => w.split(':')).reduce((p, [k, v]) => {
        switch (k) {
            case "byr": {
                return p + /^(19[2-9][0-9]|200[0-2])$/.test(v);
            }
            case "iyr": {
                return p + /^(201[0-9]|2020)$/.test(v);
            }
            case "eyr": {
                return p + /^(202[0-9]|2030)$/.test(v);
            }
            case "hgt": {
                return p + /^((59|6[0-9]|7[0-6])in|(1[5-8][0-9]|19[0-3])cm)$/.test(v);
            }
            case "hcl":
                return p + /^#[0-9a-f]{6}$/.test(v);
            case "ecl":
                return p + /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v);
            case "pid":
                return p + /^[0-9]{9}$/.test(v);
            default:
                return p;
        }
    }, 0))
    .reduce((p, c) => c === 7 ? p + 1 : p, 0);

console.log(data);
