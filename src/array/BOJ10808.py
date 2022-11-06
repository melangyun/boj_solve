word = list(input())
result = [0] * 26
for char in word:
    result[ord(char) - 97] += 1
print(*result)
