# https://www.acmicpc.net/problem/12852
# 1로 만들기2

N = int(input())
dp = [i-1 for i in range(N+1)]


def findShorts():
    for i in range(2, N+1):
        dp[i] = dp[i-1] + 1

        if i % 2 == 0:
            dp[i] = min(dp[i], dp[i//2] + 1)
        if i % 3 == 0:
            dp[i] = min(dp[i], dp[i//3] + 1)

    print(dp[-1])


def findDetails(x):
    answer = []
    while(x):
        answer.append(x)
        if dp[x] == dp[x-1]+1:
            x -= 1
        elif x % 2 == 0 and dp[x] == dp[x//2] + 1:
            x = x//2
        elif x % 3 == 0 and dp[x] == dp[x//3] + 1:
            x = x//3
    print(*answer)


findShorts()
findDetails(N)
