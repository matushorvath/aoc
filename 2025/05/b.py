import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    (ranges, ids) = fd.read().rstrip().split('\n\n')

ranges = ranges.split('\n');
ids = ids.split('\n');

ranges = [re.search(r"(?P<from>\d+)-(?P<to>\d+)", range).groups() for range in ranges]
ranges = [{ 'f': int(range[0]), 't': int(range[1]) } for range in ranges]
ids = [int(id) for id in ids]

#lines = [[char for char in line] for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

#print(ranges)
#print(ids)

def range_key(range):
    return range['f']

ranges.sort(key=range_key)

# print(ranges)

ridx = 1
while ridx < len(ranges):
    if ranges[ridx - 1]['t'] >= ranges[ridx]['f']:
        # merge ranges
        ranges[ridx - 1]['t'] = max(ranges[ridx - 1]['t'], ranges[ridx]['t'])
        ranges.pop(ridx)
    else:
        ridx += 1

count = 0;

for range in ranges:
    count += range['t'] - range['f'] + 1

print(count)
