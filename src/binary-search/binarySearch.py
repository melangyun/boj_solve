def binarySearch(numbers, target, start, end):
    # 재귀로 이진탐색 구현
    if start > end:
        return None
    mid = (start+end) // 2

    if numbers[mid] == target:
        return mid

    # 왼쪽 확인
    elif numbers[mid] > mid:
        return binarySearch(numbers, target, start, mid-1)

    else:
        return binarySearch(numbers, target, mid+1, end)


# 반복문으로 구현
def binarySearch_loop(array, target, start, end):
    while start <= end:
        mid = (start+end) // 2
        if array[mid] == target:
            return mid
        elif array[mid] > target:
            end = mid - 1
        else:
            start = mid+1
    return None
