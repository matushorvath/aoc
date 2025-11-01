import re


def test(res, cur, nums):
    # print(res, cur, nums)

    if (cur == res): return True
    if (cur > res): return False
    if (len(nums) == 0): return False

    return test(res, cur + nums[0], nums[1:]) or test(res, cur * nums[0], nums[1:])


result = 0;

with open('input', 'r') as fd:
# with open('example', 'r') as fd:
    for line in fd:
        res, nums = re.search(r"(\d+): (.*)", line).groups()

        res = int(res)
        nums = [int(num) for num in nums.split(' ')]

        # print(res)
        # print(nums)

        if test(res, nums[0], nums[1:]):
            result += res

print(result)
