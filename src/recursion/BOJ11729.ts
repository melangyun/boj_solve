// https://www.acmicpc.net/problem/11729
// 하이노이탑 이동 순서

// - n-1개의 원판을 기둥 1에서 2로 옮긴다.
// - n번 원판을 기둥 1에서 기둥 3으로 옮긴다.
// - n-1개의 원판을 기둥 2에서 기둥 3으로 옮긴다.
// NOTE 원판이 n-1개일 때 옮길 수 있으면 원판이 n개일 때에도 옮길 수 있다!

// step by step
// 1. 함수의 정의
// 시작기둥과 도착기둥을 인자로 받는 함수여야 함
// function(start, end, num<- 원판 갯수)
// 2. base condition
// n == 1일 때 출력
// 3. 재귀 식
// - n-1 개의 원판을 기둥 a에서 기둥 a-b로 옮긴다. func(a, 6-a-b, n-1);
// - n번 원판을 기둥 a에서 기둥 b로 옮긴다. -> print
// - n-1번 원판을 기둥 6-a-b에서 기둥 b로 옮긴다. -> func(6-a-b, b, n-1);

// 함수를 계속 따라 들어가면 정말 답이 없다. 귀납적으로 사고 할 수 있어야 한다.
// 1번 도미노를 쓰러뜨리면 모든 도미도가 쓰러진다.

export {};

const inputNumber = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let answer = "";

solution(1, 3, Number(inputNumber));
console.log(`${Math.pow(2, +inputNumber) - 1}\n${answer}`);

function solution(start: number, end: number, num: number) {
  if (num === 1) {
    answer = `${answer}${start} ${end}\n`;
    return;
  }
  const other = 6 - start - end;
  solution(start, other, num - 1);
  answer = `${answer}${start} ${end}\n`;
  solution(other, end, num - 1);
}
