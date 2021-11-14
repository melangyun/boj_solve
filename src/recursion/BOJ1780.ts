export {};

const [SIZE, ...inputs] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const paper: number[][] = [];
const answer = { "-1": 0, "0": 0, "1": 0 };

init();
solution(SIZE, 0, 0);
console.log(`${answer["-1"]}\n${answer["0"]}\n${answer["1"]}`);

function init() {
  for (let i = 0; i < inputs.length; i++) {
    paper.push(inputs[i].split(" ").map(Number));
  }
}

function solution(size: number, x: number, y: number) {
  const initValue = paper[x][y];

  if (size === 1) return answer[initValue]++;

  let isUniqueValue = true;
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== initValue) {
        isUniqueValue = false;
        break;
      }
    }
    if (!isUniqueValue) break;
  }

  if (isUniqueValue) {
    return answer[initValue]++;
  }

  const division = size / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solution(division, x + division * i, y + division * j);
    }
  }
}
