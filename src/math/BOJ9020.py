# https://www.acmicpc.net/problem/9020
# 골드바흐의 추측

import sys
input = sys.stdin.readline

TEST_CASE = int(input())
LIMIT = 10000


def getGoldBah():
    gold = int(input())
    Erato = [False, False] + [True] * (gold - 1)
    Primes = []

    for i in range(2, gold+1):
        if not Erato[i]:
            continue
        Primes.append(i)

        for j in range(2*i, gold+1, i):
            Erato[j] = False

    answerDiff = LIMIT
    for prime in Primes:
        diff = abs(2*prime-gold)
        if diff >= answerDiff:
            break
        if Erato[prime] and Erato[gold-prime] and diff < answerDiff:
            answer = prime, gold-prime
            answerDiff = diff

    return str(answer[0]) + " " + str(answer[1])


def solution():
    answer = []
    for _ in range(TEST_CASE):
        answer.append(getGoldBah())
    print("\n".join(answer))


solution()
