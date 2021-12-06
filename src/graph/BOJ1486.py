import sys

input = sys.stdin.readline
INF = int(1e9)
HEIGHT, WIDTH, DIFF_LIMIT, SUNSET = map(int, input().split())
MAX = WIDTH * HEIGHT
dh = [0, 1, 0, -1]
dw = [1, 0, -1, 0]
graph = []
shortWay = [[INF]*(MAX) for _ in range(MAX)]


def init():
    def convertHeight(value):
        code = ord(value)
        if code >= 97:
            return code - 71
        return code - 65

    for _ in range(HEIGHT):
        graph.append(tuple(map(convertHeight, input().strip())))


def floydWarshall():
    for h in range(HEIGHT):
        for w in range(WIDTH):
            here = h * WIDTH + w
            for i in range(4):
                nh = dh[i] + h
                nw = dw[i] + w
                if nh < 0 or nh >= HEIGHT or nw < 0 or nw >= WIDTH:
                    continue
                diff = graph[h][w] - graph[nh][nw]
                if abs(diff) > DIFF_LIMIT:
                    continue

                nextPosition = nh*WIDTH + nw

                if diff >= 0:  # 같거나 낮은 곳으로의 이동
                    shortWay[here][nextPosition] = 1
                else:
                    shortWay[here][nextPosition] = diff*diff

    for k in range(MAX):
        for start in range(MAX):
            for end in range(MAX):
                if start == end:
                    shortWay[start][end] = 0
                    continue
                transferCost = shortWay[start][k] + shortWay[k][end]
                if shortWay[start][end] > transferCost:
                    shortWay[start][end] = transferCost


def printAnswer():
    answer = 0
    for n in range(MAX):
        if shortWay[0][n] + shortWay[n][0] <= SUNSET:
            answer = max(answer, graph[n//WIDTH][n % WIDTH])
    print(answer)


init()
floydWarshall()
printAnswer()
