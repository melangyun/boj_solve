export {};

// https://www.acmicpc.net/problem/1012
const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const testCases: number[][][] = [];

// x : 가로 , y : 세로
for (let i = 1; i < inputStrings.length; i++) {
  const [transverse, height, cabbageNumber] = inputStrings[i]
    .split(" ")
    .map(Number);
  const space: number[][] = Array.from(Array(height)).map(_ =>
    Array(transverse).fill(0),
  );

  for (let j = 0; j < cabbageNumber; j++) {
    const [x, y] = inputStrings[++i].split(" ");
    space[+y][+x] = 1;
  }

  testCases.push(space);
}

type Pair = { x: number; y: number };

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

for (let i = 0; i < testCases.length; i++) {
  solution(testCases[i]);
}
// 배추가 없는곳은 0, 배추가 있는곳은 1, 지렁이가 있는 곳은 2
function solution(testCase: number[][]) {
  const bx = [1, 0, -1, 0];
  const by = [0, 1, 0, -1];
  const height: number = testCase.length;
  const transverse: number = testCase[0].length;
  const queue = new Queue<Pair>();
  let answer = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < transverse; x++) {
      if (testCase[y][x] === 2 || testCase[y][x] === 0) continue;

      queue.enqueue({ x, y });
      testCase[y][x] = 2;
      answer++;

      while (!queue.isEmpty()) {
        const pair = queue.dequeue();
        if (pair === null) break;

        for (let i = 0; i < 4; i++) {
          const nx = bx[i] + pair.x;
          const ny = by[i] + pair.y;
          if (nx < 0 || nx >= transverse || ny < 0 || ny >= height) {
            continue;
          }

          if (testCase[ny][nx] === 1) {
            queue.enqueue({ x: nx, y: ny });
            testCase[ny][nx] = 2;
          }
        }
      }
    }
  }

  console.log(answer);
}
