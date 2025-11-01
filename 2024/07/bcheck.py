import re

sum = 0

with open('result', 'r') as fd:
    for line in fd:
        m = re.search(r"> (\d+) = (.*)", line)
        if not m: break

        res, exp = m.groups()

        res = int(res)
        exp = exp.split(' ')

        val = int(exp[0])
        exp = exp[1:]

        while len(exp) > 0:
            if exp[0] == '+':
                val += int(exp[1])
                exp = exp[2:]
            elif exp[0] == '*':
                val *= int(exp[1])
                exp = exp[2:]
            elif exp[0] == '|':
                val = int(f'{val}{exp[1]}')
                exp = exp[2:]

        if val != res:
            print(f'>>>>> {res} = {val}')

        sum += res

print(sum)
