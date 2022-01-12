import math

A, B = map(int, input().split())

gcd = math.gcd(A, B)
lcm = int(A / gcd * B)

print(str(gcd) + "\n" + str(lcm))
