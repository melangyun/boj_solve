# 파이썬 sort 시간복잡도 (O NlogN)
# list.sort()
# list.sort(reverse=True)
# 기본값은 오름차순, reverse=True는 내림차순

# 선형탐색 O(n^2)
# 정렬 + 이분탐색: O(NlogN + MlogN)

# https://www.acmicpc.net/problem/1920
# 수 찾기

import sys
input = sys.stdin.readline


def binarySearch(start, end, target):
    while start <= end:
        mid = (start+end) // 2
        if numbers[mid] == target:
            return "1"
        elif numbers[mid] < target:
            start = mid + 1
        else:
            end = mid - 1
    return "0"


def solution():
    global numbers
    input()
    numbers = list(map(int, input().split()))
    numbers.sort()
    input()
    targets = list(map(int, input().split()))
    answer = []
    for target in targets:
        answer.append(binarySearch(0, len(numbers)-1, target))

    print("\n".join(answer))


solution()
