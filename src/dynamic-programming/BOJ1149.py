import sys
input = sys.stdin.readline

HOUSE_CNT = int(input())
COLORS = [list(map(int, input().split())) for _ in range(HOUSE_CNT)]
dp = [COLORS[0]]


def solution():
    for i in range(1, HOUSE_CNT):
        r = min(dp[i-1][1], dp[i-1][2]) + COLORS[i][0]
        g = min(dp[i-1][0], dp[i-1][2]) + COLORS[i][1]
        b = min(dp[i-1][0], dp[i-1][1]) + COLORS[i][2]
        dp.append((r, g, b))

    print(min(dp[-1]))


solution()
