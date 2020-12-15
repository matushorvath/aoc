#include <stdio.h>
#include <string>
#include <string.h>
#include <algorithm>
#include <vector>
#include <set>
#include <unordered_map>
#include <queue>
using namespace std;

int n, i, j, k, R, C, r, c, lo, hi, id, q;
char z, s[1000];
long long cnt;
int ip;
int a1, a3;
int a[30000010];
unordered_map <int, int> was;

int main() {
    while (scanf("%d%*c", &a[n]) == 1) {
        printf("%d %d\n", n, a[n]);
        n++;
    }
    for (i = 0; i < n - 1; i++)
        was[a[i]] = i;
    for (i = n; i < 30000000; i++) {
        if (was.find(a[i-1]) == was.end()) {
            a[i] = 0;
        } else {
            a[i] = i - was[a[i-1]] - 1;
        }

        was[a[i-1]] = i-1;
    }
        printf("%d %d\n", i-1, a[i-1]);

    return 0;
}
