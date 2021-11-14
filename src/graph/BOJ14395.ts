export {};
// https://www.acmicpc.net/problem/14395
// 4연산
class Queue {
  constructor(private queue: number[] = [], private head = 0) {}

  enqueue(value: number) {
    this.queue.push(value);
  }

  dequeue(): number | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}
const [START, END] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const operations = ["*", "+", "-", "/"];
solution();

function solution() {
  if (START === END) return console.log(0);

  const queue = new Queue();
  const visit = {};

  queue.enqueue(START);
  visit[START] = " ";

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (!node) break;

    for (let i = 0; i < 4; i++) {
      const next = calculate(operations[i], node);
      if (visit[next] || !Number.isSafeInteger(next) || next < 1) continue;
      visit[next] = `${visit[node]}${operations[i]}`;
      queue.enqueue(next);
      if (next === END) {
        return console.log(visit[next].trim());
      }
    }
  }
  console.log(-1);
}

function calculate(operation: string, num: number): number {
  if (operation === "*") return num * num;
  if (operation === "+") return num + num;
  if (operation === "-") return num - num;
  return num / num;
}
