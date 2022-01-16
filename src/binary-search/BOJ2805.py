# https://www.acmicpc.net/problem/2805
# 나무 자르기

import sys
input = sys.stdin.readline

TREE_CNT, TARGET = map(int, input().split())
TREES = list(map(int, input().split()))
TREES.sort()


def solution():
    start = 0
    end = int(2*10e9)
    while start < end:
        mid = (start+end+1)//2
        benifit = getBenefits(mid)
        if benifit < TARGET:
            end = mid-1
        else:
            start = mid
    print(start)


def getBenefits(length):
    total = 0
    for tree in TREES:
        if length >= tree:
            continue
        total += tree-length
    return total


solution()
