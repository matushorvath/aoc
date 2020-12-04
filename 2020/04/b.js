const fs = require('fs');

const data = fs.readFileSync('input', 'utf8').trim().split('\n\n')
    .map(l => l.split(/[ \n]/).map(w => w.split(':')).reduce((p, [k, v]) => {
        switch (k) {
            case "byr": {
                const n = parseInt(v, 10);
                return p + (n >= 1920 && n <= 2002);
            }
            case "iyr": {
                const n = parseInt(v, 10);
                return p + (n >= 2010 && n <= 2020);
            }
            case "eyr": {
                const n = parseInt(v, 10);
                return p + (n >= 2020 && n <= 2030);
            }
            case "hgt": {
                const m = v.match(/^([0-9]{1,3})(in|cm)$/);
                const n = m && parseInt(m[1], 10);
                return p + !!(m && ((m[2] == 'in' && n >= 59 && n <= 76) || (m[2] == 'cm' && n >= 150 && n <= 193)));
            }
            case "hcl":
                return p + (/^#[0-9a-f]{6}$/.test(v));
            case "ecl":
                return p + (/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v));
            case "pid":
                return p + (/^[0-9]{9}$/.test(v));
            default:
                return p;
        }
    }, 0))
    .reduce((p, c) => c === 7 ? p + 1 : p, 0);

console.log(data);
