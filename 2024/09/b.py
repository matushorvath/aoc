def print_disk(disk):
    for itm in disk:
        char = str(itm['file']) if itm['file'] is not None else '.'
        print(char * itm['size'], end='')
    print()


#with open('example2', 'r') as fd:
#with open('example', 'r') as fd:
with open('input', 'r') as fd:
    input = [int(n) for n in list(fd.read().rstrip())]

#print(input)

# unpack input
disk = [{
    "file": idx // 2 if idx % 2 == 0 else None,
    "size": run
} for idx, run in enumerate(input)]

#print(disk)
# print_disk(disk)

def find_file(fil):
    for itm in reversed(disk):
        if itm['file'] == fil:
            return itm

# defragment
for fil in reversed(range(len(disk) // 2 + 1)):
    #print(fil)

    cur_itm = find_file(fil)
    # print(cur_itm)

    for idx, itm in enumerate(disk):
        if itm == cur_itm: break
        if itm['file'] is None and itm['size'] >= cur_itm['size']:
            # print(f'candidate {itm}')

            diff = itm['size'] - cur_itm['size']

            itm['file'] = cur_itm['file']
            itm['size'] = cur_itm['size']
            cur_itm['file'] = None

            if diff > 0:
                disk.insert(idx + 1, { 'file': None, 'size': diff })

            break

    # print_disk(disk)

# print_disk(disk)

# score
score = 0
pos = 0

for itm in disk:
    if itm['file'] is not None:
        for idx in range(pos, pos + itm['size']):
            score += idx * itm['file']
    pos += itm['size']

print(score)
