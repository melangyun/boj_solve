# https://www.acmicpc.net/problem/1978
# 소수 찾기

import sys
input = sys.stdin.readline
input()


def isPrime(num):
    if num == 1:
        return False
    elif num == 2:
        return True

    for i in range(2, num):
        if i*i > num:
            return True
        if i*i <= num and num % i == 0:
            return False


def solution():
    inputs = list(map(int, input().split()))
    answer = 0
    for num in inputs:
        if isPrime(num):
            answer += 1
    print(answer)


solution()
