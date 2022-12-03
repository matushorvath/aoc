console.log(require('fs').readFileSync('input', 'utf8').trimEnd().split(/\r?\n\r?\n/)
    .map(block => block.split(/\r?\n/).map(Number).reduce((sum, n) => sum += n, 0))
    .sort((x, y) => y - x).slice(0, 3).reduce((sum, val) => sum += val, 0));
