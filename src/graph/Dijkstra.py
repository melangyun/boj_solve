# 파이썬에서 heapq는 별개의 자료구조가 아닌것에 유의해야 한다.
import heapq
import sys

input = sys.stdin.readline
INF = int(10e9)

node, edge = map(int, input().split())
startNode = int(input())

graph = [[] for _ in range(node + 1)]
shortestDistacne = [INF] * (node+1)


def init():
    for _ in range(edge):
        _from, to, cost = map(int, input().split())
        graph[_from].append((to, cost))


def dijkstra(start):
    heap = []
    heapq.heappush(heap, (0, start))

    shortestDistacne[start] = 0
    while heap:
        dist, now = heapq.heappop(heap)
        # 현재 노드가 이미 처리된적 있다면 무시
        if shortestDistacne[now] < dist:
            continue

        for to, cost in graph[now]:
            newCost = dist + cost
            # 현재 노드를 거쳐, 다른 노드로 이동하는 거리가 더 짧은 경우
            if newCost < shortestDistacne[to]:
                shortestDistacne[to] = newCost
                heapq.heappush(heap, (newCost, to))


init()
dijkstra(startNode)
for i in range(1, node+1):
    if shortestDistacne[i] == INF:
        print("INFINITY")
    else:
        print(shortestDistacne[i])

""" 입력 예시
6 11
1
1 2 2
1 3 5
1 4 1
2 3 3
2 4 2
3 2 3
3 6 5
4 3 3
4 5 1
5 3 1
5 6 2
"""
