# https://www.acmicpc.net/problem/11659
# 구간 합 구하기

import sys
input = sys.stdin.readline

NUM_CNT, SUM_CNT = map(int, input().split())
NUMBERS = [0]+list(map(int, input().split()))
dp = [0]


def init():
    for i in range(1, NUM_CNT+1):
        dp.append(dp[-1] + NUMBERS[i])


def solution():
    answer = []
    for _ in range(SUM_CNT):
        i, j = map(int, input().split())
        answer.append(str(dp[j]-dp[i-1]))

    print("\n".join(answer))


init()
solution()
