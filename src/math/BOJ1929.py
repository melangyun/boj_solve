# https://www.acmicpc.net/problem/1929
# 소수 구하기

start, end = map(int, input().split())
Erato = [False, False] + [True] * (end - 1)
primes = []
flag = -1

for i in range(2, end+1):
    if not Erato[i]:
        continue

    if flag == -1 and i >= start:
        flag = len(primes)
    primes.append(str(i))

    for j in range(2*i, end+1, i):
        Erato[j] = False

print("\n".join(primes[flag:]))
