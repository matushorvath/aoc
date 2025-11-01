import re

with open('input', 'r') as fd:
    lines = fd.read().rstrip().split('\n')

lines = [line.split(',') for line in lines]
# lines = [re.search(r"(?P<index>\d+): (?P<first>[^,]+), and (?P<second>[^,]+), (?P<last>\d+)", line).groupdict() for line in lines]
# lines = [re.search(r"(\d+): ([^,]+), and ([^,]+), (\d+)", line).groups() for line in lines]
# lines = [
#     {
#         "index": int(line[0]),
#         "first": line[1],
#         "second": line[2],
#         "last": line[3],
#     } for line in lines]

print(lines)
