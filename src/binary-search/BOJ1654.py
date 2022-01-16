# ParametericSearch
# 조건을 만족하는 최소/ 최대값을 구하는 문제(최적화 문제)를 결정 문제로 변환해 이분탐색을 수행하는 방법

# https://www.acmicpc.net/problem/1654
# 랜선 자르기
# https://youtu.be/3TkaOKHxHnI

# 최적화 문제를 결정 문제로 바꿀 수 있는가?
# (최적화 문제) N개를 만들 수 있는 랜선의 최대 길이
# (결정 문제) 랜선의 길이가 X일 때 랜선이 N개 이상인가 아닌가?

import sys
input = sys.stdin.readline

K, N = map(int, input().split())
WIRES = [int(input()) for _ in range(K)]


def solution():
    start = 1
    end = 2**31 - 1
    while start < end:
        # st와 en이 1차이 날 때 st가 계속 값이 똑같아 질 수 있음
        mid = (start+end+1)//2
        if isMoreThanN(mid):
            start = mid
        else:
            end = mid - 1
    print(start)


def isMoreThanN(length):
    total = 0
    for wire in WIRES:
        total += wire//length
    return total >= N


solution()
