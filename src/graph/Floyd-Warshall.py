INF = int(1e9)


NODE = int(input())
EDGE = int(input())

# 2차원 리스트를 만들고, 모든 값을 무한으로 최가화
graph = [[INF] * (NODE+1) for _ in range(NODE+1)]

# 자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
for a in range(1, NODE + 1):
    for b in range(1, NODE+1):
        if a == b:
            graph[a][b] = 0

# 각 간선에 대한 정보를 입력받아 그 값으로 초기화
for _ in range(EDGE):
    # A에서 B로 가는 비용은 C로 설정
    a, b, c = map(int, input().split())
    graph[a][b] = c

# 점화식에 따라 플로이드 워셜 알고리즘 수행
for k in range(1, NODE+1):
    for a in range(1, NODE + 1):
        for b in range(1, NODE + 1):
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])


print("=========")
# 수행된 결과를 출력
for a in range(1, NODE+1):
    for b in range(1, NODE+1):
        if graph[a][b] == INF:
            print("INFINITY", end=" ")
        else:
            print(graph[a][b], end=" ")
    print()

"""
입력
---
4
7
1 2 4
1 4 6
2 1 3
2 3 7
3 1 5
3 4 4
4 3 2

"""

# 500 이하