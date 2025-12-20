import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().split('\n')

lines = [list(line) for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

#print(lines)

res = 0

for c in range(len(lines[0])):
    if lines[4][c] != ' ':
        nums = []
        op = lines[4][c]
    num = 0
    for r in range(4):
        if lines[r][c] != ' ':
            num *= 10
            num += int(lines[r][c])
    if num != 0:
        nums.append(num)
    if num == 0 or c == len(lines[0]) - 1:
        if op == '+':
            res += sum(nums)
        else:
            tmp = 1
            for num in nums:
                tmp *= num
            res += tmp

print(res)

# res = [0] * len(ops)

# for cidx, op in enumerate(ops):
#     if op == '*':
#         res[cidx] = 1

#     for dig in (1000, 100, 10, 1):
#         for row, ridx in rows:
#             if op == '+':
#                 res[cidx] += row[cidx]
#             else:
#                 res[cidx] *= row[cidx]

# print(sum(res))
