# https://www.acmicpc.net/problem/6064
# 카잉 달력
import sys
import math
input = sys.stdin.readline

TEST_CASE = int(input())


def solveCal():
    M, N, x, y = map(int, input().split())
    lcm = int(M / math.gcd(M, N) * N)

    if x == M:
        x = 0
    if y == N:
        y = 0

    for i in range(x, lcm, M):
        if i == 0:
            continue
        if i % N == y:
            return i

    return -1


def solution():
    answer = []
    for _ in range(TEST_CASE):
        answer.append(str(solveCal()))
    print("\n".join(answer))


solution()
