export {};
// https://www.acmicpc.net/problem/7562
// 나이트의 이동

type Node = { w: number; h: number };

class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(input: T) {
    this.queue.push(input);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length - this.head === 0;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const CNT = Number(inputStrings[0]);
const testCases: Array<{ size: number; location: Node; target: Node }> = [];
const dw = [1, 2, 2, 1, -1, -2, -2, -1];
const dh = [2, 1, -1, -2, -2, -1, 1, 2];

init();
for (let i = 0; i < CNT; i++) {
  const { size, location, target } = testCases[i];
  console.log(solution(size, location, target));
}

function init() {
  for (let i = 1; i < inputStrings.length; i += 3) {
    const size = Number(inputStrings[i]);
    const [w, h] = inputStrings[i + 1].split(" ").map(Number);
    const [targetW, targetH] = inputStrings[i + 2].split(" ").map(Number);
    testCases.push({
      size,
      target: { w: targetW, h: targetH },
      location: { w, h },
    });
  }
}

function solution(size: number, location: Node, target: Node) {
  const board = Array.from(Array(size)).map(_ => Array(size).fill(-1));
  const queue = new Queue<Node>();
  queue.enqueue(location);
  board[location.h][location.w] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === null) break;

    for (let i = 0; i < 8; i++) {
      const nw = dw[i] + node.w;
      const nh = dh[i] + node.h;

      if (nw >= size || nw < 0 || nh >= size || nh < 0) {
        continue;
      }

      if (board[nh][nw] === -1) {
        queue.enqueue({ h: nh, w: nw });
        board[nh][nw] = board[node.h][node.w] + 1;
      }

      if (nh === target.h && nw === target.w) {
        return board[nh][nw];
      }
    }
  }
}
