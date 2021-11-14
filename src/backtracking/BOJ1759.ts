export {};
// https://www.acmicpc.net/problem/1759
// 암호 만들기
// 최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성되어 있다고 알려져 있다.
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [PASSWORD_NUM, GIVEN_NUMBER] = inputStrings[0].split(" ").map(Number);
const CHARS = inputStrings[1].split(" ").sort();

const vowel = new Set(["a", "e", "i", "o", "u"]);

const picked: number[] = [];
const answer: string[] = [];

solution(0, 0, 0, 0);
console.log(answer.join("\n"));

function solution(
  startIndex: number,
  depth: number,
  vowels: number,
  consonants: number,
) {
  if (depth === PASSWORD_NUM) {
    if (vowels >= 1 && consonants >= 2) {
      answer.push(picked.join(""));
    }
    return;
  }

  for (let i = startIndex; i < GIVEN_NUMBER; i++) {
    const isVowel = vowel.has(CHARS[i]);
    picked.push(CHARS[i]);

    solution(
      i + 1,
      depth + 1,
      isVowel ? vowels + 1 : vowels,
      isVowel ? consonants : consonants + 1,
    );

    picked.pop();
  }
}
