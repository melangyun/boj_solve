# https://www.acmicpc.net/problem/9095
# 1, 2, 3 더하기

import sys
input = sys.stdin.readline

dp = [0, 1, 2, 4, 7]
TEST_CASE = int(input())


def init():
    for i in range(5, 12):
        dp.append(dp[i-1] + dp[i-2] + dp[i-3])


def solution():
    for _ in range(TEST_CASE):
        print(dp[int(input())])


init()
solution()
