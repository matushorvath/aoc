    arb call_stack
    call main
    hlt


main:
.FRAME char, last_newline, tmp
    arb -3

    add 0, 0, [rb + last_newline]

main_parse:
    in  [rb + char]

    # \n is new line
    eq  [rb + char], 10, [rb + tmp]
    jnz [rb + tmp], main_newline

    # \r is ignored
    eq  [rb + char], 13, [rb + tmp]
    jnz [rb + tmp], main_parse

    # this character is not a new line
    add 0, 0, [rb + last_newline]

    eq  [rb + char], '(', [rb + tmp]
    jnz [rb + tmp], main_open
    eq  [rb + char], '[', [rb + tmp]
    jnz [rb + tmp], main_open
    eq  [rb + char], '{', [rb + tmp]
    jnz [rb + tmp], main_open
    eq  [rb + char], '<', [rb + tmp]
    jnz [rb + tmp], main_open

    eq  [rb + char], ')', [rb + tmp]
    jnz [rb + tmp], main_close
    eq  [rb + char], ']', [rb + tmp]
    jnz [rb + tmp], main_close
    eq  [rb + char], '}', [rb + tmp]
    jnz [rb + tmp], main_close
    eq  [rb + char], '>', [rb + tmp]
    jnz [rb + tmp], main_close

    call error

main_newline:
    # two newlines mean end the input
    eq  [rb + last_newline], 1, [rb + tmp]
    jnz [rb + tmp], main_end
    add 1, 0, [rb + last_newline]

    # calculate score
    call calc_score

    # store score
    add [next_score_ptr], 0, [ip + 3]
    add [rb - 2], 0, [0]
    add [next_score_ptr], 1, [next_score_ptr]

    # reset parse_stack
    add parse_stack, 0, [parse_stack_top]

    jz 0, main_parse

main_open:
    # push to parse_stack
    add [parse_stack_top], -1, [parse_stack_top]
    add [parse_stack_top], 0, [ip + 3]
    add [rb + char], 0, [0]

    jz 0, main_parse

main_close:
    # pop from parse_stack
    add [parse_stack_top], 0, [ip + 1]
    add [0], 0, [rb + tmp]
    add [parse_stack_top], 1, [parse_stack_top]

    # map opening char to closing char
    add [rb + tmp], 0, [rb - 1]         # opening char as function parameter
    arb -1
    call map_close_to_open
    add [rb - 3], 0, [rb + tmp]         # closing char was returned from the function

    # compare chars, continue with next input char if they match
    eq  [rb + tmp], [rb + char], [rb + tmp]
    jnz [rb + tmp], main_parse

main_close_ignore:
    # chars are not equal, the line is corrupted
    # read and ignore everything until end of current line
    in  [rb + tmp]
    eq  [rb + tmp], 10, [rb + tmp]
    jz  [rb + tmp], main_close_ignore

    add 1, 0, [rb + last_newline]

    # reset parse_stack
    add parse_stack, 0, [parse_stack_top]

    jz 0, main_parse

main_end:
    # sort the scores
    add scores, 0, [rb - 1]
    add [next_score_ptr], -1, [rb - 2]
    arb -2
    call qsort

    #call print_scores
    call print_median_score
    out 10

    arb 3
    ret 0
.ENDFRAME


map_close_to_open:
.FRAME open_char; close_char, tmp
    arb -2

    eq  [rb + open_char], '(', [rb + tmp]
    jnz [rb + tmp], map_close_to_open_round
    eq  [rb + open_char], '[', [rb + tmp]
    jnz [rb + tmp], map_close_to_square
    eq  [rb + open_char], '{', [rb + tmp]
    jnz [rb + tmp], map_close_to_curly
    eq  [rb + open_char], '<', [rb + tmp]
    jnz [rb + tmp], map_close_to_angle

    call error

map_close_to_open_round:
    add ')', 0, [rb + close_char]
    jz 0, map_close_to_end

map_close_to_square:
    add ']', 0, [rb + close_char]
    jz 0, map_close_to_end

map_close_to_curly:
    add '}', 0, [rb + close_char]
    jz 0, map_close_to_end

map_close_to_angle:
    add '>', 0, [rb + close_char]
    jz 0, map_close_to_end

map_close_to_end:
    arb 2
    ret 1
.ENDFRAME


calc_score:
.FRAME score, char, tmp
    arb -3

    add 0, 0, [rb + score]

calc_score_loop:
    # check if whole parse_stack was processed
    eq  [parse_stack_top], parse_stack, [rb + tmp]
    jnz [rb + tmp], calc_score_end

    # multiply score by 5
    add [rb + score], [rb + score], [rb + tmp]  # tmp = 2 * score
    add [rb + tmp], [rb + tmp], [rb + tmp]      # tmp = 2 * tmp = 4 * score
    add [rb + tmp], [rb + score], [rb + score]  # score = tmp + score = 5 * score

    # pop char
    add [parse_stack_top], 0, [ip + 1]
    add [0], 0, [rb + char]
    add [parse_stack_top], 1, [parse_stack_top]

    # add points
    eq  [rb + char], '(', [rb + tmp]
    jnz [rb + tmp], calc_score_round
    eq  [rb + char], '[', [rb + tmp]
    jnz [rb + tmp], calc_score_square
    eq  [rb + char], '{', [rb + tmp]
    jnz [rb + tmp], calc_score_curly
    eq  [rb + char], '<', [rb + tmp]
    jnz [rb + tmp], calc_score_angle

    call error

calc_score_round:
    add [rb + score], 1, [rb + score]
    jz 0, calc_score_loop

calc_score_square:
    add [rb + score], 2, [rb + score]
    jz 0, calc_score_loop

calc_score_curly:
    add [rb + score], 3, [rb + score]
    jz 0, calc_score_loop

calc_score_angle:
    add [rb + score], 4, [rb + score]
    jz 0, calc_score_loop

calc_score_end:
    arb 3
    ret 0
.ENDFRAME


qsort:
.FRAME lo, hi; pivot, i, j, tmp
    arb -4

    # bounds check
    lt  [rb + lo], [rb + hi], [rb + tmp]
    jz  [rb + tmp], qsort_end
    lt  [rb + lo], scores, [rb + tmp]
    jnz [rb + tmp], qsort_end

    # last item in range is pivot
    add [rb + hi], 0, [ip + 1]
    add [0], 0, [rb + pivot]

    add [rb + lo], -1, [rb + i]
    add [rb + lo], -1, [rb + j]

qsort_loop:
    # for (j = lo; j <= hi; j++)
    add [rb + j], 1, [rb + j]
    lt  [rb + hi], [rb + j], [rb + tmp]
    jnz [rb + tmp], qsort_recursive

    # if [j] > pivot, do nothing
    add [rb + j], 0, [ip + 2]
    lt  [rb + pivot], [0], [rb + tmp]
    jnz [rb + tmp], qsort_loop

    # else advance new pivot position
    add [rb + i], 1, [rb + i]

    # and swap pivot and j
    add [rb + j], 0, [ip + 1]
    add [0], 0, [rb + tmp]

    add [rb + i], 0, [ip + 5]
    add [rb + j], 0, [ip + 3]
    add [0], 0, [0]

    add [rb + i], 0, [ip + 3]
    add [rb + tmp], 0, [0]

    jz 0, qsort_loop

qsort_recursive:
    add [rb + lo], 0, [rb - 1]
    add [rb + i], -1, [rb - 2]
    arb -2
    call qsort

    add [rb + i], 1, [rb - 1]
    add [rb + hi], 0, [rb - 2]
    arb -2
    call qsort

qsort_end:
    arb 4
    ret 2
.ENDFRAME


print_scores:
.FRAME idx, tmp
    arb -2

    add scores, 0, [rb + idx]

main_print_loop:
    add [rb + idx], 0, [ip + 1]
    add [0], 0, [rb - 1]
    arb -1
    call print_num
    out 10

    add [rb + idx], 1, [rb + idx]
    eq  [rb + idx], [next_score_ptr], [rb + tmp]
    jz  [rb + tmp], main_print_loop

    arb 2
    ret 0
.ENDFRAME


print_median_score:
.FRAME lo, hi, tmp
    arb -3

    add scores, 0, [rb + lo]
    add [next_score_ptr], -1, [rb + hi]

print_median_score_loop:
    # assumes there is odd number of results
    eq  [rb + lo], [rb + hi], [rb + tmp]
    jnz [rb + tmp], print_median_score_end

    add [rb + lo], 1, [rb + lo]
    add [rb + hi], -1, [rb + hi]

    jz 0, print_median_score_loop

print_median_score_end:
    add [rb + lo], 0, [ip + 1]
    add [0], 0, [rb - 1]
    arb -1
    call print_num

    arb 3
    ret 0
.ENDFRAME


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


error:
.FRAME
     # Error
    out 'E'
    out 'r'
    out 'r'
    out 'o'
    out 'r'
    out 10

error_crash_loop:
    in  [0]
    jz  0, error_crash_loop
.ENDFRAME


# top of the stack for parsing
parse_stack_top:
    db  parse_stack

# pointer to the location for next score
next_score_ptr:
    db  scores

# 1000 = stack for local variables and function calls (grows down)
+1000 = call_stack:

# 500 = stack for parsing (grows down)
+1500 = parse_stack:

# array of calculated scores starts here
+1500 = scores:


.EOF
