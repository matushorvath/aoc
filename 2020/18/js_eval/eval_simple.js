// https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods

console.log(eval(require('fs').readFileSync('../input', 'utf8')
    .trim().split('\n').map(l => [
        [/\(/g, '((('], [/\)/g, ')))'], [/\+/g, ')+('],
        [/\*/g, '))*(('], [/^/gm, '(('], [/$/gm, '))']
    ].reduce((p, [r, s]) => p.replace(r, s), l)).join('+')
));
