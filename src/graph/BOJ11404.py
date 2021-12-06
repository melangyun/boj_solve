import sys

input = sys.stdin.readline
INF = int(1e9)
CITY_NUM = int(input())
BUS_NUM = int(input())
graph = [[INF] * (CITY_NUM) for _ in range(CITY_NUM)]


def init():
    for _ in range(BUS_NUM):
        start, end, cost = map(int, input().split())
        graph[start-1][end-1] = min(graph[start-1][end-1], cost)


def floydWarshall():
    for target in range(CITY_NUM):
        for start in range(CITY_NUM):
            for end in range(CITY_NUM):
                if start == end:
                    graph[start][end] = 0
                    continue
                graph[start][end] = min(
                    graph[start][end], graph[target][end] + graph[start][target])


def printAnswer():
    answer = []
    for start in range(CITY_NUM):
        for end in range(CITY_NUM):
            if graph[start][end] == INF:
                answer.append("0 ")
            else:
                answer.append(str(graph[start][end]))
                answer.append(" ")
        answer.append("\n")

    print("".join(answer))


init()
floydWarshall()
printAnswer()
