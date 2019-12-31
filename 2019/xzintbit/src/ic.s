    arb stack

##########
main:
.FRAME
    out '?'
    out 10

    cal read
    cal print

    hlt
.ENDFRAME

##########
read:
.FRAME digit, byte, flag
    arb -3

read_next_digit:
    in  [rb + digit]
    eq  [rb + digit], 44, [rb + flag]
    jnz [rb + flag], read_finish_byte
    eq  [rb + digit], 10, [rb + flag]
    jnz [rb + flag], read_finish_byte
    add [rb + digit], -48, [rb + digit]
    mul [rb + byte], 10, [rb + byte]
    add [rb + byte], [rb + digit], [rb + byte]
    jz  0, read_next_digit

read_finish_byte:
+3 = read_size:
    add [rb + byte], 0, [mem]
    add 0, 0, [rb + byte]
    add [read_size], 1, [read_size]

    eq  [rb + digit], 10, [rb + flag]
    jz  [rb + flag], read_next_digit

    add [read_size], -1, [size]

    add mem, 0, [read_size]
    arb 3
    ret 0
.ENDFRAME

##########
print:
.FRAME byte, flag
    arb -2

    out 'L'
    out 'i'
    out 's'
    out 't'
    out ':'
    out 10

    jz  [size], print_finish

print_byte:
+1 = print_size:
    add [mem], 0, [rb - 1]
    arb -1
    cal print_num

    eq  [size], [print_size], [rb + flag]
    jnz [rb + flag], print_finish
    add [print_size], 1, [print_size]

    out 44
    jz  0, print_byte

print_finish:
    out 10

    add -1, 0, [print_size]
    arb 2
    ret 0
.ENDFRAME

##########
# convert number to string
print_num:
.FRAME num; tmp, order, digit; digits
    arb -3

    # determine highest power of 10
    add 1, 0, [rb + order]

print_num_next_order:
+3 = print_num_digit_ptr_1:
    add [rb + order], 0, [rb + digits]
    add [print_num_digit_ptr_1], -1, [print_num_digit_ptr_1]

    mul [rb + order], 10, [rb + order]
    lt  [rb + num], [rb + order], [rb + tmp]
    jz  [rb + tmp], print_num_next_order

print_num_finish_order:
    add [print_num_digit_ptr_1], 1, [print_num_digit_ptr_2]

print_num_next_digit:
+1 = print_num_digit_ptr_2:
    add [rb + digits], 0, [rb + order]
    add -1, 0, [rb + digit]

print_num_increase:
    add [rb + digit], 1, [rb + digit]
    mul [rb + order], -1, [rb + tmp]
    add [rb + num], [rb + tmp], [rb + num]
    lt  [rb + num], 0, [rb + tmp]
    jz  [rb + tmp], print_num_increase

    add [rb + num], [rb + order], [rb + num]
    add [rb + digit], '0', [rb + digit]
    out [rb + digit]

    eq  [rb + order], 1, [rb + tmp]
    jnz [rb + tmp], print_num_finish

    add [print_num_digit_ptr_2], 1, [print_num_digit_ptr_2]
    jz  0, print_num_next_digit

print_num_finish:
    add digits, 0, [print_num_digit_ptr_2]
    add digits, 0, [print_num_digit_ptr_1]

    arb 3
    ret 1
.ENDFRAME

##########
set_ptr:
.FRAME ; ; inst3, inst2, inst1, inst0
    # We assume that next instruction is an "add", "mul", "lt" or "eq" instruction in
    # the form of "xyz _, _, [ptr]"
    # We will fixup the instruction so it does in effect "xyz _, _, [[ptr]]", then execute it and return after the instruction

    # inst3 + 1 is the return address which points to the "add" instruction
    # let's update next 4 instructions so they copy the "add" instruction to our stack
    add [inst3 + 1], 0, [inst_ptr_byte_0]
    add [inst3 + 1], 1, [inst_ptr_byte_1]
    add [inst3 + 1], 2, [inst_ptr_byte_2]
    add [inst3 + 1], 3, [inst_ptr_byte_3]

    # copy first 3 bytes of the instruction to our stack
+1 = inst_ptr_byte_0:
    add [0], 0, [rb + inst0]
+1 = inst_ptr_byte_1:
    add [0], 0, [rb + inst1]
+1 = inst_ptr_byte_2:
    add [0], 0, [rb + inst2]

    # fetch value from the pointed-to location
+1 = inst_ptr_byte_3:
    add [0], 0, [ptr_val]

+1 = ptr_val:
    add [0], 0, [rb + inst3]

    # load pointed-to value into ptr_val
+1 = ptr_val:
    add [0], 0, [rb + ptr_res]

    ret 0
.ENDFRAME

##########
# globals
size:
    db  0

##########
    ds  50, 0
stack:

mem:
