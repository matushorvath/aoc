#include <cstring>
#include <iostream>
#include <map>
#include <list>

using namespace std;

//const char* input = "389125467"; const int N = 9; const int T = 100;
//const char* input = "974618352"; const int N = 9; const int T = 100;

//const char* input = "389125467"; const int N = 1000000; const int T = 10000000;
const char* input = "974618352"; const int N = 1000000; const int T = 10000000;

list<int> c;

void print_cups(int curr = -1) {
    for (auto&& i : c) {
        if (i != c.front()) {
            cout << ' ';
        }
        if (i == curr) {
            cout << '(' << i + 1 << ')';
        } else {
            cout << i + 1;
        }
    }
}

auto next_itr(const list<int>::iterator& itr) {
    auto res = itr;
    res++;

    if (res == c.end()) {
        res = c.begin();
    }
    return res;
}

int main() {
    int inputLen = strlen(input);
    for (int i = 0; i < inputLen; ++i) {
        c.push_back(input[i] - '0' - 1);
    }
    for (int i = inputLen; i < N; ++i) {
        c.push_back(i);
    }

    // for (auto& i : c) {
    //     cout << i + 1 << ", ";
    // }
    // cout << endl;

    map<int, list<int>::iterator> ditrs;
    for (auto itr = c.begin(); itr != c.end(); ++itr) {
        ditrs[*itr] = itr;
    }

    auto citr = c.begin();

    for (int i = 0; i < T; ++i) {
        auto p0 = next_itr(citr);
        auto p1 = next_itr(p0);
        auto p2 = next_itr(p1);

        int dest = (*citr + N - 1) % N;

        while (dest == *p0 || dest == *p1 || dest == *p2) {
            dest = (dest + N - 1) % N;
        }

        auto ditr = ditrs[dest];
        // if (*ditr != dest) {
        //     cout << "whoops" << endl;
        // }

        // if (i % 10000 == 0) cout << i << endl;
        // cout << "-- move " << i + 1 << " --" << endl;
        // cout << "cups: ";
        // print_cups(*citr);
        // cout << endl;
        // cout << "pick up: " << *p0 + 1 << ", " << *p1 + 1 << ", " << *p2 + 1 << endl;
        // cout << "destination: " << dest + 1 << endl << endl;

        list<int> tmp;
        tmp.splice(tmp.end(), c, p0);
        tmp.splice(tmp.end(), c, p1);
        tmp.splice(tmp.end(), c, p2);
        c.splice(next_itr(ditr), tmp, tmp.begin(), tmp.end());

        citr = next_itr(citr);
    }

    //console.log('cups:', c.map((x, n) => n === citr ? `(${x + 1})` : `${x + 1}`).join(' '));

    list<int>::iterator oitr;
    for (auto itr = c.begin(); itr != c.end(); ++itr) {
        if (*itr == 0) {
            oitr = itr;
            break;
        }
    }

    // print_cups();
    // cout << endl;

    auto out0 = next_itr(oitr);
    auto out1 = next_itr(out0);

    cout << *out0 + 1 << ", " << *out1 + 1 << endl;
    cout << int64_t(*out0 + 1) * int64_t(*out1 + 1) << endl;
}
