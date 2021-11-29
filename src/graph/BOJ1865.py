# https://www.acmicpc.net/problem/1865
# 웜홀

import sys
input = sys.stdin.readline
INF = int(10e9)


def init():
    global NODE, EDGE, WARNHOLE, edges
    NODE, EDGE, WARNHOLE = map(int, input().split())
    edges = []
    for _ in range(EDGE):
        start, end, time = map(int, input().split())
        edges.append((start, end, time))
        edges.append((end, start, time))

    for _ in range(WARNHOLE):
        start, end, time = map(int, input().split())
        edges.append((start, end, -time))


def bellanFord(start):
    global NODE, edges

    shortDist = [INF] * (NODE + 1)
    shortDist[start] = 0

    for edgeCnt in range(NODE):
        for start, end, time in edges:
            if shortDist[start] != INF and shortDist[end] > shortDist[start] + time:
                shortDist[end] = shortDist[start] + time
                if edgeCnt == NODE - 1:
                    return False
    return True


def solution():
    global NODE

    TEST_CASE = int(input())
    answers = []

    for _ in range(TEST_CASE):
        init()
        for startNode in range(1, NODE+1):
            if not bellanFord(startNode):
                answers.append("YES")
                break
            elif startNode == NODE:
                answers.append("NO")

    print("\n".join(answers))


solution()
