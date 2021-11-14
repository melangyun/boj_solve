export {};
// https://www.acmicpc.net/problem/2580
// 스도쿠

interface Node {
  x: number;
  y: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = 9;
const map: number[][] = [];
const putAbleMap: Array<Array<Set<number> | undefined>> = Array.from(
  Array(SIZE),
).map(_ => Array.from(Array(SIZE)));
const zeroSet = new Set<Node>();

init();
solution();
console.log(map.reduce((answer, value) => answer + value.join(" ") + "\n", ""));

function init() {
  for (let i = 0; i < inputStrings.length; i++) {
    const isAbsence = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const row: number[] = [];
    const rowZeroList: number[] = [];

    for (let j = 0; j < inputStrings[i].length; j += 2) {
      const value = +inputStrings[i][j];
      row.push(value);
      value === 0 ? rowZeroList.push(j / 2) : isAbsence.delete(value);
    }

    if (rowZeroList.length === 1) {
      row[rowZeroList[0]] = isAbsence.values().next().value;
    } else {
      rowZeroList.forEach(y => {
        zeroSet.add({ x: i, y });
        putAbleMap[i][y] = isAbsence;
      });
    }
    map.push(row);
  }
}

function solution() {
  for (let i = 0; i < 10; i++) {
    const zeroArray = [...zeroSet];
    for (const node of zeroArray) {
      if ([fillIfOne, checkX, checkY, checkZone].some(func => func(node)))
        continue;
    }
  }
}

function fillIfOne(node: Node): boolean {
  if (map[node.x][node.y]) return true;

  const set: Set<number> = putAbleMap[node.x][node.y] || new Set<number>();
  if (set.size !== 1) return false;

  fillValue(node, set.values().next().value);
  return true;
}

function checkX(node: Node): boolean {
  const isAbsence = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const zeroList: number[] = [];

  for (let x = 0; x < SIZE; x++) {
    const value = map[x][node.y];
    if (value !== 0) {
      isAbsence.delete(value);
    } else {
      zeroList.push(x);
    }
  }

  if (zeroList.length !== 1) {
    updatePutAbleMap(node, [...isAbsence]);
    return false;
  }

  fillValue(node, isAbsence.values().next().value);
  return true;
}

function checkY(node: Node): boolean {
  const isAbsence = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const zeroList: number[] = [];

  for (let y = 0; y < SIZE; y++) {
    const value = map[node.x][y];
    if (value !== 0) {
      isAbsence.delete(value);
    } else {
      zeroList.push(y);
    }
  }

  if (zeroList.length !== 1) {
    updatePutAbleMap(node, [...isAbsence]);
    return false;
  }

  fillValue(node, isAbsence.values().next().value);
  return true;
}

function checkZone(node: Node): boolean {
  const isAbsence = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const zeroList: Node[] = [];
  const startX = Math.floor(node.x / 3) * 3;
  const startY = Math.floor(node.y / 3) * 3;

  for (let x = startX; x < startX + 3; x++) {
    for (let y = startY; y < startY + 3; y++) {
      const value = map[x][y];
      if (value !== 0) {
        isAbsence.delete(value);
      } else {
        zeroList.push({ x, y });
      }
    }
  }

  if (zeroList.length !== 1) {
    updatePutAbleMap(node, [...isAbsence]);
    return false;
  }

  fillValue(node, isAbsence.values().next().value);
  return true;
}

function updatePutAbleMap(node: Node, absenceList: number[]) {
  putAbleMap[node.x][node.y] = new Set(
    [...(putAbleMap[node.x][node.y] || new Set())].filter(num =>
      absenceList.includes(num),
    ),
  );
}

function fillValue(node: Node, value: number): void {
  map[node.x][node.y] = value;
  putAbleMap[node.x][node.y] = undefined;
  zeroSet.delete(node);
}
