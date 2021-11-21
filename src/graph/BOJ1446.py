# https://www.acmicpc.net/problem/1446
# 지름길

"""입력 예시
5 150
0 50 10
0 50 20
50 100 10
100 151 10
110 140 90
"""
import sys
input = sys.stdin.readline

EDGE, DISTANCE = map(int, input().split())
wayinfos = [tuple(map(int, input().split())) for _ in range(EDGE)]
distance = [i for i in range(DISTANCE+1)]


def solution():
    for now in range(DISTANCE+1):
        distance[now] = min(distance[now], distance[now-1]+1)

        for _from, to, dist in wayinfos:
            nextCost = distance[now] + dist
            if now == _from and to <= DISTANCE and nextCost < distance[to]:
                distance[to] = nextCost

    print(distance[DISTANCE])


solution()
