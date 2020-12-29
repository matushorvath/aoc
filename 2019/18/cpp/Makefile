CXX=clang++-11
CXXFLAGS=-O3 -Wall -pedantic -std=c++17

LINK.o=$(LINK.cc)

TARGETS=part1 part2 part2g

all: $(TARGETS)

.PHONY: clean
clean:
	rm -f *.o
	rm -f $(TARGETS)
	rm -f $(patsubst %,%.exe,$(TARGETS))
