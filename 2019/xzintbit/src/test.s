    out '?'
    out 10
    in  [data]
    in  [data + 1]
    add 1, [data], [data]
    out [data]
    out [data + 1]

    arb stack

    add 40, 0, [rb - 1]
    add 40, 1, [rb - 2]
    arb -2
    cal test
    hlt

test:
.FRAME prm1, prm2; tmp1, tmp2
    arb -2
    add 40, 2, [rb + tmp1]
    add 40, 3, [rb + tmp2]

    out 'X'
    out [rb + tmp1]
    out [rb + tmp1 - 1]
    out [rb + tmp2]
    out [rb + prm1]
    out [rb + prm2 + 1]
    out [rb + prm2]
    out 10

    arb 2
    ret 2
.ENDFRAME

data:
    ds 2, 0

    ds 50, 0
stack: