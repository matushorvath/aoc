// https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods

console.log(require('fs').readFileSync('input', 'utf8').trim().split('\n')
    .map(l => '((' + l
        .replace(/\(/g, '(((')
        .replace(/\)/g, ')))')
        .replace(/\+/g, ')+(')
        .replace(/\*/g, '))*((')
        + '))')
    .map(l => eval(l))
    .reduce((p, c) => p + c, 0));
