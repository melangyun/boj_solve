from collections import deque
import sys

input = sys.stdin.readline

V = int(input())
graph = [[] for _ in range(V+1)]

for _ in range(V):
    numbs = list(map(int, input().split()))
    for i in range(1, len(numbs), 2):
        if numbs[i] != -1:
            graph[numbs[0]].append((numbs[i], numbs[i+1]))


def bfs(start):
    visit = [-1] * (V+1)

    queue = deque()
    queue.append(start)

    visit[start] = 0
    _max = [0, 0]

    while queue:
        node = queue.popleft()
        for nxt, cost in graph[node]:
            if visit[nxt] != -1:
                continue
            visit[nxt] = visit[node] + cost
            queue.append(nxt)
            if _max[0] < visit[nxt]:
                _max = visit[nxt], nxt
    return _max


dis, node = bfs(1)
dis, node = bfs(node)
print(dis)
