# https://www.acmicpc.net/problem/15486
# 퇴사 2

import sys
input = sys.stdin.readline


def solution():
    totalDay = int(input())
    dp = [0] * (totalDay + 1)
    _max = 0
    for today in range(totalDay):
        term, price = map(int, input().split())
        if term + today <= totalDay and dp[today+term] < price+_max:
            dp[today + term] = _max + price
        _max = max(_max, dp[today+1])
    print(_max)


solution()