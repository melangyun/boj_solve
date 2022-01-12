# https://www.acmicpc.net/problem/6064
# 카잉 달력
import sys
import math
input = sys.stdin.readline

TEST_CASE = int(input())


def solveCal():
    M, N, x, y = map(int, input().split())
    lcm = int(M / math.gcd(M, N) * N)

    yearSet = set()
    for i in range(0, lcm, M):
        yearSet.add(i+x)
    for i in range(0, lcm, N):
        if i + y in yearSet:
            return i + y

    return -1


def solution():
    answer = []
    for _ in range(TEST_CASE):
        answer.append(str(solveCal()))
    print("\n".join(answer))


solution()
