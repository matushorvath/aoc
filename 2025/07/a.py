import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

lines = [list(line) for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

print(lines)

#beams = ['|' if ch == 'S' else '.' for ch in lines[0]]
#print(beams)

count = 0

for (lidx, line) in enumerate(lines[1:]):
    print(lidx, line)

    for (cidx, char) in enumerate(line):
        if lines[lidx - 1][cidx] == '|' or lines[lidx - 1][cidx] == 'S':
            if lines[lidx][cidx] == '^':
                lines[lidx][cidx - 1] = '|'
                lines[lidx][cidx + 1] = '|'
                count += 1
            else:
                lines[lidx][cidx] = '|'

print('\n'.join([''.join(line) for line in lines]))

print(count)
