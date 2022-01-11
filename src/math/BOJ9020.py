# https://www.acmicpc.net/problem/9020
# 골드바흐의 추측

import sys
input = sys.stdin.readline

TEST_CASE = int(input())
LIMIT = 10000

Erato = [False, False] + [True] * (LIMIT - 1)
Primes = []


def solveErato():
    for i in range(2, LIMIT+1):
        if not Erato[i]:
            continue
        Primes.append(i)

        for j in range(2*i, LIMIT+1, i):
            Erato[j] = False


def getGoldBah():
    num = int(input())
    answerDiff = LIMIT
    for prime in Primes:
        diff = abs(2*prime-num)
        if diff >= answerDiff:
            break
        if Erato[prime] and Erato[num-prime] and diff < answerDiff:
            answer = prime, num-prime
            answerDiff = diff

    return str(answer[0]) + " " + str(answer[1])


def solution():
    solveErato()
    answer = []
    for _ in range(TEST_CASE):
        answer.append(getGoldBah())
    print("\n".join(answer))


solution()
