export {};
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const LIMIT = 500;
const [TOTAL_DAY, LOOSE_WEIGHT] = inputStrings[0].split(" ").map(Number);
const KITS_NUM = TOTAL_DAY;
const KITS = inputStrings[1].split(" ").map(Number);

const visit: boolean[] = new Array(KITS_NUM);
let count = 0;

solution(0, 500);
console.log(count);

function solution(day: number, weight: number) {
  if (day === TOTAL_DAY) {
    count++;
    return;
  }

  for (let i = 0; i < KITS_NUM; i++) {
    if (visit[i]) continue;

    const nextWeight = weight + KITS[i] - LOOSE_WEIGHT;
    if (nextWeight < LIMIT) continue;

    visit[i] = true;
    solution(day + 1, nextWeight);
    visit[i] = false;
  }
}
