export {};
// https://www.acmicpc.net/problem/15683
interface Node {
  height: number;
  width: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [HEIGHT, WIDTH] = inputStrings[0].split(" ").map(Number);
let map: number[][] = [];
let cctv: Node[] = [];
init();
console.log(map);
console.log(cctv);

function init() {
  map = [];
  cctv = [];
  for (let i = 1; i < inputStrings.length; i++) {
    const row = inputStrings[i].split(" ").map(Number);
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== 0 && row[j] < 6) {
        cctv.push({ height: i - 1, width: j });
      }
    }
    map.push(row);
  }
}

function solution() {}
