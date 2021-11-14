export {};

// https://www.acmicpc.net/problem/2206
// 벽 부수고 이동하기

class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    if (this.head === 300) {
      this.head = 0;
      this.queue.splice(0, 300);
    }
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

type Node = { n: number; m: number; crashed: number };

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = inputStrings[0].split(" ").map(value => Number(value));
const map: number[][] = [];
const dn = [1, -1, 0, 0];
const dm = [0, 0, 1, -1];

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split("").map(Number));
  }
}

// map의 0은 이동할 수 있는곳, 1은 벽이 있는 곳
function solution() {
  const visit: number[][][] = Array.from(Array(2)).map(_ =>
    Array.from(Array(N)).map(_ => Array(M).fill(-1)),
  );

  const queue = new Queue<Node>();

  visit[0][0][0] = 0;
  queue.enqueue({ n: 0, m: 0, crashed: 0 });
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    if (node.n === N - 1 && node.m === M - 1) {
      return console.log(visit[node.crashed][node.n][node.m] + 1);
    }

    for (let i = 0; i < 4; i++) {
      const nn = node.n + dn[i];
      const nm = node.m + dm[i];

      if (nm < 0 || nm >= M || nn < 0 || nn >= N) continue;
      if (visit[node.crashed][nn][nm] !== -1) continue;

      if (map[nn][nm] === 0) {
        visit[node.crashed][nn][nm] = visit[node.crashed][node.n][node.m] + 1;
        queue.enqueue({ n: nn, m: nm, crashed: node.crashed });
      } else if (map[nn][nm] === 1) {
        if (node.crashed) continue;
        visit[1][nn][nm] = visit[node.crashed][node.n][node.m] + 1;
        queue.enqueue({ n: nn, m: nm, crashed: 1 });
      }
    }
  }
  console.log(-1);
}
