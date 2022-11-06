# example input
# 9
# 5 12 7 10 9 1 2 3 11
# 13


# 투포인터

import sys
input = sys.stdin.readline


def solution():
    N = int(input())
    numbers = list(map(int, input().split(" ")))
    target = int(input())

    left, right = 0, N-1
    numbers.sort()
    answer = 0

    while left < right:
        sumOfTwo = numbers[left] + numbers[right]
        if sumOfTwo == target:
            answer += 1
        elif sumOfTwo < target:
            left += 1
            continue
        right -= 1
    print(answer)


solution()
