# https://www.acmicpc.net/problem/18870
# 좌표 압축

input()
numbers = list(map(int, input().split()))
uniqueList = sorted(set(numbers))


def solution():
    answers = []
    for number in numbers:
        answers.append(str(binarySearch(0, len(uniqueList)-1, number)))
    print(" ".join(answers))


def binarySearch(start, end, target):
    while start <= end:
        mid = (start+end) // 2
        if uniqueList[mid] == target:
            return mid
        elif uniqueList[mid] < target:
            start = mid + 1
        else:
            end = mid-1

    return -1


solution()
