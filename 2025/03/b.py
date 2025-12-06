import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

# lines = [[int(num) for num in line] for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"([LR])(\d+)", line).groups() for line in lines]
# lines = [(1 if line[0] == 'R' else -1, int(line[1])) for line in lines]
# lines = [(int(res), [int(n) for n in nums.split(' ')]) for (res, nums) in [re.search(r"(\d+): (.*)", line).groups() for line in lines]]

#print(lines)

num = 0

for line in lines:
    for tens in reversed(range(10)):
        ones_idx11 = line.find(str(tens))
        if ones_idx11 == -1 or ones_idx11 == len(line) - 11:
            continue
        for ones in reversed(range(10)):
            ones_idx10 = line.find(str(ones), ones_idx11 + 1)
            if ones_idx10 == -1 or ones_idx10 == len(line) - 10:
                continue
            for ones in reversed(range(10)):
                ones_idx9 = line.find(str(ones), ones_idx10 + 1)
                if ones_idx9 == -1 or ones_idx9 == len(line) - 9:
                    continue
                for ones in reversed(range(10)):
                    ones_idx8 = line.find(str(ones), ones_idx9 + 1)
                    if ones_idx8 == -1 or ones_idx8 == len(line) - 8:
                        continue
                    for ones in reversed(range(10)):
                        ones_idx7 = line.find(str(ones), ones_idx8 + 1)
                        if ones_idx7 == -1 or ones_idx7 == len(line) - 7:
                            continue
                        for ones in reversed(range(10)):
                            ones_idx6 = line.find(str(ones), ones_idx7 + 1)
                            if ones_idx6 == -1 or ones_idx6 == len(line) - 6:
                                continue
                            for ones in reversed(range(10)):
                                ones_idx5 = line.find(str(ones), ones_idx6 + 1)
                                if ones_idx5 == -1 or ones_idx5 == len(line) - 5:
                                    continue
                                for ones in reversed(range(10)):
                                    ones_idx4 = line.find(str(ones), ones_idx5 + 1)
                                    if ones_idx4 == -1 or ones_idx4 == len(line) - 4:
                                        continue
                                    for ones in reversed(range(10)):
                                        ones_idx3 = line.find(str(ones), ones_idx4 + 1)
                                        if ones_idx3 == -1 or ones_idx3 == len(line) - 3:
                                            continue
                                        for ones in reversed(range(10)):
                                            ones_idx2 = line.find(str(ones), ones_idx3 + 1)
                                            if ones_idx2 == -1 or ones_idx2 == len(line) - 2:
                                                continue
                                            for ones in reversed(range(10)):
                                                ones_idx1 = line.find(str(ones), ones_idx2 + 1)
                                                if ones_idx1 == -1 or ones_idx1 == len(line) - 1:
                                                    continue
                                                for ones in reversed(range(10)):
                                                    ones_idx0 = line.find(str(ones), ones_idx1 + 1)
                                                    if ones_idx0 == -1:
                                                        continue

                                                    num += int(line[ones_idx11]) * 100000000000 \
                                                        + int(line[ones_idx10]) * 10000000000 \
                                                        + int(line[ones_idx9]) * 1000000000 \
                                                        + int(line[ones_idx8]) * 100000000 \
                                                        + int(line[ones_idx7]) * 10000000 \
                                                        + int(line[ones_idx6]) * 1000000 \
                                                        + int(line[ones_idx5]) * 100000 \
                                                        + int(line[ones_idx4]) * 10000 \
                                                        + int(line[ones_idx3]) * 1000 \
                                                        + int(line[ones_idx2]) * 100 \
                                                        + int(line[ones_idx1]) * 10 \
                                                        + int(line[ones_idx0])
                                                    break
                                                else:
                                                    continue
                                                break
                                            else:
                                                continue
                                            break
                                        else:
                                            continue
                                        break
                                    else:
                                        continue
                                    break
                                else:
                                    continue
                                break
                            else:
                                continue
                            break
                        else:
                            continue
                        break
                    else:
                        continue
                    break
                else:
                    continue
                break
            else:
                continue
            break
        else:
            continue
        break

print(num)
