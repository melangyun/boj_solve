// https://www.acmicpc.net/problem/8111
// 0과 1

export {};

class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }

  dequeue(): undefined | T {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }
}

type Pair = { num: number; str: string };
const [_, ...TestCases] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

console.log(
  TestCases.reduce(
    (answer: string, testCase: number) => `${answer}${solution(testCase)}\n`,
    "",
  ),
);

function solution(input: number): string {
  if (input === 1) return "1";

  const visit = {};
  const queue = new Queue<Pair>();

  queue.enqueue({ num: 1, str: "1" });
  visit[1] = true;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    for (let i = 0; i < 2; i++) {
      const next = (node!.num * 10 + i) % input;
      if (visit[next]) continue;
      const nextNumStr = `${node!.str}${i}`;

      if (next === 0) {
        return nextNumStr;
      }

      visit[next] = true;
      queue.enqueue({ num: next, str: nextNumStr });
    }
  }

  return "BRAK";
}
