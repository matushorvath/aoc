#include <algorithm>
#include <iostream>
#include <list>
#include <string>
#include <vector>

const std::string INPUT = "974618352";
const int N = 1000000;
const int ITERATIONS = 10000000;

std::list<int> cups;

auto circle_next(const std::list<int>::const_iterator& itr) {
    auto nextItr = std::next(itr);
    return nextItr == cups.end() ? cups.begin() : nextItr;
}

auto normalize(int value) {
    return (value + N) % N;
}

int main() {
    transform(INPUT.begin(), INPUT.end(), back_inserter(cups), [](char c) { return c - '0' - 1; });
    generate_n(back_inserter(cups), N - INPUT.size(), []() { static int i = INPUT.size(); return i++; });

    std::vector<std::list<int>::const_iterator> itrs(N);
    for (auto itr = cups.begin(); itr != cups.end(); ++itr) {
        itrs[*itr] = itr;
    }

    auto citr = cups.cbegin();

    for (int i = 0; i < ITERATIONS; ++i) {
        auto p0 = circle_next(citr);
        auto p1 = circle_next(p0);
        auto p2 = circle_next(p1);

        int dest = normalize(*citr - 1);
        while (dest == *p0 || dest == *p1 || dest == *p2) {
            dest = normalize(dest - 1);
        }
        auto ditr = itrs[dest];

        cups.splice(circle_next(ditr), cups, p0, circle_next(p2));

        citr = circle_next(citr);
    }

    auto out0 = circle_next(itrs[0]);
    auto out1 = circle_next(out0);

    std::cout << int64_t(*out0 + 1) * int64_t(*out1 + 1) << std::endl;
}
