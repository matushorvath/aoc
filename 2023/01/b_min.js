console.log(require('fs').readFileSync('input', 'utf8').trimEnd().split(/\r?\n/).map(line =>
    [/(\d|one|two|three|four|five|six|seven|eight|nine)/, /.*(\d|one|two|three|four|five|six|seven|eight|nine)/]
    .map(re => line.match(re)[1])
    .map(digit => Number(digit) || ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].indexOf(digit) + 1)
    .join('')
).map(Number).reduce((p, c) => p + c, 0));
