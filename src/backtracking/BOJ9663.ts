export {};

const input = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const visitH = new Array<boolean>();
const visitRightDiagonal = new Array<boolean>();
const visitLeftDiagonal = new Array<boolean>();

let count = 0;
solution(0);

console.log(count);
function solution(depth: number) {
  if (depth === input) {
    count++;
    return;
  }

  for (let i = 0; i < input; i++) {
    // 가지치기!
    if (
      visitH[i] ||
      visitRightDiagonal[i + depth] ||
      visitLeftDiagonal[depth - i + input - 1]
    ) {
      continue;
    }

    visitH[i] = true;
    visitRightDiagonal[i + depth] = true;
    visitLeftDiagonal[depth - i + input - 1] = true;
    solution(depth + 1);
    visitH[i] = false;
    visitRightDiagonal[i + depth] = false;
    visitLeftDiagonal[depth - i + input - 1] = false;
  }
}
