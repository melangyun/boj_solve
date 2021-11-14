
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = Number(inputStrings[0]);
const map= [];
let result = "";

init();
solution(SIZE, 0, 0);
console.log(result);

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(""));
  }
}

function solution(size, x, y) {
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

function determineValue(size, x, y) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (map[x][y] !== map[i][j]) return false;
    }
  }
  return true;
}
