word = input()
stack = []

for char in word:
    if len(stack) > 0 and stack[-1] == "(" and char == ")":
        stack.pop()
    else:
        stack.append(char)

print(len(stack))