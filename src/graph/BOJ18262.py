# https://www.acmicpc.net/problem/18262
# Milk Pumping

"""예시 입력
3 2
2 1 2 4
2 3 5 3

출력
428571
"""

import heapq
import sys
import math

input = sys.stdin.readline
INF = int(10e9)

NODE, EDGE = map(int, input().split())
graph = [[] for _ in range(NODE + 1)]
shortDist = [INF] * (NODE + 1)
# 유량 / 비용 => 최대화 대상


def init():
    for _ in range(EDGE):
        a, b, cost, flow = map(int, input().split())
        graph[a].append((b, cost, flow))
        graph[b].append((a, cost, flow))


def dijkstra():
    priQueue = []
    # (accRate, nowNode, accCost, accFlow)
    heapq.heappush(priQueue, (0, 1, 0, INF))
    shortDist[1] = 0

    while priQueue:
        accRate, nowNode, accCost, accFlow = heapq.heappop(priQueue)

        if shortDist[nowNode] < accRate:
            continue

        for to, cost, flow in graph[nowNode]:
            nextCost = accCost + cost
            nextFlow = min(flow, accFlow)
            nextRate = -math.trunc(nextFlow / nextCost * 10**6)
            if nextRate < shortDist[to]:
                shortDist[to] = nextRate
                heapq.heappush(priQueue, (nextRate, to, nextCost, nextFlow))

    print(-shortDist[-1])


init()
dijkstra()
