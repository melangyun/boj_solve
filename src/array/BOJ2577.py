import sys
input = sys.stdin.readline

A = int(input())
B = int(input())
C = int(input())

multiplicationResult = list(str(A * B * C))
result = [0] * 10

for num in multiplicationResult:
    result[int(num)] += 1

print(*result, sep='\n')
