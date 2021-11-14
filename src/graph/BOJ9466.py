# https://www.acmicpc.net/problem/9466
# 텀프로젝트

import sys
sys.setrecursionlimit(100001)
input = sys.stdin.readline


def dfs(student):
    global count
    global visit
    global finish
    visit[student] = True
    nextStudent = choice[student]

    if not visit[nextStudent]:
        dfs(nextStudent)
    elif not finish[nextStudent]:
        s = nextStudent
        count += 1
        while(s != student):
            count += 1
            s = choice[s]

    finish[student] = True


for _ in range(int(input())):
    STUDENT_CNT = int(input())
    choice = [False] + list(map(int, input().split()))
    visit = [False] * (STUDENT_CNT+1)
    finish = [False] * (STUDENT_CNT+1)
    count = 0

    for student in range(1, STUDENT_CNT+1):
        if not visit[student]:
            dfs(student)
    print(STUDENT_CNT - count)
