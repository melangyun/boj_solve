export {};
// https://www.acmicpc.net/problem/5427
// 불

type Node = { w: number; h: number };
type Size = { W: number; H: number };
type TestCase = { size: Size; map: string[][] };
const dw = [0, 1, 0, -1];
const dh = [1, 0, -1, 0];

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

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const CNT = Number(inputStrings[0]);
const testCases: TestCase[] = [];

init();
let answer = "";
for (let i = 0; i < CNT; i++) {
  answer += `${solution(testCases[i].size, testCases[i].map)}\n`;
}
console.log(answer);

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const [W, H] = inputStrings[i].split(" ").map(Number);
    const map: string[][] = [];
    for (let j = i + 1; j <= i + H; j++) {
      map.push(inputStrings[j].split(""));
    }
    i += H;
    testCases.push({ size: { W, H }, map });
  }
}

function solution(size: Size, map: string[][]) {
  const fireVisitedArr: number[][] = Array.from(Array(size.H)).map(_ =>
    Array(size.W).fill(-1),
  );
  const humanLocation: Node = { w: -1, h: -1 };
  const queue = new Queue<Node>();
  // 불에 대한 bfs => 불은 시작점이 여러개일 수 있다. (*)
  for (let h = 0; h < size.H; h++) {
    for (let w = 0; w < size.W; w++) {
      if (map[h][w] === "*") {
        fireVisitedArr[h][w] = 0;
        queue.enqueue({ h, w });
      } else if (map[h][w] === "@") {
        humanLocation.w = w;
        humanLocation.h = h;
        if (h === 0 || h === size.H - 1 || w === 0 || w === size.W - 1) {
          return 1;
        }
      }
    }
  }

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === null) break;

    for (let i = 0; i < 4; i++) {
      const nw = dw[i] + node.w;
      const nh = dh[i] + node.h;
      if (nw < 0 || nw >= size.W || nh < 0 || nh >= size.H) {
        continue;
      }

      if (map[nh][nw] !== "#" && fireVisitedArr[nh][nw] === -1) {
        fireVisitedArr[nh][nw] = fireVisitedArr[node.h][node.w] + 1;
        queue.enqueue({ w: nw, h: nh });
      }
    }
  }

  const humanFindWay: number[][] = Array.from(Array(size.H)).map(_ =>
    Array(size.W).fill(-1),
  );

  // 상근이에 대한 bfs => 상근이는 하나이다. (@)
  queue.enqueue(humanLocation);
  humanFindWay[humanLocation.h][humanLocation.w] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nw = dw[i] + node!.w;
      const nh = dh[i] + node!.h;
      if (nw < 0 || nw >= size.W || nh < 0 || nh >= size.H) {
        continue;
      }

      if (
        map[nh][nw] === "." &&
        (fireVisitedArr[nh][nw] === -1 ||
          fireVisitedArr[nh][nw] > humanFindWay[node!.h][node!.w] + 1) &&
        humanFindWay[nh][nw] === -1
      ) {
        humanFindWay[nh][nw] = humanFindWay[node!.h][node!.w] + 1;
        queue.enqueue({ w: nw, h: nh });
        if (nh === 0 || nh === size.H - 1 || nw === 0 || nw === size.W - 1) {
          return humanFindWay[nh][nw] + 1;
        }
      }
    }
  }

  return "IMPOSSIBLE";
}
