"""
벨만 포드 알고리즘
- 시작 정점으로 부터 다른 정점까지 최단 경로를 찾기 위한 알고리즘

1. 음수 가중치가 있는 그래프의 시작 정점에서 다른 정점까지 최단 거리를 구할 수 있다.
2. 음수 사이클 존재의 여부를 알 수 있다.

- 음수 사이클 안에서 무한으로 뺑뺑이 도는 경우를 알 수 있는 방법: 
- V(정점의 개수) 거리 값을 갱신하는 과정 -> V -1 번으로 제한

시간복잡도 O(VE)

- 시간복잡도가 O(ElogE)였던 다익스탈 알고리즘에 비해 복잡도가 더 크기는 하지만, 
    그래프에 음수 간선이 존재 할 때 사용할 수 있다는점, 음수 사이클 존재 여부를 판별할 수 있다는 점에서 유용하게 활용 할 수 있다.

"""

"""
알고리즘 프로세스

1. 시작 정점을 결정한다.
2. 시작 정점에서 각각 다른 정점까지의 거리를 무한대로 초기화 한다.
3. 현재 정점에서 모든 인접 정점을 탐색하며, 
    기존에 저장되어 있는 인접 정점까지의 거리보다 
    현재 정점을 거쳐 인접 정점에 도달하는 거리가 더 짧을 경우 짧은 거리로 갱신해준다.
4. 3번의 과정을 V-1번 반복
5. 위 과정을 모두 마치고 난 후 거리가 갱신되는 경우가 생긴다면, 음수 사이클이 존재한다는것.
"""

INF = float('inf')


def bellman_ford(graph, start):
    distance, predecessor = dict(), dict()
    # 거리값, 각 정점의 이전 정점을 저장할 딕셔너리

    for node in graph:
        distance[node] = INF
        predecessor[node] = None

    distance[start] = 0

    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbor in graph[node]:
                if distance[neighbor] > distance[node] + graph[node][neighbor]:
                    distance[neighbor] = distance[node] + graph[node][neighbor]
                    predecessor[neighbor] = node

    # 음수 사이클 존재 여부 검사: V-1번 반복 이후에도 갱신할 거리 값이 존재한다면 음수 사이클 존재
    for node in graph:
        for neighbor in graph[node]:
            if distance[neighbor] > distance[node] + graph[node][neighbor]:
                return -1, "그래프에 음수 사이클이 존재합니다."

    return distance, predecessor


"""
- 음수 사이클이 존재하지 않는 그래프
graph = {
    "A": {"B": -1, "C": 4},
    "B": {"C": 3, "D": 2, "E": 2},
    "C": {},
    "D": {"B": 1, "C": 5},
    "E": {"D": -3}
}

- 음수 사이클이 존재하는 그래프
graph = {
    'A': {'B': -1, 'C':  4},
    'B': {'C':  3, 'D':  2, 'E':  2},
    'C': {'A': -5},
    'D': {'B':  1, 'C':  5},
    'E': {'D': -3}
}

"""

graph = {
    'A': {'B': -1, 'C':  4},
    'B': {'C':  3, 'D':  2, 'E':  2},
    'C': {'A': -5},
    'D': {'B':  1, 'C':  5},
    'E': {'D': -3}
}

distance, predecessor = bellman_ford(graph, 'A')
print(distance, predecessor)
