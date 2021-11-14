//https://www.acmicpc.net/problem/17478
// 재귀함수가 뭔가요?
export {};

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const INPUT_NUM = Number(input);
const REPEAT_STRING = "____";

console.log(`어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.
${solution(INPUT_NUM).trim()}`);

function solution(num: number): string {
  return num === 0
    ? getAnswerFirst(num) + getAnswerSecond(num)
    : getAnswerFirst(num) +
        getListen(num) +
        solution(num - 1) +
        getAnswerSecond(num);
}

function getListen(num: number) {
  const repeatedUnderBar = REPEAT_STRING.repeat(INPUT_NUM - num);
  return `${repeatedUnderBar}"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.
${repeatedUnderBar}마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.
${repeatedUnderBar}그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."\n`;
}

function getAnswerFirst(num: number) {
  return `${REPEAT_STRING.repeat(INPUT_NUM - num)}"재귀함수가 뭔가요?"\n`;
}

function getAnswerSecond(num: number) {
  const repeatedUnderBar = REPEAT_STRING.repeat(INPUT_NUM - num);
  if (num === 0) {
    return `${repeatedUnderBar}"재귀함수는 자기 자신을 호출하는 함수라네"\n${repeatedUnderBar}라고 답변하였지.\n`;
  }
  return `${repeatedUnderBar}라고 답변하였지.\n`;
}
