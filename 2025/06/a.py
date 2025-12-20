import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

rows = [[int(num) for num in re.split(r'\s+', line.strip())] for line in lines[:-1]]
ops = [char for char in re.split(r'\s+', lines[-1])]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

# print(rows)
# print(ops)

res = rows[0]

for row in rows[1:]:
    for cidx, op in enumerate(ops):
        if op == '+':
            res[cidx] += row[cidx]
        else:
            res[cidx] *= row[cidx]

print(sum(res))
