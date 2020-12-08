# imports from libxib.a, which is the standard library
# that comes with the xzintbit assembler

.IMPORT read_identifier
.IMPORT read_number
.IMPORT get_input
.IMPORT peek_input
.IMPORT print_num
.EXPORT report_libxib_error

# set up stack, call main function
    arb stack

    call main
    hlt

main:
.FRAME acc, pos, tmp
    arb -3

    add 0, 0, [rb + pos]

loop_parse:
    # parse one line

    call get_input
    eq [rb - 2], '.', [rb + tmp]
    jnz [rb + tmp], end_parse

    add 10000, [rb + pos], [ip + 3]
    add [rb - 2], 0, [0]

    call get_input   # read ' '
    call get_input   # read ' '
    call get_input   # read ' '

#    add 10000, [rb + pos], [ip + 1]
#    out [0]

    add 1, 0, [rb + acc]
    call get_input
    eq  [rb - 2], '+', [rb + tmp]
    jnz [rb + tmp], skip_neg
    mul [rb + acc], -1, [rb + acc]
skip_neg:
#    add [rb + acc], 'O', [ip + 1]
#    out 0

    call read_number
    #add [rb - 2], -'0', [rb - 2]
    add 20000, [rb + pos], [ip + 3]
    mul [rb - 2], [rb + acc], [0]

#    add 20000, [rb + pos], [ip + 1]
#    add [0], '0', [ip + 1]
#    out 0

    call get_input   # read '\n'

    add [rb + pos], 1, [rb + pos]

    jz  0, loop_parse

end_parse:
    add 0, 0, [rb + acc]
    add 0, 0, [rb + pos]

loop_exec:
#    add [rb + pos], 0, [rb - 1]
#    arb -1
#    call print_num
#    out ' '

#    add [rb + acc], 0, [rb - 1]
#    arb -1
#    call print_num
#    out ' '

    add 30000, [rb + pos], [ip + 1]
    jnz [0], done

    add 30000, [rb + pos], [ip + 3]
    add 1, 0, [0]

    add 10000, [rb + pos], [ip + 1]
    eq  [0], 'n', [rb + tmp]
    jnz [rb + tmp], exec_nop

    add 10000, [rb + pos], [ip + 1]
    eq  [0], 'j', [rb + tmp]
    jnz [rb + tmp], exec_jmp

    add 10000, [rb + pos], [ip + 1]
    eq  [0], 'a', [rb + tmp]
    jnz [rb + tmp], exec_acc

exec_nop:
#    out 'N'
#    out 10
    add [rb + pos], 1, [rb + pos]
    jz  0, loop_exec

exec_jmp:
#    out 'J'
#    out 10
    add 20000, [rb + pos], [ip + 1]
    add [0], [rb + pos], [rb + pos]

    jz  0, loop_exec

exec_acc:
#    out 'A'
#    out 10
    add 20000, [rb + pos], [ip + 1]
    add [0], [rb + acc], [rb + acc]

    add [rb + pos], 1, [rb + pos]

    jz  0, loop_exec

done:
    # print the counter

    add [rb + acc], 0, [rb - 1]
    arb -1
    call print_num
    out 10    # print '\n'

    arb 3
    ret 0
.ENDFRAME

# dummy function needed by libxib
report_libxib_error:
    hlt

# stack space, 50 memory locations, growing down
    ds  50, 0
stack:

.EOF
