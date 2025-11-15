import math


def visit(rows, visited, height, rn, cn, trn, tcn):
    if rn < 0 or rn >= len(rows):
        return 0
    if cn < 0 or cn >= len(rows[0]):
        return 0

    if visited[rn][cn]:
        return 0

    if height + 1 != rows[rn][cn]:
        return 0

    visited[rn][cn] = True
    success = eval(rows, visited, rn, cn, trn, tcn)
    visited[rn][cn] = False

    return success


def eval(rows, visited, rn, cn, trn, tcn):
    #print(rn, cn, trn, tcn)

    if cn == tcn and rn == trn:
        return 1

    trails = 0

    trails += visit(rows, visited, rows[rn][cn], rn - 1, cn, trn, tcn)
    trails += visit(rows, visited, rows[rn][cn], rn + 1, cn, trn, tcn)
    trails += visit(rows, visited, rows[rn][cn], rn, cn - 1, trn, tcn)
    trails += visit(rows, visited, rows[rn][cn], rn, cn + 1, trn, tcn)

    return trails


def eval_trail(rows, hrn, hcn, trn, tcn):
    visited = [[False] * len(rows[0]) for _ in rows]
    visited[hrn][hcn] = True
    #print(visited)

    return eval(rows, visited, hrn, hcn, trn, tcn)


def eval_rows(rows):
    score = 0

    for hrn, row in enumerate(rows):
        for hcn, num in enumerate(row):
            if num == 0:
                for trn, row in enumerate(rows):
                    for tcn, num in enumerate(row):
                        if num == 9:
                            score += eval_trail(rows, hrn, hcn, trn, tcn)

    return score


def main():
    #with open('bexample1', 'r') as fd:
    #with open('example3', 'r') as fd:
    with open('input', 'r') as fd:
        lines = fd.read().rstrip().split('\n')

    rows = [[-math.inf if n == '.' else int(n) for n in list(line)] for line in lines]

    #print(lines)

    print(eval_rows(rows))


if __name__ == "__main__":
    main()
