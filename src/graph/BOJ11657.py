# https://www.acmicpc.net/problem/11657
# 타임머신

"""
입력

3 4
1 2 4
1 3 3
2 3 -1
3 1 -2

---
예제 출력
4
3
"""

import sys
input = sys.stdin.readline
INF = float("inf")
CITY_CNT, BUS_CNT = map(int, input().split())

edges = []
shortDist = [INF]*(CITY_CNT+1)
shortDist[1] = 0


def init():
    for _ in range(BUS_CNT):
        start, end, time = map(int, input().split())
        edges.append((start, end, time))


def bellanFord():
    for edgeCnt in range(CITY_CNT):
        for start, end, time in edges:
            if shortDist[start] != INF and shortDist[end] > shortDist[start] + time:
                if edgeCnt == CITY_CNT - 1:
                    return False
                shortDist[end] = shortDist[start] + time
    return True


init()
if not bellanFord():
    print(-1)
else:
    for x in shortDist[2:]:
        if x == INF:
            print(-1)
        else:
            print(x)
