# https://www.acmicpc.net/problem/2295
#  세 수의 합

import sys
input = sys.stdin.readline


def solution():
    TOTAL = int(input())
    numbers = []
    for _ in range(TOTAL):
        numbers.append(int(input()))
    numbers.sort()

    two = []
    for i in range(TOTAL):
        for j in range(i, TOTAL):
            two.append(numbers[i] + numbers[j])
    two.sort()
    for i in range(TOTAL-1, 0, -1):
        for j in range(i):
            if binarySearch(two, 0, len(two)-1, numbers[i]-numbers[j]):
                return print(numbers[i])


def binarySearch(array, start, end, target):
    while start <= end:
        mid = (start+end) // 2
        if array[mid] == target:
            return True
        elif array[mid] < target:
            start = mid + 1
        else:
            end = mid - 1
    return False


solution()
