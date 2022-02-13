import sys
sys.setrecursionlimit(10 ** 6)
input = sys.stdin.readline

test_case = int(input())


def post_order(pre_order, in_order):
    if len(pre_order) == 0:
        return
    if len(pre_order) == 1:
        return print(pre_order[0], end=" ")
    if len(pre_order) == 2:
        return print(pre_order[1], pre_order[0], end=" ")

    idx = in_order.index(pre_order[0])

    left_in = in_order[:idx]
    left_pre = pre_order[1:len(left_in)+1]
    post_order(left_pre, left_in)

    right_in = in_order[idx+1:]
    right_pre = pre_order[len(left_pre)+1:]
    post_order(right_pre, right_in)

    print(pre_order[0], end=" ")


def solution():
    input()
    pre_order = list(map(int, input().split()))
    in_order = list(map(int, input().split()))
    post_order(pre_order, in_order)


for _ in range(test_case):
    solution()
    print()
