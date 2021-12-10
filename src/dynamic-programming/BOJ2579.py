# https://www.acmicpc.net/problem/2579
# 계단 오르기

import sys
input = sys.stdin.readline

STAIRS_NUM = int(input())
STAIRS = [int(input()) for _ in range(STAIRS_NUM)]
dp = [[0, 0] for _ in range(STAIRS_NUM)]


def solution():
    if len(STAIRS) == 1:
        return STAIRS[0]

    dp[0] = [STAIRS[0], 0]
    dp[1] = [STAIRS[1], 0]
    for i in range(STAIRS_NUM):
        if i+1 < STAIRS_NUM:
            dp[i+1][1] = max(dp[i + 1][1], dp[i][0] + STAIRS[i+1])
        if i + 2 < STAIRS_NUM:
            dp[i+2][0] = max(dp[i+2][0], max(dp[i]) + STAIRS[i+2])
    return max(dp[-1])


print(solution())
