package main

import (
	"bufio"
	"fmt"
	"os"
)

const (
	ADD = iota
	MUL
	LPAREN
	RPAREN
	NUMBER
	END
)

func lexer(line string, position *int) (token int, value int) {
	for (*position < len(line) && line[*position] == ' ') {
		*position++
	}

	if (*position >= len(line)) {
		*position++;
		return END, 0
	}

	switch(line[*position]) {
		case '+': *position++; return ADD, 0
		case '*': *position++; return MUL, 0
		case '(': *position++; return LPAREN, 0
		case ')': *position++; return RPAREN, 0
		default: {
			for (line[*position] >= '0' && line[*position] <= '9') {
				value = value * 10 + int(line[*position] - '0')
				*position++
			}
			return NUMBER, value
		}
	}
}

func main() {
	fd, err := os.Open("../sample1")
	if err != nil {
		panic(err)
	}
	s := bufio.NewScanner(fd)

	ops := make([]int, 0, 256)
	queue := make([]struct{ op int; val int }, 0, 256)

	for s.Scan() {
		var token, value, position int
		for token != END {
			token, value = lexer(s.Text(), &position);
			fmt.Printf("%#v(%d)", token, value);

			switch(token) {
			case ADD, MUL:
				ops = append(ops, token)
			case LPAREN:
			case RPAREN:
			case NUMBER:
			case END:
			}
		}
	}
}
