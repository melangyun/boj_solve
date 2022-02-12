# 이중 우선순위 큐
# https://www.acmicpc.net/problem/7662

# 1. 데이터를 삽입하는 연산
# 2. 데이터를 삭제하는 연산
# - 1) 우선순위가 가장 높은 것을 삭제하기 위한것
# - 2) 우선순위가 가장 낮은 것을 삭제하기 위한것

# 정수만 저장하는 이중 우선순위 큐

# 큐에 적용될 일렬의 연산이 주어질 때 이를 처리한 후 최종적으로 큐에 저장된 데이터 중 최댓값과 최소값을 출력

import sys
import heapq
input = sys.stdin.readline
INF = int(10e9)

T = int(input())


def init():
    global minHeap
    global maxHeap
    global visit

    minHeap = []
    maxHeap = []
    visit = [0] * 1_000_001


def deleteMaxValue():
    while maxHeap:
        maxValue = heapq.heappop(maxHeap) * -1
        if visit[maxValue] <= 0:
            continue
        visit[maxValue] -= 1
        return maxValue


def deleteMinValue():
    while minHeap:
        minValue = heapq.heappop(minHeap)
        if visit[minValue] <= 0:
            continue
        visit[minValue] -= 1
        return minValue


def solution():
    k = int(input())
    init()
    cnt = 0
    for _ in range(k):
        c, n = input().split()
        intN = int(n)
        if c == "I":
            heapq.heappush(minHeap, intN)
            heapq.heappush(maxHeap, intN * -1)
            visit[intN] += 1
            cnt += 1
        else:
            if not cnt:
                continue
            cnt -= 1
            if n == "1":
                # D 1 => 최댓값을 삭제하는 연산
                deleteMaxValue()
            elif n == "-1":
                # D -1 => 최솟값을 삭제하는 연산
                deleteMinValue()
    if cnt == 0:
        return "EMPTY"
    if cnt == 1:
        maxValue = deleteMaxValue()
        return str(maxValue)+" " + str(maxValue)
    else:
        maxValue = deleteMaxValue()
        minValue = deleteMinValue()
        return str(maxValue)+" " + str(minValue)


answer = []
for _ in range(T):
    answer.append(solution())
print("\n".join(answer))
