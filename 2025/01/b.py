import re

with open('input', 'r') as fd:
#with open('/home/horvathm/aoc/src/2025/01/example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

#lines = [line.split(',') for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

print(lines)

point = 50
count = 0

for (dir, dist) in lines:
    for i in range(dist):
        point = (point + dir) % 100
        if point == 0:
            count += 1

print(count)

# 3086 low
