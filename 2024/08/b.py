from collections import defaultdict


def print_map(map):
    for line in map:
        print(''.join(line))


def print_nodes(nodes):
    for line in nodes:
        print(''.join(['X' if field else '.' for field in line]))


def locate(map):
    locs = defaultdict(list)
    for lnum, line in enumerate(map):
        for fnum, field in enumerate(line):
            if field != '.':
                locs[field].append((fnum, lnum))
    return locs


with open('input', 'r') as fd:
#with open('example', 'r') as fd:
#with open('example2', 'r') as fd:
    map = [list(line) for line in fd.read().rstrip().split('\n')]

#print_map(map)

freqs = locate(map)
#print(locs)

nodes = [[0] * len(line) for line in map]
#print(nodes)

for freq, locs in freqs.items():
    for loc1 in locs:
        for loc2 in locs:
            if loc1 != loc2:
                dx = loc2[0] - loc1[0]
                dy = loc2[1] - loc1[1]

                n1x, n1y = loc1[0], loc1[1]
                while 0 <= n1y < len(nodes) and 0 <= n1x < len(nodes[n1y]):
                    nodes[n1y][n1x] = True
                    n1x -= dx
                    n1y -= dy

                n2x, n2y = loc2[0], loc2[1]
                while 0 <= n2y < len(nodes) and 0 <= n2x < len(nodes[n2y]):
                    nodes[n2y][n2x] = True
                    n2x += dx
                    n2y += dy

#print()
print_nodes(nodes)

count = 0

for line in nodes:
    for field in line:
        if field:
            count += 1

print(count)
