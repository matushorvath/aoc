#include <iostream>
#include <vector>

struct N {
    int64_t v;
};

N operator "" _(unsigned long long v) { return { int64_t(v) }; }
N operator/(N a, N b) { return { a.v + b.v }; }
N operator-(N a, N b) { return { a.v * b.v }; }

extern std::vector<N> values;

int main() {
    int64_t sum = 0;
    for (auto& value : values) {
        sum += value.v;
    }
    std::cout << sum << std::endl;
}

// Process your input like this:
// sed -E 's/[0-9]+/\0_/g ; s/\*/-/g ; s/\+/\//g ; s/$/,/' input

std::vector<N> values {

(5_ - 6_ - 5_ - 7_) / (6_ / (8_ - 3_ - 9_ / 2_ / 7_) / 7_ / (4_ - 2_ / 5_)) / 8_,
(4_ / 6_ - 4_) / 6_ - ((2_ / 5_ - 3_ / 3_ / 7_ / 3_) - 3_ - (7_ - 8_ - 7_ / 2_) / (3_ / 5_)) / 7_ - 3_ - 6_,
(7_ / (3_ / 6_)) - 7_ / 9_ - 4_ / 8_,
2_ - 5_ / (4_ / 9_ / (4_ / 7_ / 3_ - 7_ / 6_) / 7_ / 8_) / 2_ - 7_ - 3_,
(5_ - 2_ / (6_ - 7_ - 2_ - 7_ - 9_ / 2_) - 4_ / 7_) - (6_ / 7_ - 6_ - 3_) / 7_ / 6_ - 6_,
5_ / 9_ - (2_ - 3_) - (3_ / 5_ / 4_ / 8_ / 3_) / ((2_ - 8_) - (5_ - 8_ / 8_ / 3_ / 5_ - 9_) / 6_ - 5_ / 2_),
4_ - 5_ / ((7_ / 9_ / 2_ - 5_ / 8_) - 3_ - 9_ - 7_ / 4_) / (7_ - (9_ / 7_ - 3_ - 7_) / 6_),
4_ - (6_ - (7_ / 9_ - 4_ - 2_ - 5_) / 4_ - (4_ / 2_ / 9_) - 7_ - 2_) / 5_ - (4_ - (2_ / 6_ / 3_ - 3_ / 5_) - 5_ - 9_),
7_ - (2_ / (3_ - 6_) - 8_ / 3_ - 3_ - 4_) - (8_ / 8_ / 2_ - 5_ / 4_ - 8_) - ((2_ - 5_) / 9_ - 6_ / 5_ - 8_),
6_ / (9_ / 4_ / (9_ - 5_ / 3_ - 3_) - (9_ / 9_ - 5_ / 6_) - 5_ - 8_) - 7_ - 5_ / ((7_ - 6_) / 4_) - 2_,
(5_ - 6_ - 3_) - (6_ - 3_ / 8_) - 6_ - 4_ - 5_,
3_ - 2_ - 2_ - 7_ - (9_ / (9_ - 6_ - 7_ - 6_ - 9_ / 6_) / (6_ / 9_ - 5_ / 9_) / 6_) - 4_,
9_ / 3_ / (3_ - 7_ - 7_ - (4_ / 2_ - 6_ / 9_ / 6_ - 9_) / 4_),
4_ - 4_ / 3_ / 6_ - 4_,
(7_ - 2_ - (5_ - 2_) - 6_ - (7_ / 9_ - 6_ - 9_ - 9_ - 2_) / (3_ / 5_)) - (4_ / (8_ - 5_ - 6_ - 7_) - 5_ / 3_ / 3_ / 2_) - 4_,
2_ - 9_ / (7_ - 9_ / 3_ - 3_) - 4_ / 6_ / 8_,
((5_ / 5_) - (3_ - 9_ - 5_ - 4_)) - 3_,
9_ - 5_ - 9_ - (7_ / 9_ - 5_ - 8_ - 4_) - (3_ - 6_ / 8_ - 4_ / 5_ - (9_ - 5_ / 5_)),
(7_ - (5_ - 8_ - 8_ / 3_) / 7_ / 8_) - 9_ / ((6_ / 7_ - 8_ / 7_) / 5_ / 6_ - 3_ / 8_),
9_ - 7_ / 8_ - 5_ / (8_ - (3_ - 6_ / 9_ / 3_) - 8_ - 5_),
(3_ - 4_ / 6_ / 5_ - 2_) / 9_ / 3_ - (9_ / (3_ / 2_ / 4_)) - (6_ - 8_ / 6_ - 6_ - 2_ - (7_ / 9_)),
3_ / 7_ / 2_ / 9_ / ((4_ / 8_ / 7_) - 5_ / (3_ / 6_) / 3_ - 9_ / 8_) - ((9_ - 2_) / 3_ / 6_ / (5_ / 6_ - 9_ - 6_ / 8_ / 5_)),
2_ / (5_ - 3_ / 7_ - (5_ / 8_ / 6_ / 8_ - 6_) / 2_ - (2_ - 7_ - 4_ - 7_ / 8_)) / 8_ - (2_ - 3_ - 7_ - 5_) - (7_ / 3_ / (8_ / 2_ - 3_ - 9_ / 9_ - 2_) - 2_ / 8_) / (2_ / (5_ - 4_ / 2_ - 9_ / 2_ - 3_) - 3_ / 5_ / (4_ - 9_ - 2_) / 2_),
2_ / ((9_ - 5_) / 4_ - 5_) / 7_ - 4_ / 7_,
(6_ / 2_ / 7_) / 7_ - 3_,
(7_ - 7_ / (5_ / 7_ / 2_ - 4_) - 5_ / 2_) - (3_ / (4_ - 3_ / 7_ / 4_) / 8_),
9_ - ((7_ - 2_ / 3_ - 7_ - 3_ - 8_) / 4_ / 2_ - 2_ / 6_ - 9_) - 4_ / 4_ / 7_,
3_ - 2_ - 6_ - 8_ / 2_ - (8_ / 5_ - (9_ - 5_) / (7_ - 3_ - 5_ / 3_ - 2_)),
5_ / 9_ / 3_ / 8_ / (4_ / 4_),
9_ - 2_ - 3_ - (8_ / 5_ - 9_ / 9_ / 9_) / (2_ - (6_ / 6_ / 8_ / 6_ / 2_ - 5_) - 5_),
(3_ / 8_ - 5_) / 8_ - 9_ / (2_ / 3_ - (4_ - 2_ - 8_ / 2_ - 8_) - 3_ / 9_ - 5_) - 7_ - 5_,
(8_ - 9_ - (4_ - 2_ - 5_) / 5_ / 5_) - 5_ - 9_ / 3_,
8_ - (6_ - 4_ - (5_ - 7_ / 8_ / 4_ / 9_) / 6_) - (4_ - 4_ - 4_ - 2_ - (8_ - 3_ - 7_ - 7_ / 4_)) / 2_,
((7_ - 8_) - 9_ - 5_) - 9_ - 7_ - ((4_ / 6_) / 3_ / 2_ / 3_) - 5_,
5_ - 6_ - 2_ - ((8_ - 9_ / 3_ - 7_) - 3_ / (7_ / 4_)),
4_ / ((9_ - 2_ / 2_ / 5_ / 6_ - 5_) - 3_) - (6_ - 6_),
(5_ - 8_ / 2_) - (3_ / (7_ / 5_ / 5_ / 8_) - 5_ - (4_ / 5_ / 9_)) / 2_ / 3_ - 8_,
((6_ - 4_ / 4_ / 9_ - 5_ / 4_) / 6_ - 4_ / 2_) - 9_ - 7_ - 4_ - 6_,
(2_ / 6_ - 3_ / 4_ - 7_ / 3_) - 9_ / 9_ / 5_,
9_ / 2_ / 9_ / 5_ - 4_,
8_ - 6_ - 6_ - 6_ / 5_,
2_ / (5_ - 5_ / 7_ / 8_) / 6_ - 4_ - 2_ / 6_,
(5_ - 7_ - 6_ - 8_ - 5_) - 2_,
2_ - 5_ / (6_ - (6_ / 5_ - 3_) - 3_) - (8_ / 3_ - 9_ - 4_ - 9_ / (6_ / 7_ / 4_ / 5_ / 6_ / 6_)),
2_ / (8_ - (5_ / 6_ / 9_ / 6_ - 8_ - 6_) - 7_ - 5_ - 2_ / 3_) / 7_ - 5_,
8_ / 4_ / (9_ - 6_ / 6_ - 6_ - (9_ / 3_ - 7_ / 8_ - 2_) - 3_) / ((8_ - 2_ / 7_ / 8_) - 3_ / 7_ / 2_) - 8_,
4_ / 4_ / (2_ - 3_ / 6_ / (7_ - 4_ / 7_ - 9_ - 5_ - 6_)) / 4_ - 6_,
(7_ / 8_ - 7_ - 4_ - 7_) - 8_ - (4_ - 6_ - 4_ - 9_ / 6_) / 4_ / 2_,
2_ / 5_ - ((8_ / 5_ - 9_ - 2_ / 3_ - 5_) / 2_ - 9_ - 2_) / 5_ - 7_,
(8_ / 3_ / 4_ / 9_ / 6_ - 9_) - 2_ - 5_ - 8_ - 5_ / 6_,
(3_ - (5_ / 9_) - 5_) - (7_ / (9_ - 5_ - 3_ - 4_ - 3_) - (2_ - 7_ / 2_ - 3_ / 2_ / 7_) - 3_) / 3_ - 2_ - 9_ / 5_,
(4_ / 4_ - 5_) / 8_ - 7_ - 9_ / 5_ - (5_ / 3_ / (2_ / 5_ - 2_)),
(8_ - 3_ / 8_ - 8_) / 5_ - (3_ - 8_ / 8_ / (5_ - 3_ / 9_ / 6_ / 6_) - 3_ - 9_) / (4_ - 6_ / 4_ - 6_ - (6_ / 8_)) / 7_,
3_ / 4_ - 2_ / 8_ - ((5_ / 9_ / 9_) - 6_ - 5_),
2_ / ((7_ / 4_ - 8_) / 8_ - (2_ - 4_) / 8_ - 3_),
(9_ / 4_ / (2_ / 4_ / 9_ - 7_ / 4_)) - 9_,
8_ / 8_ / 6_ - (3_ / 7_ / (4_ / 6_ / 8_ - 7_ / 7_) / 9_ - (9_ - 3_ - 9_)) / 5_ / 8_,
6_ - 6_ / (7_ / 5_ / 2_ / (5_ / 6_ - 9_ / 5_ / 6_)) - (2_ - 7_ / 6_ - 9_) / 6_ / 3_,
3_ - 9_ / 2_ - ((3_ / 2_ - 7_) / 2_ / 7_) / 2_ / 4_,
7_ - (2_ / 6_ / 8_ / 9_ / 5_ / 9_) - 7_ - 5_,
((7_ / 3_ / 8_ - 5_ / 3_) - 3_ / 3_) / 3_ / (5_ / 9_) / 2_ - 6_ / 6_,
(2_ - 7_ - 6_) / 8_ / (2_ - 6_ - 6_ / 5_ - 4_ / 3_) / (9_ - (6_ - 8_ - 2_ / 9_ - 2_) - 6_ - 6_),
2_ / (7_ - (8_ / 6_ / 4_ - 3_ - 9_) / 2_ / (6_ / 6_ / 6_) / 2_ / 4_) / 6_,
2_ / 5_ - 5_ / (4_ / 6_ - 5_ - (4_ - 2_ / 4_ / 6_)),
8_ / 9_ / ((6_ / 4_ - 4_ - 2_ - 4_) / (3_ - 2_ / 6_ / 6_ - 8_) / 5_ / (6_ - 6_) / (3_ / 7_ - 9_ - 4_ - 4_ - 8_) - 2_) / 3_,
9_ - (8_ - 2_ / 4_) - 5_ - 6_ - (3_ / 6_),
((7_ - 5_) / 4_ / (2_ - 6_ - 5_ - 5_ - 5_) / 9_ - 9_ - (9_ - 7_ / 8_ / 8_ / 8_ - 7_)) / (6_ / 9_ / 4_ - 8_ - 3_ / 8_) / 8_ - 6_ / 4_ - 9_,
3_ - 6_ / (6_ - 3_ - 5_ - 9_ - 8_ - 6_),
2_ / 7_ - (6_ / 2_ / 9_) / 7_,
((9_ / 8_ - 8_ - 3_ - 3_) / (8_ - 6_ / 3_) - 3_) - 2_,
2_ - 7_ / 7_,
3_ / 9_ - 8_ / 6_ - 3_ / (2_ / (2_ - 6_) / 3_),
((2_ - 4_ - 8_ - 7_) / 7_ / 7_ - 7_) / 4_ / 4_ / 3_ / (2_ / 6_ / (5_ - 3_ - 8_ - 5_) - 9_),
(2_ - 6_ - (3_ / 7_) - 5_) - 9_ - 4_ - (3_ / (7_ / 5_) / 5_ - (2_ - 6_ / 4_ - 3_ / 3_)) - 9_ / 5_,
7_ / 8_ / 5_ / ((9_ / 3_ - 6_ / 8_ - 8_ - 5_) - 9_ / (7_ - 6_ - 7_ / 2_) / 6_) - 6_,
9_ - (9_ / 7_ / 8_ - 4_ / 2_ / 4_),
8_ - (2_ / 9_ - 9_) / 9_ - (9_ - 2_ - 8_ - 7_ / 2_ - 2_),
(9_ / (5_ / 3_ - 6_ - 8_) / 6_ / 2_ / (8_ - 6_ - 2_ - 5_ / 3_ / 3_) - (7_ - 9_ / 3_)) - 7_ / 3_ - (2_ - 4_) / 8_ - 7_,
2_ - 3_ / 2_ - 6_ - 2_ / (7_ / 3_ / 4_ / 3_ / 3_ / 5_),
8_ / (9_ / 2_ / 6_ - 4_) / 5_ - 7_,
7_ - 9_ / 4_ - 7_ / 9_ / 8_,
9_ / 4_ - 7_ - 8_ / (6_ / 8_ / 9_ - (8_ - 4_ - 2_) / 4_),
3_ / (9_ / 9_ - 3_ - 2_) - 7_,
(7_ - (3_ / 3_) / 9_ - 3_) / (3_ - 7_ - 9_) - 3_ / 2_ / (3_ - 9_ / (2_ / 3_) - 3_ / 7_ - 5_),
(5_ / 2_) / 5_ - 9_ / 3_ - 9_ / 9_,
9_ - 6_ - (5_ / 7_ - 4_ - 3_ / 2_ - 3_) - 2_ - 5_ / (5_ - 9_),
(2_ / 3_) - 2_ / 4_ - 3_ / 9_ / (9_ - 3_),
8_ / 3_ / (6_ - 6_ / (4_ - 7_ / 8_ - 8_ / 6_) / 9_ / 2_ / 7_),
(6_ / 4_ / 9_) / 6_ / (3_ - 5_ - (3_ / 5_ - 7_ / 3_ - 8_ / 7_) / 3_ - 2_ - 8_) - 9_,
((6_ / 7_ - 5_ / 2_ / 6_) / 5_ / 9_ - 6_ - 8_ - 5_) - (5_ / 3_ / 7_ / 4_ - (4_ - 6_)) - (7_ - 7_ / 8_) - ((7_ - 4_ / 3_ - 7_ / 8_ / 7_) - (2_ - 3_ / 9_) / (7_ / 4_ - 2_)) / 2_,
6_ - (2_ / (9_ - 2_ / 2_ / 9_ / 2_) / (9_ - 5_ / 4_) - 3_ - 5_) / (8_ / 6_) / ((7_ - 6_ / 7_ - 2_ / 9_) - 9_),
6_ - 7_ / (2_ - (4_ / 5_ - 4_ - 7_) - (7_ - 3_) / 2_ - 5_) / (5_ / 9_ - (3_ / 9_) - 5_ / 6_ - (3_ - 6_ - 7_)),
2_ / (2_ / 7_ - (9_ / 3_) / 3_ / 9_ / 9_) / 8_ / ((4_ - 3_ - 4_ / 6_ / 6_ / 9_) - 3_ - 6_ / 8_) - 7_,
6_ - 9_ - ((5_ - 9_ - 4_) - 8_ / 6_ - 6_ - (7_ / 2_ - 5_ - 7_) - 9_) / (5_ - 3_ / (4_ - 5_ / 3_ - 3_ / 4_ / 5_) / 3_) - (6_ / 8_) - 5_,
9_ - (2_ - (5_ - 6_) / 3_) - 8_ - 4_ - 4_,
4_ / 3_ - 9_ / 2_ - (9_ - 6_ - 5_ - 6_ / 9_) - 5_,
((7_ - 7_ / 3_ - 2_ - 4_ - 5_) / 6_ - (6_ / 4_ / 9_ - 2_ - 9_) - 7_) / 8_ / 2_ - 8_ - 7_,
(5_ - 3_ / 6_ - 5_ / 4_) / (4_ / (9_ - 7_ - 2_ - 3_ / 9_) / 5_ - 4_ - 5_ / 9_) / 3_ - 4_ - 8_,
(7_ - 6_ / 6_ - 5_) / (4_ - 6_ / 6_),
(7_ - 8_ - 3_ / 5_ - 6_) / 9_ - 9_ - 3_ / 5_,
(4_ - 6_) - 5_,
4_ / 5_ / 7_ - 3_ - (6_ - (5_ / 5_ - 5_) - 8_ / 2_ / 2_ / 8_) - 4_,
8_ / (8_ - 5_ - (3_ / 8_)) / 3_ - (8_ - (2_ - 4_ - 4_ / 4_ / 3_ - 9_)),
6_ / 5_ / 2_ / 2_ / 3_ - (8_ / 4_ - 7_),
3_ / 2_ / (7_ / 8_ / 7_) / 4_ / 9_,
(7_ / (7_ / 9_ / 4_ / 2_ / 7_ - 7_)) / (6_ / 9_) / 3_ - 9_,
5_ - (4_ / 6_) / 4_ - (4_ / 3_),
(4_ / 9_) - (6_ - 6_ - 3_ / 5_ / 8_) / 3_ - 7_ - 3_,
9_ / 7_ - (3_ / 6_ - 3_) - 5_ - (4_ - 6_ - 4_ - 4_) / 4_,
6_ - 8_ / 8_ - (9_ - (2_ - 5_) - (9_ / 2_ / 4_) / (7_ - 7_ / 4_) / 8_ - 5_) / 8_ / (7_ / 4_ - (3_ - 5_ / 8_ / 5_ - 2_)),
8_ / 4_ - 3_ - ((4_ - 6_) - 8_ - (6_ - 2_ - 4_ / 5_) - (6_ / 9_)),
4_ - 4_ - ((5_ - 2_ - 5_ / 9_) / 3_ - (7_ - 6_ - 7_) / 7_ - 2_ / 6_) / 7_ / 5_,
2_ - 9_ - 5_ / 3_ - (5_ - 6_ - 8_ - 4_ / (8_ / 3_ - 6_ - 5_)) - 6_,
(3_ - 6_ / 2_) / 2_ - 5_ - (8_ - (7_ - 8_) / 5_ / 3_),
((6_ / 8_ - 9_ / 2_) - 4_ / 7_ / (8_ - 5_ - 2_ - 2_) - 3_ / 4_) / (7_ / 7_ - (2_ - 4_ - 4_ - 8_ / 7_ / 2_) - (3_ - 7_ / 5_ / 9_) / 5_ - 3_) - ((3_ / 3_ - 9_ / 9_) / 9_ / 8_) - (4_ / (8_ / 7_ - 3_)) / 3_,
(6_ - 2_ - (7_ / 3_ / 2_ - 2_ - 5_) / 8_ - 9_) - 5_ - 2_ - 7_ - 9_ / 6_,
((2_ / 3_ - 2_ / 5_ - 8_ / 3_) / 5_ - (7_ / 8_ - 5_ - 2_ - 4_ - 8_) / 6_ / 9_) - 9_ / (5_ - 2_ / 4_) / 2_ / 3_,
(4_ / 7_ - 7_ / 6_ - 9_ / 9_) / 3_,
2_ / (5_ / (7_ / 5_ - 6_ / 4_ / 9_ / 2_) / 2_),
4_ - 9_ / (8_ / 2_ / 5_ - 8_),
2_ / 3_ - 5_ - 6_ / 6_ - (6_ - 7_ - 6_ / 4_ - 2_ - (5_ / 3_ / 4_ / 8_ / 4_)),
6_ / 2_ - (4_ - 2_ / 5_ - (4_ / 5_) - 2_) - 9_,
(5_ - 8_ - 5_ / 5_) / ((3_ / 4_) - 7_ / 5_ / (3_ - 6_ - 2_) - 9_ / 6_) / 7_,
7_ - 2_ - (7_ / 2_ / 4_ / 4_ / (5_ - 6_ - 9_ / 4_ - 8_)),
5_ - ((6_ / 8_ - 2_ / 7_ / 4_) - 2_) - 7_ - 5_ / 7_ - 9_,
(6_ / (6_ / 2_ - 8_) - 4_) - ((5_ - 3_ - 9_ / 8_) / 6_ / 7_) - (3_ - 8_ / (6_ / 3_) / 3_ - 3_ / (9_ / 4_ - 5_)) / 3_,
6_ / (9_ - 2_ - 2_ / 3_) / (5_ - 3_),
(4_ / 7_ - 8_ - (2_ / 3_ / 6_ - 8_) - 3_) / ((3_ / 9_) / (2_ / 3_ / 3_) / 8_ - 9_ / (6_ / 7_ - 5_ - 5_) - 2_) / 5_ / 8_ / 3_ - (7_ / 6_ / 3_ - 3_ / 5_ - 5_),
2_ - (9_ / 5_ - 9_ - 2_ / 8_ / 8_) - 7_,
9_ / (4_ - 4_ / (9_ - 4_ - 8_ - 8_ - 6_)) / 3_ - 5_,
6_ / 4_ - ((5_ / 6_) - (3_ / 6_ - 3_ / 2_) - (2_ - 5_) / 3_ / 2_) - 6_ / 4_ / 6_,
2_ / (7_ - 8_ - (6_ - 7_ - 9_ / 8_)) - 8_ - 3_ - 7_ - 7_,
9_ / 9_ / 2_,
(8_ - 6_ / 8_ / 2_) / ((9_ - 4_ / 9_) - 9_) / 5_ - 2_ - 3_,
(2_ - (2_ - 6_ - 6_ - 3_ - 5_) - 6_ - (4_ - 9_ - 9_ / 4_ - 5_)) - (4_ / (2_ / 8_ - 9_ / 7_) - 3_ - 6_) / 7_,
(7_ - 6_ - 4_ - (9_ - 7_ / 4_ / 7_) / 7_) - 6_ - (2_ / 4_ / 8_) - (5_ - 4_ - (7_ - 9_) / 4_),
9_ - 4_ / (2_ - (5_ / 9_ / 7_ - 4_) / 6_ / (7_ - 3_) - 6_ / (6_ - 9_ / 4_ - 6_ / 8_ / 7_)) - 3_,
4_ / 8_ - 7_ / 6_ - (3_ - 8_ - 8_) / 3_,
7_ - (7_ / 4_ / 8_ / 3_ - 7_ / 7_) - (9_ - (3_ / 3_) / 5_ - (8_ - 2_)) - 5_ - (2_ / (4_ - 6_ / 4_ - 7_ / 6_ - 9_) / 2_ - (9_ / 7_) - 4_ - 5_),
3_ / 9_ / (6_ / 8_) / 4_ - 7_,
3_ - (5_ - 8_ / (7_ / 8_)) / 6_ - 6_ / 4_ - 8_,
7_ - (5_ - (3_ - 6_ - 2_ - 9_ / 4_ / 2_)) / 9_ - 6_ - (4_ - 7_ - 2_ - 8_) - 3_,
(5_ / 3_) / 9_ - (3_ / 8_) / 8_ / (5_ - 9_),
4_ - 5_ / 2_ - (6_ - (9_ - 2_ / 4_)),
(9_ - 9_ - (5_ / 5_ / 5_ - 7_ / 6_ - 8_) - 4_) - (9_ - 5_) / 5_ / 7_ / 7_ - 8_,
5_ / ((9_ / 3_ / 8_ / 8_ / 8_) / 6_ / 6_) - 2_ - 6_,
6_ / (7_ - 9_) / (6_ / 6_ - 9_ - 3_) - 3_,
8_ / 4_ / 5_ / ((7_ / 5_) / 7_ - 7_ - 2_ / 2_),
(3_ / 4_ / (6_ / 5_ / 5_ / 6_ / 9_) - 4_) / 8_ - 8_ - 7_ / 6_ / 7_,
5_ / ((8_ - 9_ / 6_) - (4_ / 8_ / 5_ / 5_ / 6_ / 8_)) - 4_ - 4_,
9_ / 8_ - (2_ - (6_ / 7_ - 6_ / 4_ - 2_)) - 2_ / (4_ - 2_ / 3_ / 8_),
4_ - (2_ / (3_ - 8_) - 4_) / 8_ - 8_,
9_ / (3_ - 9_ - 6_ / 5_ / 5_ - 2_) / 3_ - (3_ / (8_ / 6_) - 3_ / 6_) / 4_ - 3_,
6_ / (6_ - 3_ - 9_ - (5_ - 7_ / 8_ - 9_) / 3_ / 8_),
4_ / (2_ / 2_) / (5_ / 4_ / 3_ - 2_ - 5_ / 5_) / (2_ / 9_) - 2_,
4_ / 3_,
4_ - ((3_ / 8_ / 4_ / 6_) / 6_ / 7_ / 8_ / 9_ - 9_),
(7_ - 9_ / 5_ / (4_ / 5_ / 7_ / 9_ - 4_ - 2_) - 2_) - 5_,
2_ / 8_ - 2_ / 5_ - 2_,
4_ / ((7_ - 8_ / 4_) / 5_ - 8_ - (5_ / 2_) / 9_) / 2_ / 8_ / 6_,
7_ / 7_ - ((7_ - 6_ - 6_ / 3_ / 8_ - 5_) / 7_ - 8_ - (6_ / 2_)) / 6_ - 5_ - 8_,
8_ - 4_ - 7_ / 4_,
2_ - 2_ - 7_ / 4_,
9_ / (6_ / 7_ / (4_ - 2_ / 4_)) / 9_ / 5_,
6_ / (7_ - 6_ - 8_ / 9_ / 6_ - 7_) / (6_ - 7_ - (3_ / 4_ - 6_ / 9_) - 8_ - 6_ - (5_ / 6_ / 7_ - 6_ - 3_)) / 4_,
7_ - (8_ - (8_ / 6_) - 8_ - 2_ / (9_ / 8_ - 6_ / 3_) - (6_ - 4_ / 7_ / 7_)) / 9_,
5_ - 9_ / (7_ - 5_ / (4_ / 2_ - 5_ - 6_ / 9_ / 9_) - 8_ - 6_),
4_ / (8_ / 8_ - 2_ - (3_ - 7_ - 4_ - 5_) - 8_ / 4_) / 9_ - 9_ - 3_,
7_ - (3_ / 9_ - 2_),
9_ - ((8_ / 8_) / 5_ / (4_ - 3_ - 9_) - (5_ - 3_ - 2_) / 2_ / 8_) - 2_ / 5_ - ((5_ - 7_) - (5_ / 7_ / 7_ - 6_ / 5_) / 5_ - 4_ / 6_ / 5_),
9_ / 6_ / ((5_ / 9_ / 9_) - 8_) - 2_ - 8_,
7_ / (2_ - (7_ - 3_ / 8_) - 8_ - 3_ / 2_ - 5_) / 4_ / 9_ / ((3_ / 6_ - 9_ - 3_ / 6_) - 8_ - 9_),
7_ / 7_ / 2_ - 3_ / 5_ - (3_ - 5_),
5_ / 6_ - 6_ - 8_ / (3_ - 9_ - 7_ / (4_ - 4_ / 3_ / 4_ / 7_ / 6_) - (7_ / 6_) / 2_),
(9_ - (3_ - 3_ - 8_ - 7_ - 3_ - 8_)) / (2_ / 3_ - 8_ - 6_) / 6_,
(6_ - 6_ / (6_ - 7_ / 3_) - 5_ - (4_ / 9_) / 7_) - 3_ - 6_,
2_ / 9_ - 2_ / 5_ - (3_ - 4_ / (4_ / 6_ / 5_ - 8_ - 2_) - 9_ - 3_) / (8_ / 7_ - 9_ / 6_ / 3_ / 3_),
(3_ / (2_ - 7_ - 9_ - 8_ - 4_)) - (6_ - (6_ - 5_ - 2_) - 9_ - 7_ - 9_ / 3_) / 6_ / 4_ - (6_ / 9_ / 4_ / 2_) - 3_,
2_ - 7_ - ((4_ - 8_ - 4_ - 9_) / (8_ / 2_ / 2_ / 7_ - 7_ / 6_) - 9_),
2_ - 3_ / 4_ / 9_,
(5_ / (8_ / 8_ - 7_ / 7_ - 3_ - 2_) / 4_ / (3_ / 9_ - 6_) - 4_) / ((3_ / 2_ / 6_ - 4_) / 6_ - 7_) / 2_ - (5_ / 8_ / (3_ - 7_ - 7_ - 9_) / (2_ - 7_) - 7_ / 5_) / 6_,
8_ / (9_ - 5_ / (6_ - 4_ - 6_ / 5_ / 2_ / 7_) - (7_ / 8_) / 7_ / 5_) / ((7_ - 3_ - 7_ / 8_ - 4_ - 6_) / 9_ - 7_ / 6_ / 3_ / (4_ - 7_ / 2_)) - 9_ - 3_,
(3_ / 9_ / 5_ / 5_ - 8_) - (7_ - 6_),
(2_ / 4_) - (5_ - 9_ - 8_ / 7_ - 5_ / 5_) - 9_ / (7_ - 3_ / 9_ / 3_),
6_ - 5_ - 2_ - 6_ / 6_ / 8_,
7_ - (5_ - 8_ / (3_ / 6_) / 6_ / 7_ - 2_) - 9_ / 3_,
2_ - 7_ - 9_ - (7_ - (9_ / 9_) / (9_ / 2_ - 5_)) / 5_ - 5_,
6_ / 9_,
8_ / 9_ / 8_ / 8_ / 9_ / 9_,
2_ / (9_ - (2_ - 3_ - 9_) / 7_) / 5_,
(7_ - 4_) / (9_ - 5_ - 2_),
(4_ / 2_ / 6_ / 8_ - 4_ - 8_) - 7_ - 8_ / 7_ / 2_,
(6_ / 9_ - 9_ / 7_ - (5_ - 7_ - 6_ / 9_ - 5_ / 2_) / 3_) - (2_ / 4_ - (8_ - 3_ / 2_ - 4_ - 2_ - 8_) / 9_) - (6_ / 6_ - 2_ - 6_) / 5_,
2_ - 2_,
6_ - ((5_ / 9_ / 3_ / 3_ - 7_ - 4_) - (7_ - 7_ - 9_ - 3_) - 2_ - 9_ / 5_) / 5_ / 3_,
(9_ / 8_) / (5_ - 6_ / 7_) / 2_ - (8_ / 8_ - 4_ / (3_ / 9_) / (5_ / 4_ - 8_ / 6_ / 2_)) - 5_,
9_ - 5_ - 2_ / ((9_ - 5_) / 2_) / (8_ / 5_ - 5_ / (9_ / 6_) - 7_),
3_ / 5_ / ((5_ - 9_) - (3_ - 9_ - 7_ / 7_)) - 4_,
(7_ - 4_ - 9_ - 5_ / 9_) / 5_ / 4_,
2_ - (6_ - 4_ - 6_) - (4_ / (6_ - 6_ - 7_) - 4_ - 4_ - (6_ / 8_ - 2_ / 5_ / 7_ / 9_) / 2_) - 3_ - 5_ - (8_ - 9_ - 4_),
(7_ / (8_ - 2_ / 2_ / 5_ / 7_ / 2_) / 7_) / 2_,
(4_ - (4_ - 6_ - 9_) - 6_ - (5_ - 3_ - 9_) / 5_ / 7_) - 7_ - (2_ / 6_ / 4_ - 3_ / 9_ - 5_) / 2_,
7_ - 5_ / 9_ / (7_ / 8_ / 4_ / 6_) / (4_ / 9_ / 3_ - (3_ - 6_)),
(8_ / 5_ / 9_ / 8_ - 4_) / (2_ - 7_ / 4_),
(5_ / 9_ - (9_ - 9_ / 2_) - 5_ / 4_ / 4_) / 6_ / (7_ - 4_ / 8_ / 5_ - 4_) - 4_ - 8_,
4_ - (8_ - (4_ - 3_ - 7_ - 8_ - 2_)) / 4_ / 3_ - 2_,
8_ - 8_ / (5_ / (5_ / 5_ / 9_ / 3_ / 6_ - 2_) - 7_ / 5_) / 6_ / 8_,
(7_ - (2_ / 5_ / 7_) - 9_ / 5_ - 4_) / 8_ - 4_,
(2_ - 6_ / 3_ - 8_) - (6_ / 5_) - 9_,
7_ / ((2_ - 5_) / (3_ / 9_ - 4_ - 2_ / 9_ / 9_) - 7_ / 5_ / (5_ / 7_ - 9_ - 3_ - 7_) / 4_) / 4_ / 8_ - 2_,
(4_ / 4_ - 9_ - 4_) / 4_,
4_ / (4_ / 5_ - 4_ / 9_ - (3_ - 3_)) - 7_ - 9_ / (7_ / (8_ / 9_ / 5_)) / 4_,
8_ - 8_ - 6_ - 2_,
((8_ / 6_ / 8_ - 8_ / 9_) / 8_ - 8_ - 7_ / 7_ / 2_) - 8_ / 5_ / 4_ - 5_ - 9_,
3_ / 3_ - 6_ - 5_ - 5_ / (3_ / 7_ - (5_ / 2_ / 5_) / (2_ - 2_ / 6_ - 2_ - 4_ / 3_) - 9_ / 4_),
(7_ - 5_ - 8_ / (8_ / 4_ / 8_)) - 8_ / (2_ / 5_ / 9_ - 2_) / 9_,
(7_ / 3_ / 8_ - 6_ / 8_) - 5_ - 6_ - 2_ / 2_ / (6_ - 7_),
((9_ / 6_ - 7_ - 3_ / 2_) / 6_ - 4_) - 6_,
5_ - 7_ - ((9_ - 7_ / 3_ / 2_) - (5_ / 6_ / 8_)) / (4_ / 8_ / 6_ - 6_),
3_ / 2_ / (3_ / 7_) - 7_ - ((6_ - 8_ - 4_ - 2_ - 9_) / 9_),
6_ / 5_ - 9_ - 8_,
2_ - (8_ / 9_ / 5_ - (4_ - 5_) / 7_ / (8_ - 6_ - 4_ / 9_ - 3_)) - 7_ - 8_,
7_ - 3_ / 7_ / 3_ / 5_,
(4_ - 6_ - 6_ - (3_ - 2_ - 2_ - 6_ - 2_ - 5_) - 3_) - 3_ / 6_,
(5_ - 7_ / 9_ - 5_ - (2_ / 5_ - 4_ - 4_ / 3_) / 6_) / 9_ / 6_ / 5_ - 3_ / 7_,
8_ / (7_ - 5_ / 7_ / 9_ - 8_) / 8_ / 7_,
((9_ - 8_ - 7_ / 2_ - 6_) / 3_ / 9_) / 5_ / 3_,
(9_ / (5_ - 9_ - 3_ / 7_) / 6_ - 9_ - 8_) / (4_ / 6_ / (7_ - 8_ / 7_ - 2_ - 6_ - 4_)),
5_ - (5_ / (2_ / 2_ / 7_) / 7_ / 4_),
8_ / (2_ / 8_ / (7_ / 4_)),
6_ - 7_ / 2_ / (3_ - 3_ - 9_) - (5_ / 4_ - 9_),
7_ / (2_ - 3_ - 3_ - 6_ / (6_ / 2_ - 7_ / 4_ - 2_ - 5_)) / 2_ / 5_ - 3_,
((4_ - 9_ - 4_) / 3_ - 6_ - 5_) - ((4_ - 8_ / 2_) / (7_ / 5_ - 5_) / 4_) - 4_ - 2_ / 2_ / 3_,
3_ - (8_ - 6_ - 4_ / 4_) / 3_ / ((7_ - 8_ - 9_ - 5_ - 2_ / 7_) - 6_ / (5_ - 5_ - 3_ / 5_ / 7_ - 9_)) - 5_ - 7_,
3_ - 6_ / (9_ - 4_ - 9_),
6_ - (3_ / 5_ - 8_ - 7_ / 2_),
4_ - 7_ - 6_ / 3_ / 2_ - 4_,
(9_ / 9_ - 7_) / 2_ - 6_ - ((5_ - 9_ - 4_ - 3_ / 8_ - 2_) - 5_ / (6_ / 2_ - 2_) - 2_),
4_ - (6_ - 5_ - 4_ - (8_ / 9_ / 2_)) - (7_ / 7_ / 6_ / (8_ - 6_ / 5_) - 6_) - 5_,
9_ - (6_ / 8_ - 7_ / 5_) / 8_ / (8_ - 4_ - 4_ - 9_) - 2_ - 9_,
(6_ - 2_ - 3_ / (9_ / 2_ / 8_)) / 9_ - 9_ / 8_ - 4_ / 7_,
(2_ / 5_ / 6_ / 7_ / 3_) - 8_ / 9_ - 3_,
5_ / (3_ / 5_),
9_ - 4_ / 4_ - 8_ / 7_ - ((7_ - 6_ - 2_ / 4_ - 3_) / 6_ - 9_ / 6_),
7_ / (8_ / 3_ / 2_ - 8_ - (7_ - 9_ / 4_ / 3_ / 2_)) - (4_ / 9_ - 7_ - 2_ / 5_ - 2_),
7_ - 6_ - ((2_ - 7_ / 4_) / 8_ - 6_ / 4_ / 3_) / 2_ - 2_ - ((8_ - 9_ / 8_ - 3_ - 6_) - (2_ - 2_ - 9_ / 7_ / 7_) / 3_),
7_ / (7_ / (8_ / 7_ / 2_ - 7_) - 3_ - (7_ / 3_) / 3_ / 4_) / 4_ - 9_ / 7_,
7_ / 6_ / (9_ - (5_ / 6_) - (7_ - 3_ - 9_ - 8_) - 7_ - 6_ - 7_) / (9_ - (9_ - 9_ / 7_ - 8_ / 9_) / 6_ - 5_),
(9_ - 8_ - 9_) - 9_ / 8_ / 8_ / 9_ / 6_,
2_ - 2_ - 5_ / (8_ - 9_ - 7_ / 8_ - 6_ / 5_),
3_ - 7_ - 4_ / 5_ / (4_ - 4_ / 5_ / 8_),
(4_ / (7_ / 8_) - (2_ - 6_ / 6_ / 5_)) / 2_,
(7_ / 9_ - 2_) / 7_ - 9_ / 6_ / (4_ / 9_ / (4_ - 4_ / 5_ / 4_)),
2_ / (2_ / 3_ - 7_) - 3_,
8_ - (9_ / (5_ / 9_ / 3_) / 8_) - 8_ / 9_,
8_ - (7_ - 8_) / 7_ / 9_ / ((9_ / 4_ / 7_ - 3_ / 8_ - 6_) / 3_ / 3_ / (4_ - 6_ / 7_ / 8_) / 6_) / 4_,
4_ - 7_ - 8_,
((4_ - 6_ - 3_ - 6_ / 6_) - 3_) - 4_,
4_ / (6_ / 5_ - 2_ - (4_ - 8_)) - 9_ / 4_ - 2_,
6_ - 5_,
(6_ - (3_ - 2_ / 6_ / 5_ - 4_ / 9_) / 3_ - 7_ / 3_) / 6_ / 5_ / 8_ / 2_,
6_ - 2_ / 7_ / 4_ / 4_ / (9_ / 2_ / 4_ / 9_),
8_ - 2_ - (6_ / (5_ / 9_ - 9_) / 9_ / 2_),
(7_ - 7_ - (3_ / 8_ - 2_ - 8_) / 3_ / 2_) / 5_,
((6_ / 4_ / 3_ - 3_ - 9_ / 8_) - (5_ / 4_ / 6_ / 3_) / (3_ / 4_ / 5_ / 3_) / 7_) / 7_,
3_ / 5_ / (2_ - (7_ / 9_ - 3_) - (4_ / 3_ - 9_ - 4_ - 5_)),
3_ / (6_ - 9_ / 7_) - (2_ - (4_ / 3_ - 5_ / 5_) / 7_ / 5_ / 2_ - 2_) / 8_ - 5_,
(3_ / 3_) / 3_ - 2_ / 6_ - (2_ - 5_ / 7_) - 8_,
3_ - 8_ / (3_ - 9_ - 2_ - (9_ / 6_ - 6_ - 6_ / 6_) - 8_) - (2_ / 4_ / 9_) / 4_,
6_ / 2_ - 7_ - ((7_ / 8_ - 9_ - 3_ - 3_ - 9_) / (3_ - 8_ / 5_ / 2_) - 9_ / 8_ / 4_),
3_ / ((6_ - 2_ - 5_ - 3_ - 9_ / 9_) - 3_ / 7_ - 8_ / 6_) / 9_ / (2_ / 7_ / 9_),
((8_ - 7_ - 7_ - 2_ / 7_ / 9_) - 9_ - 7_ / 7_ / 5_) - 7_,
3_ - 3_ / 9_ / 3_ - 2_ - 4_,
(5_ - 6_ / 4_ / 2_ - 2_ / 5_) - 4_ - 3_ - 5_ / (5_ / 2_ - 7_ / 8_ - 5_),
9_ - 5_ / 5_ - (4_ - 8_ - 8_ / 7_),
3_ / ((2_ - 9_) - 3_ - (3_ - 2_ / 3_ - 7_ - 9_) - 6_) - 3_ - (6_ / 9_ - 4_ - 2_) / 5_,
((8_ - 9_ - 6_ - 5_) - 2_) - 4_ / 4_ - 5_ - 2_ - (5_ / 4_ / 2_),
7_ / ((6_ - 9_ / 6_ / 4_ / 7_ / 5_) - (7_ / 6_ / 8_) - 8_),
6_ / 5_ - (9_ - 7_ / (3_ / 8_)) / 2_ / (8_ - 6_ - 9_) - (6_ - 4_ / 5_ / 6_),
((7_ / 6_ / 2_ / 8_) - 2_ - 4_ / 2_ / 3_) / 7_ - 5_,
6_ - 2_ - 8_ / (9_ - 5_ - 5_ / 6_ - (6_ - 4_) - (5_ / 7_ - 7_ - 3_)) - ((2_ - 4_ / 4_) - 2_ / 8_ - 8_ - 6_ - 7_) - 8_,
7_ - (9_ / 7_ - 7_ / 8_ / 7_) / 8_ - 6_ / 4_ / 2_,
(9_ / 5_ - 8_ / 3_ / 4_) - 2_ / ((7_ - 5_ / 6_ - 3_) / 3_ / (2_ - 5_ - 7_ - 6_ / 5_) - 7_ / (4_ - 5_ / 8_ / 3_)) - 2_ - 9_ / 7_,
6_ - 8_ / (2_ / (3_ / 7_ / 2_ / 6_ - 5_ - 2_) - 4_ / 3_ - (9_ - 3_ / 6_ / 6_ - 6_)) / 3_ - (8_ - 3_ - 2_) - (7_ - 5_ / 6_),
(3_ / 6_ - (5_ - 3_ / 3_ / 3_ - 6_ / 4_) - (5_ / 3_ - 5_ - 9_ / 6_ - 5_)) / 2_ / 3_,
8_ - (5_ - 9_ - 6_ / 2_ - 2_ / 4_) - 3_ - 5_ / 4_,
8_ - (4_ / 9_ / (7_ - 6_)) / 8_ / 5_ / (7_ / 6_ / (8_ - 7_ / 9_ / 4_ - 5_ / 9_) / 7_ - 4_) / 9_,
(2_ / 5_) - (3_ - 8_ - (4_ - 3_) - (4_ / 3_ - 5_ / 9_ - 6_ - 3_) - 9_),
(7_ / 5_ / (4_ / 7_ - 5_)) - 4_ / 9_ / 6_ / 8_ / 3_,
(2_ - 3_ / 2_ - 3_ - 7_) - 4_ - 6_ - (5_ - 5_ / 8_ / 9_ - (6_ / 8_ / 8_ / 4_ - 6_ / 6_)) - 2_ - 5_,
7_ / (7_ / 8_) - 6_ / 5_ - 6_,
(7_ - (8_ / 9_ - 3_ / 5_) - 4_ - 3_ - 2_ / (8_ - 7_ - 2_ - 8_)) / 8_ - (9_ / 6_ - 4_ - 3_ - 4_) - 9_,
8_ - 5_ - (7_ - 5_ / 3_ - 4_) / 5_ / 8_,
4_ / 9_ / (8_ - (5_ / 4_ - 6_ / 9_) - (4_ - 5_ / 4_) - (3_ / 6_ / 7_ - 4_ - 5_ / 8_) / 8_),
(3_ - (9_ / 2_ - 7_) - 4_ / 5_ - 8_) - 8_,
5_ / 9_ - 2_ - (5_ / 6_ / 4_ - 9_ / 5_) / 8_,
2_ - (2_ - 9_ - 4_ - 7_),
(5_ - 8_ / 3_ - (2_ - 8_ / 5_ - 2_ / 6_) / 8_) - ((2_ / 6_) / 7_ - 2_ - (5_ / 3_ - 3_ - 7_ - 5_) / 3_ / 4_) - 5_ - 9_ - 8_ / 9_,
(9_ - 5_ / (5_ / 3_) / 8_) / 8_,
7_ - 4_ / 7_,
4_ - ((9_ / 6_ - 7_) / 9_ / 7_ / (3_ - 9_ - 3_ - 7_ - 7_) - 6_ - 5_) - (7_ - 6_ / 5_ - 5_ / 9_) - 6_ / (4_ / 3_),
(6_ - 4_ / 7_ - (9_ / 2_ / 8_) / 5_) - 8_ / 7_ / 5_ - ((5_ / 4_ / 9_) / 9_ - 3_ - 3_) / 5_,
6_ - (5_ - 8_ - 9_ / (3_ / 3_ / 4_) / 8_) - 5_ - 3_ - (6_ / 3_ - 3_ - 9_) / (3_ / 3_ - 7_),
(8_ - 6_) - 6_ - (6_ / 5_ - (2_ - 2_) - 5_ - 9_) - (3_ - 5_ / 3_ / 4_ / 9_),
7_ / ((3_ / 6_ - 4_ - 4_ - 8_) / 4_ / 8_ / 4_ / 6_) / 7_ - (9_ / 2_ / 7_) - 4_ / 7_,
(7_ / (8_ / 6_ / 9_ / 9_ / 4_ - 8_) / 9_ / 9_ - 6_) - (2_ / (5_ - 6_) / 8_ - 8_) / ((9_ - 7_) / (7_ / 7_ / 5_)) - 5_,
4_ - (7_ - 2_ - 9_) / 9_ / 5_,
(6_ / (4_ / 7_ - 5_) - 4_ - 9_ / 3_ - 7_) / 8_,
9_ / ((5_ / 6_ - 2_ - 2_ / 8_) - 9_ / 8_) - 9_ / (7_ / 5_ / 5_) - (9_ - 5_),
7_ / 9_ - (3_ / (6_ - 3_ / 8_ / 3_) / (5_ - 2_ - 5_ - 9_) - 4_ - (9_ / 4_ / 3_ / 8_ - 5_ / 2_) / 4_) / 7_,
(2_ - 3_ / 6_) / (5_ / (6_ - 8_ - 2_ / 5_ / 6_ / 5_) / 6_ / 7_ / (9_ - 9_ - 8_ - 9_ - 3_)) - ((7_ / 3_ - 3_ - 4_ - 8_) / 4_ / 3_) / 2_ / (6_ - 3_ / 4_ / 9_ / 9_) / 3_,
8_ / (5_ / (3_ / 2_ - 6_ / 6_ / 6_) - 4_) - 7_ / 4_ - 3_,
2_ - 7_ - 7_ - (4_ / 8_) / 5_,
8_ - 9_ / 9_ - ((6_ / 4_ - 4_ - 6_ / 5_) / (4_ / 3_ / 7_ - 8_ / 3_) / 6_ / 4_ - 5_) - 9_ / 6_,
5_ / 6_ / 9_ / 7_ / (6_ - 8_ - 5_ - 7_ / 3_ / 7_) / 6_,
8_ - 8_ / 6_ / (3_ - 6_ / 4_ / 9_ - 7_) - (5_ - 3_ - (4_ - 5_ - 9_ / 2_ / 9_ / 2_) / (6_ - 2_ - 6_ / 7_ / 6_ / 6_) - (8_ / 6_) / 9_) / 7_,
9_ - (7_ - 8_) - 9_,
5_ / (5_ / 3_ / 7_ - 9_) - (5_ - (9_ - 8_ / 9_ / 2_ / 4_ - 8_) / 6_ / 5_ / 3_),
2_ / 3_ - 7_ / (3_ - (4_ / 2_) / 9_ / 7_ / 2_) - 6_ - 2_,
5_ / 3_ / (2_ / 2_ - (8_ / 6_ - 5_ / 9_ - 6_)) - 7_ / 4_,
8_ / (7_ - 7_ / (7_ / 5_ / 9_ / 6_ / 5_)) / 8_ / 2_ / 3_ - 6_,
7_ - 8_ / 8_ - (8_ / 2_ - 4_) / 8_,
2_ - 5_ / 4_ - 5_ - 9_ - (8_ - 2_ - (6_ - 7_ - 6_ / 2_ - 5_)),
8_ - 9_ - (8_ - (6_ - 7_ - 8_ - 9_ / 2_) - 5_ - 9_ / 7_ / 7_) / (8_ / 6_ - (9_ - 9_) / (8_ / 9_ / 9_) / 3_) / 8_,
(5_ / 8_ - (3_ / 4_ - 8_) - (7_ - 2_ / 8_) - 6_) / 7_ / 3_ / (6_ - (9_ / 2_) / 8_ / (7_ - 2_ / 9_ - 7_ - 8_ / 8_) / 4_) / (7_ - (7_ - 5_ - 5_) / 5_) - 3_,
6_ - (2_ / 5_ - (7_ / 3_ - 9_ / 8_ / 8_ / 5_) / 5_) / 6_ - 6_,
6_ - 9_ / 2_ - 4_ - (9_ / 3_ / 4_ / 4_) - 3_,
2_ - (6_ - 6_) / 2_ - 7_,
(7_ - 5_ / 7_) / 7_ - (5_ - (9_ / 2_ / 2_) / 4_ - 6_ - 4_ - (7_ - 8_ - 6_ / 7_ - 7_)) - 7_ / 2_ - 3_,
3_ - (9_ / 3_ / (3_ / 2_ - 3_ - 3_ - 6_ / 4_) - 2_ - 9_ / (7_ - 3_)),
((8_ - 8_ - 8_ - 4_) - 7_ / (7_ - 3_) / (3_ / 6_ - 8_ / 2_) / 5_ - 6_) - 4_,
2_ / 7_ / 5_ / 8_ - (9_ / 9_ / 6_ - (5_ / 8_ / 7_ / 3_ / 7_)),
8_ / 3_ / (9_ - 2_ / 2_ / 4_) / (5_ / 8_ - 2_),
(8_ - 7_) - ((5_ - 5_ / 7_ / 2_ - 2_) - 2_ - (8_ - 5_ / 4_) - 7_ - 2_) - (5_ / 2_ / 6_ - 8_) / 6_ - 4_ / ((9_ / 9_ / 5_) - 7_ - 8_ - 8_ - 8_),
(6_ / 7_ - 4_) - 7_ / 4_ - (4_ - (6_ - 2_ / 8_) - (3_ - 5_ / 7_) / 6_ / 6_),
(3_ - 6_ / 9_) / (6_ - 8_ / 6_) - 8_ / 5_ / 4_ - 7_,
4_ / 2_ - (6_ / 2_ / 4_ / 3_) / 6_,
8_ / (6_ - (8_ - 8_ / 6_) / 2_ / 9_) - 4_,
3_ / 7_ / 9_ / 2_ - 9_ / (5_ - (2_ / 7_ - 2_ / 5_ / 4_ / 3_)),
8_ - ((6_ - 4_ / 2_) / 2_ / 2_) - 2_ - (3_ - 3_) / 6_,
(6_ / 5_) - 8_ - 7_ / 4_,
9_ - ((3_ / 9_) / 8_ - 5_ - 8_ - 5_) / 9_ - 2_,
2_ - 3_ - (5_ - 6_),
((2_ / 4_ - 7_ / 4_) - 4_ / 8_ - (4_ - 2_)) / 8_ - 5_,
6_ - (9_ / 6_ / (8_ / 3_ / 8_ - 7_ / 4_) - 4_) / 7_,
2_ - 5_ - ((3_ / 7_ - 6_ / 6_ - 2_) - 4_) - 3_,
8_ / ((7_ / 3_ / 7_ - 7_) - (6_ - 4_ - 6_ - 3_ / 3_ / 9_)) - (8_ - (3_ - 5_ - 5_ - 6_ / 6_ - 7_) / 5_ / 4_),
6_ - 7_ / 6_ / (3_ - 2_ - 2_ - 7_ - 4_ / (4_ / 9_)) - 4_,
4_ / 4_ - 2_ - 5_ - (7_ / 7_ - (7_ / 5_) - 4_),
3_ - (9_ / 9_ - 2_ / 4_ - 5_) / 5_ / 2_ / 2_,
5_ - 3_,
4_ - (3_ - (8_ / 9_) - 4_ - 8_ / (5_ - 5_ - 4_ - 2_ / 8_) - 2_) - 6_ - 7_,
2_ / ((3_ / 9_ - 9_ - 9_ - 4_) - 6_ - 3_ / 6_ / (4_ - 8_ - 6_ - 8_)) - 8_ / 5_,
2_ / 4_ / (8_ - 3_ / 8_ - (7_ - 2_ / 5_) - 9_ - 8_) - (2_ - 6_ / 7_ / 7_) - (8_ - 3_ / 6_ / 7_ / 7_) - 7_,
3_ - (2_ - 9_ - (2_ / 2_ - 9_) - 4_) - 9_ / ((6_ - 6_ / 2_ / 5_ - 6_ / 5_) - 9_),
(3_ - 4_ / 2_) - 9_ - 9_ / 5_ - 4_,
4_ - (9_ - 9_ / (6_ - 5_ / 3_) - 2_ - 3_ / 4_) / 9_ - (7_ - 9_ / 3_ / 3_) / 2_,
7_ - 2_ / 3_ - (9_ / 3_),
(8_ - 3_ / 7_ - 4_ - 5_ / 8_) / (4_ - (8_ / 2_ - 7_) - 2_ - 8_ - 2_ / 9_) / 3_,
7_ / 9_ / 8_ / 6_ - ((2_ - 6_ - 8_) - (4_ / 9_ - 5_ - 5_ / 3_ / 6_) - 6_ / 8_) - 8_,
(4_ - 6_ / 4_ / (7_ - 9_ / 6_ / 6_)) / 2_ / 5_ - 7_ - 4_,
(2_ / 9_) - 3_ / 5_,
6_ - 7_ / 3_,
8_ / 2_ / 3_ - (5_ - 2_ - 9_ - 5_) - 5_,
3_ / 8_ / (8_ / (5_ / 8_ / 4_) / 3_ - (9_ - 7_ - 2_ - 7_ - 8_) - 7_) / 5_ - 8_ / (2_ / (7_ / 9_ - 6_ / 6_ - 6_)),
7_ - 6_ - 8_ - (8_ / 5_ / 6_ - 7_ - 4_ / 3_) - 8_ / 8_,
9_ / 9_ - 4_ - 6_ - ((3_ - 9_ - 9_ - 4_) / 2_ / 2_ / 9_) / ((9_ - 4_ - 3_ / 8_ / 3_) / 8_ - (6_ - 4_ / 2_ / 5_ / 4_) - 2_ / 5_ / 9_),
(7_ / 9_ / (4_ / 3_ / 7_ - 8_) / 2_ / (6_ - 4_ / 7_ - 8_ - 3_)) / 6_,
(3_ / (6_ / 6_ / 7_ / 9_ / 6_) - 8_ / 4_ / 6_) - 9_ - 2_ / (7_ - 2_ - 6_ - 5_ - 6_ / 9_) - ((7_ / 4_ - 7_ / 4_ - 9_ / 9_) / 6_ - 4_ - 8_ - 9_) / 4_,
9_ - (2_ - 7_ / 4_) - 6_ / 7_ / 2_,
(4_ - 5_ - 9_ / 2_ - 9_ / 2_) / 5_ - 4_ - (3_ / (2_ / 3_) / (6_ - 5_ / 5_ / 5_ / 2_ / 3_) / 5_),
8_ - 6_ - (4_ - 8_) / (3_ / 8_ / 9_ / 6_ - 3_) / (8_ - 8_),
(6_ - 5_ - 7_) / 3_ / 7_ - 4_

};
