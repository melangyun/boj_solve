// https://www.acmicpc.net/problem/2447
// 별 찍기
export {};
const SIZE = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const map = Array.from(Array(SIZE), () => Array.from(Array(SIZE), () => "*"));

solution(0, 0, SIZE);
printAnswer();

function solution(w: number, h: number, size: number) {
  if (size === 1) return;

  const oneThird = size / 3;
  punchHole(w + oneThird, h + oneThird, oneThird);

  solution(w, h, oneThird);
  solution(w + oneThird, h, oneThird);
  solution(w + oneThird * 2, h, oneThird);

  solution(w, h + oneThird, oneThird);
  solution(w + oneThird * 2, h + oneThird, oneThird);

  solution(w, h + oneThird * 2, oneThird);
  solution(w + oneThird, h + oneThird * 2, oneThird);
  solution(w + oneThird * 2, h + oneThird * 2, oneThird);
}

function punchHole(w: number, h: number, size: number) {
  for (let i = w; i < w + size; i++) {
    for (let j = h; j < h + size; j++) {
      map[i][j] = " ";
    }
  }
}

function printAnswer() {
  let answer = "";
  for (let i = 0; i < SIZE; i++) {
    answer += `${map[i].join("")}\n`;
  }

  console.log(answer);
}
