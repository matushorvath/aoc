import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

lines = [[char for char in line] for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

print(lines)


def nei(lines, r, c):
    count = 0

    if c > 0 and lines[r][c - 1] == '@':
        count += 1
    if c < len(lines[r]) - 1 and lines[r][c + 1] == '@':
        count += 1
    if r > 0:
        if lines[r - 1][c] == '@':
            count += 1
        if c > 0 and lines[r - 1][c - 1] == '@':
                count += 1
        if c < len(lines) - 1 and lines[r - 1][c + 1] == '@':
                count += 1
    if r < len(lines) - 1:
        if lines[r + 1][c] == '@':
            count += 1
        if c > 0 and lines[r + 1][c - 1] == '@':
                count += 1
        if c < len(lines[r]) - 1 and lines[r + 1][c + 1] == '@':
                count += 1
    return count


def main():
    change = True
    count = 0

    while change:
        change = False

        for r, line in enumerate(lines):
            for c, char in enumerate(line):
                if char == '@' and nei(lines, r, c) < 4:
                    print('x', end='')
                    lines[r][c] = '.'
                    count += 1
                    change = True
                else:
                    print('.', end='')
            print()

    print(count)


main()
