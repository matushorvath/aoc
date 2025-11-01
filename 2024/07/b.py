import re


def test(res, cur, nums, way):
    #print(res, cur, nums)

    if cur > res: return False
    if len(nums) == 0:
        if cur == res:
            #print(f"> {res} = {way}")
            return True
        return False

    return test(res, cur + nums[0], nums[1:], f"{way} + {nums[0]}") \
        or test(res, cur * nums[0], nums[1:], f"{way} * {nums[0]}") \
        or test(res, int(str(cur) + str(nums[0])), nums[1:], f"{way} | {nums[0]}")


result = 0

with open('input', 'r') as fd:
#with open('test', 'r') as fd:
    for line in fd:
        res, nums = re.search(r"(\d+): (.*)", line).groups()

        res = int(res)
        nums = [int(num) for num in nums.split(' ')]

        #print(res)
        #print(nums)

        success = test(res, nums[0], nums[1:], f"{nums[0]}")
        if success: result += res

        #print(success)
        #if success: print(res, nums)

print(result)


# 945355444018064 high
