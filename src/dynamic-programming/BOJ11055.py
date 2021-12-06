# https://www.acmicpc.net/problem/11055
# 가장 큰 증가 부분 수열

import sys
input = sys.stdin.readline

SIZE = int(input())
SEQ = tuple(map(int, input().split()))
dp = [0] * SIZE


def solution():
    dp[0] = SEQ[0]
    for i in range(1, SIZE):
        for j in range(i):
            if SEQ[i] > SEQ[j]:
                dp[i] = max(dp[i], dp[j])
        dp[i] += SEQ[i]
    print(max(dp))


solution()
