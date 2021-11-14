export {};
const CHARNUM = +require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
const VALUES = [1, 5, 10, 50];

solution(CHARNUM);

function solution(testCase: number) {
  const visit: boolean[] = new Array(20 * 50 + 1);
  let count = 0;

  const picked: number[] = [];

  recursion(0, 0);

  function recursion(startIndex: number, depth: number) {
    if (depth === testCase) {
      const sum = picked.reduce((sum, value) => sum + value, 0);
      if (!visit[sum]) {
        visit[sum] = true;
        count++;
      }
      return;
    }

    for (let i = startIndex; i < 4; i++) {
      picked.push(VALUES[i]);
      recursion(i, depth + 1);
      picked.pop();
    }
  }

  console.log(count);
}
