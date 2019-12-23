#include <iostream>

const uint64_t tot = 119315717514047LL;
const uint64_t cnt = 101741582076661LL;

const uint64_t mul = 37147148563639LL;
const uint64_t add = 88769760351347LL;

int main()
{
    std::cout << "cnt " << cnt << " mul " << mul << " add " << add << std::endl;

    uint64_t m2 = 1;
    uint64_t a2 = 0;

    for (uint64_t i = 0; i < cnt; i += 1) {
        if ((i & 0x7ffffffLL) == 0) std::cout << "itr " << i << " " << (double)i / cnt << std::endl;

        a2 = (a2 + m2 * add) % cnt;
        m2 = m2 * mul % cnt;

        if (m2 == 1 && a2 == 0) {
            std::cout << "brk " << i << std::endl;
            break;
        }
    }

    std::cout << "mul2 " << m2 << " add2 " << a2 << std::endl;

    return 0;
}
