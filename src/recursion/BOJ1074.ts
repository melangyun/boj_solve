// https://www.acmicpc.net/problem/1074
// Z
export {};

const [N, TARGET_ROW, TARGET_COLUMN] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

console.log(solution(N, TARGET_ROW, TARGET_COLUMN));

function solution(size: number, row: number, column: number) {
  if (size === 0) {
    return 0;
  }

  const half = 1 << (size - 1);

  if (row < half && column < half) {
    return solution(size - 1, row, column);
  }

  if (row < half && column >= half) {
    return half * half + solution(size - 1, row, column - half);
  }

  if (row >= half && column < half) {
    return 2 * half * half + solution(size - 1, row - half, column);
  }

  return 3 * half * half + solution(size - 1, row - half, column - half);
}
