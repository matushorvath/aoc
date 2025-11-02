#with open('example2', 'r') as fd:
#with open('example', 'r') as fd:
with open('input', 'r') as fd:
    input = [int(n) for n in list(fd.read().rstrip())]

#print(input)

# unpack input
idx = 0
num = 0
isblk = True

disk = []

for run in input:
    disk.extend([str(num) if isblk else '.' for _ in range(int(run))])
    if isblk: num += 1
    isblk = not isblk

# print(''.join(disk))

# compress
spc = 0
blk = len(disk) - 1

while spc < blk:
    while disk[spc] != '.' and spc < blk:
        spc += 1
    while disk[blk] == '.' and spc < blk:
        blk -= 1

    disk[spc] = disk[blk]
    disk[blk] = '.'

    # print(''.join(disk))

# score
score = 0
for idx, val in enumerate(disk):
    if val != '.':
        score += idx * int(val)

print(score)
