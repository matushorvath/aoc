#include <cstring>
#include <iostream>
#include <map>

using namespace std;

//const char* input = "389125467"; const int N = 9; const int T = 100;
//const char* input = "974618352"; const int N = 9; const int T = 100;

//const char* input = "389125467"; const int N = 1000000; const int T = 10000000;
const char* input = "974618352"; const int N = 1000000; const int T = 10000000;

int c[N];

int get(int i) {
    return c[(i + N) % N];
}

void set(int i, int v) {
    c[(i + N) % N] = v;
}

void print_cups(int cidx = -1) {
    for (int i = 0; i < N; ++i) {
        if (i != 0) {
            cout << ' ';
        }
        if (i == cidx) {
            cout << '(' << c[i] + 1 << ')';
        } else {
            cout << c[i] + 1;
        }
    }
}

int main() {
    for (int i = 0; i < N; ++i) {
        c[i] = i;
    }

    for (int i = 0; i < strlen(input); ++i) {
        c[i] = input[i] - '0' - 1;
    }

    // for (int i = 0; i < N; ++i) {
    //     cout << c[i] << ", ";
    // }
    // cout << endl;

    map<int, int> didx_cache;

    int cidx = 0;

    for (int i = 0; i < T; ++i) {
        int p0 = get(cidx + 1);
        int p1 = get(cidx + 2);
        int p2 = get(cidx + 3);

        // TODO cache last position of dest? move +3 index to find it?
        int dest = (get(cidx) + N - 1) % N;

        while (dest == p0 || dest == p1 || dest == p2) {
            dest = (dest + N - 1) % N;
        }

        int didx_hint = 0;
        auto itr = didx_cache.find(dest);
        if (itr != didx_cache.end()) {
            didx_hint = itr->second;
        }

        int didx;
        for (int j = 0; j < N; ++j) {
            int idx = (j + didx_hint + N) % N;
            if (c[idx] == dest) {
                didx = idx;
                break;
            }
        }
        didx_cache[dest] = didx;

        // cout << "-- move " << i + 1 << " --" << endl;
        if (i % 10000 == 0) cout << i << endl;
        // cout << "cups: ";
        // print_cups(cidx);
        // cout << endl << endl;
        //console.log('pick up:', p.map(n => n + 1).join(', '));
        //console.log('destination:', dest + 1, didx);
        //console.log();

        for (int j = (cidx + N) % N; j != (didx + N) % N; j = (j + N - 1) % N) {
            set(j + 3, get(j));
        }
        set(didx + 3, p2);
        set(didx + 2, p1);
        set(didx + 1, p0);

        cidx = (cidx + N + 4) % N;
    }

    //console.log('cups:', c.map((x, n) => n === cidx ? `(${x + 1})` : `${x + 1}`).join(' '));

    int oidx;
    for (int j = 0; j < N; ++j) {
        if (c[j] == 0) {
            oidx = j;
            break;
        }
    }

    print_cups();
    cout << endl;

    cout << get(oidx+ 1) + 1 << ", " << get(oidx + 2) + 1 << endl;
}
