# https://www.acmicpc.net/problem/1978
# 소수 찾기

import sys
input = sys.stdin.readline
input()


def solution():
    inputs = list(map(int, input().split()))
    answer = 0
    for num in inputs:
        if num == 1:
            continue
        elif num == 2:
            answer += 1
            continue

        for i in range(2, num):
            if i*i > num:
                answer += 1
                break

            if i*i <= num and num % i == 0:
                break
    print(answer)


solution()
