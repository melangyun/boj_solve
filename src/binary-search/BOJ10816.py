# https://www.acmicpc.net/problem/10816
# 숫자 카드2

import sys
input = sys.stdin.readline

input()
numbers = list(map(int, input().split()))
numbers.sort()
input()
targets = list(map(int, input().split()))


def solution():
    answers = []
    for target in targets:
        start = 0
        end = len(numbers)
        answer = getLastIdx(start, end, target) - \
            getStartIdx(start, end, target)
        answers.append(str(answer))
    print(" ".join(answers))


def getStartIdx(start, end, target):
    while start < end:
        mid = (start+end) // 2
        if numbers[mid] >= target:
            end = mid
        else:
            start = mid + 1

    return start


def getLastIdx(start, end, target):
    while start < end:
        mid = (start+end) // 2
        if numbers[mid] > target:
            end = mid
        else:
            start = mid + 1
    return start


solution()
