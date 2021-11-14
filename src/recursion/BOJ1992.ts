// https://www.acmicpc.net/problem/1992
// 쿼드 트리
export {};
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = Number(inputStrings[0]);
const map: string[][] = [];
let result = "";

init();
solution(SIZE, 0, 0);
console.log(result);

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(""));
  }
}

function solution(size: number, x: number, y: number) {
  if (size === 1 || determineValue(size, x, y)) {
    result += map[x][y];
    return;
  }

  const half = size / 2;

  result += "(";
  solution(half, x, y);
  solution(half, x, y + half);
  solution(half, x + half, y);
  solution(half, x + half, y + half);
  result += ")";
}

function determineValue(size: number, x: number, y: number) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[x][y] !== map[i][j]) return false;
    }
  }
  return true;
}
