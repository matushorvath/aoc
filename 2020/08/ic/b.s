# imports from libxib.a, which is the standard library
# that comes with the xzintbit assembler

.IMPORT read_number
.IMPORT get_input
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

    # read first character from the instruction
    call get_input
    eq [rb - 2], '.', [rb + tmp]
    jnz [rb + tmp], end_parse

    add 10000, [rb + pos], [ip + 3]
    add [rb - 2], 0, [0]

    # read rest of the instruction and space
    call get_input
    call get_input
    call get_input

    # read sign into acc
    add 1, 0, [rb + acc]
    call get_input
    eq  [rb - 2], '+', [rb + tmp]
    jnz [rb + tmp], skip_neg
    mul [rb + acc], -1, [rb + acc]
skip_neg:

    # read the parameter
    call read_number
    #add [rb - 2], -'0', [rb - 2]
    add 20000, [rb + pos], [ip + 3]
    mul [rb - 2], [rb + acc], [0]

    # read line end
    call get_input

    add [rb + pos], 1, [rb + pos]

    jz  0, loop_parse

end_parse:
    add 0, 0, [rb + acc]
    add 0, 0, [rb + pos]

loop_exec:
    # mark visited instructions
    add 30000, [rb + pos], [ip + 1]
    jnz [0], done

    add 30000, [rb + pos], [ip + 3]
    add 1, 0, [0]

    # decode instruction, execute it
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
    add [rb + pos], 1, [rb + pos]
    jz  0, loop_exec

exec_jmp:
    add 20000, [rb + pos], [ip + 1]
    add [0], [rb + pos], [rb + pos]

    jz  0, loop_exec

exec_acc:
    add 20000, [rb + pos], [ip + 1]
    add [0], [rb + acc], [rb + acc]

    add [rb + pos], 1, [rb + pos]

    jz  0, loop_exec

done:
    # print the accumulator

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
