CXX?=clang++-11
CXXFLAGS=-O3 -Wall -pedantic -std=c++17

LINK.o=$(LINK.cc)

all: part1 part2

part1: part1.o

part2: part2.o

.PHONY: clean
clean:
	rm -f part1 part1.exe part2 part2.exe *.o
