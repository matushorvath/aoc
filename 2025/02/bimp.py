import re

with open('input', 'r') as fd:
#with open('example', 'r') as fd:
    line = fd.read().rstrip().split('\n')[0]

score = 0

for (a, b) in [re.search(r"(\d+)-(\d+)", invl).groups() for invl in line.split(',')]:
    for i in range(int(a), int(b)):
        if re.match(r"^(.+)\1+$", str(i)):
             score += int(i)
             print("match", i)

print(score)
