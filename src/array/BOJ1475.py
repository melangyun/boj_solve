# example input: 9999
# example output: 2

# example input: 122
# example output: 2

# 1. 방번호를 하나씩 돈다
# 2. 패키지에 해당 숫자가 있는지 확인한다
#  - 있을경우 패키지에 있는 숫자 사용
# 3. 6또는 9일경우 6또는 9가 있는지 확인한다
# - 6또는 9일때
#  - 6이 있을경우 6 사용
#  - 6이 없을경우 9가 있는지 확인한다
#   - 9가 있을경우 9 사용
# 4. 숫자를 사용했는가?
#    - 사용했다면 다음 숫자로 넘어간다
#    - 사용하지 않았다면 새 패키지 추가, 숫자 사용
# 5. 다음 방번호로 넘어간다


def solution():
    global plasticSet
    inputRoomNum = list(input())
    plasticSet = []
    plasticSet.append([False]*11)

    for num in inputRoomNum:
        num = int(num)
        addPackageFlag = False
        if num == 6 or num == 9:
            for package in plasticSet:
                if not package[6]:
                    package[6] = True
                    addPackageFlag = True
                    break
                elif not package[9]:
                    package[9] = True
                    addPackageFlag = True
                    break
        else:
            for package in plasticSet:
                if not package[num]:
                    package[num] = True
                    addPackageFlag = True
                    break

        if not addPackageFlag:
            plasticSet.append([False]*11)
            plasticSet[-1][num] = True

    print(len(plasticSet))


solution()
