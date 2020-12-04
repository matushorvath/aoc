console.log(require('fs').readFileSync('input', 'utf8').trim().split('\n\n')
    .map(l => l.split(/[ \n]/).reduce((p, c) => p + [
        /^byr:(19[2-9][0-9]|200[0-2])$/,
        /^iyr:(201[0-9]|2020)$/,
        /^eyr:(202[0-9]|2030)$/,
        /^hgt:(59|6[0-9]|7[0-6])in$/,
        /^hgt:(1[5-8][0-9]|19[0-3])cm$/,
        /^hcl:#[0-9a-f]{6}$/,
        /^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/,
        /^pid:[0-9]{9}$/
    ].some(r => r.test(c)), 0))
    .filter(x => x === 7).length
);
