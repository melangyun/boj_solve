export {};
// https://www.acmicpc.net/problem/16987
// 계란으로 계란치기
interface Egg {
  durability: number;
  weight: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const EGGS_NUM = +inputStrings[0];
const eggs: Array<Egg> = [];
let answer = 0;

init();
solution(0);
console.log(answer);

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const [durability, weight] = inputStrings[i].split(" ").map(Number);
    eggs.push({ durability, weight });
  }
}

function solution(pickedEggNum: number) {
  if (pickedEggNum === EGGS_NUM) {
    const count = eggs.reduce(
      (cnt, egg) => (egg.durability <= 0 ? cnt + 1 : cnt),
      0,
    );
    answer = Math.max(count, answer);
    return;
  }

  const pickedEgg = eggs[pickedEggNum];
  if (pickedEgg.durability <= 0) {
    solution(pickedEggNum + 1);
    return;
  }

  let isBroken = false;
  for (let i = 0; i < EGGS_NUM; i++) {
    if (pickedEggNum === i || eggs[i].durability <= 0) continue;

    isBroken = true;
    pickedEgg.durability -= eggs[i].weight;
    eggs[i].durability -= pickedEgg.weight;
    solution(pickedEggNum + 1);
    pickedEgg.durability += eggs[i].weight;
    eggs[i].durability += pickedEgg.weight;
  }

  if (!isBroken) solution(EGGS_NUM);
}
