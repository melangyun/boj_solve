export {};
// https://www.acmicpc.net/problem/2583
// 영역 구하기

class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(input: T) {
    this.queue.push(input);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length - this.head === 0 && this.init();
  }

  init() {
    this.queue = [];
    this.head = 0;
    return true;
  }
}

type Node = { w: number; h: number };
const dw = [0, 1, 0, -1];
const dh = [1, 0, -1, 0];

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 세로 , 가로, 직사각형 갯수
const [H, W, K] = inputStrings[0].split(" ").map(Number);
const board = Array.from(Array(H)).map(_ => Array(W).fill(0));
init();
solution();

function init() {
  for (let i = 1; i < K + 1; i++) {
    const [leftBottomW, leftBottomH, rightW, rightH] = inputStrings[i]
      .split(" ")
      .map(Number);

    for (let h = 0; h < H; h++) {
      for (let w = 0; w < W; w++) {
        if (h >= leftBottomH && h < rightH && w >= leftBottomW && w < rightW) {
          board[h][w] = 1;
        }
      }
    }
  }
}

function solution() {
  const queue = new Queue<Node>();
  const visit = Array.from(Array(H)).map(_ => Array(W).fill(false));

  let cnt = 0;
  const answer: number[] = [];

  for (let h = 0; h < H; h++) {
    for (let w = 0; w < W; w++) {
      if (visit[h][w] === true || board[h][w] === 1) {
        continue;
      }
      cnt++;
      queue.enqueue({ h, w });
      let area = 1;

      while (!queue.isEmpty()) {
        const node = queue.dequeue();
        if (node === null) break;
        for (let i = 0; i < 4; i++) {
          const nw = dw[i] + node.w;
          const nh = dh[i] + node.h;
          if (nw < 0 || nw >= W || nh < 0 || nh >= H) {
            continue;
          }

          if (visit[nh][nw] === false && board[nh][nw] === 0) {
            area++;
            queue.enqueue({ h: nh, w: nw });
            visit[nh][nw] = true;
          }
        }
      }
      answer.push(area === 1 ? 1 : area - 1);
    }
  }
  console.log(`${cnt}\n${answer.sort((a, b) => a - b).join(" ")}`);
}
