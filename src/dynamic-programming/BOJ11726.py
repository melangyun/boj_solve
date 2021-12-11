# https://www.acmicpc.net/problem/11726
# 2xn 타일링

n = int(input())

dp = [0, 1, 2, 3]


def solution():
    if n > 3:
        for i in range(4, n+1):
            dp.append((dp[i-1]+dp[i-2]) % 10007)
    return dp[n]


print(solution())
