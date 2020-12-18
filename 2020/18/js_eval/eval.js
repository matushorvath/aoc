// https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods

// If you can excuse me for commenting on my own work, these are the features I like:
//  - how it both starts and ends in a flurry of parens, brackets and curly braces
//  - how deceivingly symmetrical the last two regexp lines look
//  - how the core of the algorithm just one replace statement
//  - how the input is read at the very end of the program

console.log(eval(`((${[
    [/\(/g, '((('],
    [/\)/g, ')))'],
    [/\+/g, ')+('],
    [/\*/g, '))*(('],
    [/\n/g, '))+((']
].reduce(
    (p, [r, s]) => p.replace(r, s),
    require('fs').readFileSync('input', 'utf8').trim()
)}))`));
