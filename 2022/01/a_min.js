console.log(require('fs').readFileSync('input', 'utf8').trimEnd().split(/\r?\n\r?\n/)
    .reduce((max, block) => max = Math.max(max, block.split(/\r?\n/).map(Number).reduce((sum, n) => sum += n, 0)), 0));
