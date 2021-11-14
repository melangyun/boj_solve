export {};
// https://www.acmicpc.net/problem/2468
// 안전 영역
class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head && this.init();
  }

  init(): true {
    this.queue = [];
    this.head = 0;
    return true;
  }
}

type Node = { h: number; w: number };

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = Number(inputStrings[0]);
const map: number[][] = [];
let MIN = 0;
let MAX = 0;
const dw = [0, 1, -1, 0];
const dh = [1, 0, 0, -1];

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(" ").map(Number));
  }
  const flatMap = map.flat();
  MAX = Math.max(...flatMap);
  MIN = Math.min(...flatMap);
}

function solution() {
  const answer: number[] = [];
  const queue = new Queue<Node>();
  for (let rain = MIN; rain < MAX; rain++) {
    const visitMap = Array.from(Array(SIZE)).map(_ => Array(SIZE).fill(-1));
    let cnt = 0;
    for (let h = 0; h < SIZE; h++) {
      for (let w = 0; w < SIZE; w++) {
        // 이미 방문했거나, 침수된 지역이라면 패쓰
        if (visitMap[h][w] !== -1 || map[h][w] <= rain) {
          continue;
        }

        queue.enqueue({ h, w });
        visitMap[h][w] = ++cnt;

        while (!queue.isEmpty()) {
          const node = queue.dequeue();
          if (node === undefined) break;

          for (let i = 0; i < 4; i++) {
            const nw = node.w + dw[i];
            const nh = node.h + dh[i];
            if (nw < 0 || nw >= SIZE || nh < 0 || nh >= SIZE) {
              continue;
            }

            if (visitMap[nh][nw] === -1 && map[nh][nw] > rain) {
              queue.enqueue({ h: nh, w: nw });
              visitMap[nh][nw] = cnt;
            }
          }
        }
      }
    }
    answer.push(cnt);
  }
  console.log(Math.max(...answer));
}
