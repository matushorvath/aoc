import re

with open('input', 'r') as fd:
#with open('/home/horvathm/aoc/src/2025/07/example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

lines = [list(line) for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

#print(lines)

# def add_tl(ntls, tl):
#     if len(ntls) > 0 and ntls[-1] == tl:
#         return
#     ntls.append(tl)

# TODO remember how many unique ways we got into each state on last line, not the whole timelines

def main():
    beams = [1 if ch == 'S' else 0 for ch in lines[0]]
    # print(beams)

    for line in lines[1:]:
        nbeams = [0] * len(line)

        for cidx, cnt in enumerate(beams):
            if line[cidx] == '^':
                nbeams[cidx - 1] += cnt
                nbeams[cidx + 1] += cnt
            else:
                nbeams[cidx] += cnt

        beams = nbeams
        # print(beams)

    print(sum(beams))

main()
