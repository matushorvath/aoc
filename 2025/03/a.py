import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

# lines = [[int(num) for num in line] for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

print(lines)

num = 0

for line in lines:
    for tens in reversed(range(10)):
        tens_idx = line.find(str(tens))
        if tens_idx == -1 or tens_idx == len(line) - 1:
            continue
        for ones in reversed(range(10)):
            ones_idx = line.find(str(ones), tens_idx + 1)
            if ones_idx == -1:
                continue

            num += int(line[tens_idx]) * 10 + int(line[ones_idx])
            break
        else:
            continue
        break

print(num)
