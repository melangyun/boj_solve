# https://www.acmicpc.net/problem/1162
# 도로포장
""" 입력 예시
4 4 1
1 2 10
2 4 10
1 3 1
3 4 100

출력: 1
"""
import heapq
import sys

input = sys.stdin.readline
INF = int(10e9)

NODE, EDGE, MAX_PACK = map(int, input().split())
graph = [[] for _ in range(NODE + 1)]
shortDist = [[INF]*(NODE+1) for _ in range(MAX_PACK+1)]
arrivedTimes = [INF] * (MAX_PACK+1)


def init():
    for _ in range(EDGE):
        start, end, time = map(int, input().split())
        graph[start].append((end, time))
        graph[end].append((start, time))


def solution():
    priQueue = []
    heapq.heappush(priQueue, (0, 1, 0))  # (accTime, nowNode, packCnt)
    shortDist[0][1] = 0

    while priQueue:
        accTime, nowNode, packCnt = heapq.heappop(priQueue)
        # 현재 노드가 이미 처리된적 있다면 무시
        if shortDist[packCnt][nowNode] < accTime:
            continue

        for to, time in graph[nowNode]:
            nextTime = accTime + time
            if nextTime < shortDist[packCnt][to]:
                if to == NODE:
                    arrivedTimes[packCnt] = nextTime
                shortDist[packCnt][to] = nextTime
                heapq.heappush(priQueue, (nextTime, to, packCnt))
            if packCnt < MAX_PACK and accTime < shortDist[packCnt+1][to]:
                if to == NODE:
                    arrivedTimes[packCnt+1] = accTime
                shortDist[packCnt+1][to] = accTime
                heapq.heappush(priQueue, (accTime, to, packCnt+1))

    print(min(arrivedTimes))


init()
solution()
