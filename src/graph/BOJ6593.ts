export {};
// https://www.acmicpc.net/problem/6593
// 상범빌딩
type Node = { l: number; r: number; c: number };
class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(input: T) {
    this.queue.push(input);
  }

  dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

type TestCase = {
  size: { L: number; R: number; C: number };
  map: string[][][];
  start: Node;
};

const testCases: TestCase[] = [];
const dl = [1, -1, 0, 0, 0, 0];
const dr = [0, 0, 1, -1, 0, 0];
const dc = [0, 0, 0, 0, 1, -1];

init();
testCases.forEach(testCase => solution(testCase));

function init() {
  for (let i = 0; i < inputStrings.length; i++) {
    const [L, R, C] = inputStrings[i].split(" ").map(Number);
    if (L === 0 && R === 0 && C === 0) break;

    const testCase: TestCase = {
      size: { L, R, C },
      map: [],
      start: { l: 0, r: 0, c: 0 },
    };

    for (let j = 0; j < L; j++) {
      const floor: string[][] = [];
      for (let k = 0; k < R; k++) {
        const startIndex = inputStrings[++i].indexOf("S");
        if (startIndex !== -1) {
          testCase.start = { l: j, r: k, c: startIndex };
        }
        floor.push(inputStrings[i].split(""));
      }
      i++;
      testCase.map.push(floor);
    }
    testCases.push(testCase);
  }
}

// l : 층수, r: 행, c: 열
function solution(testCase: TestCase) {
  const { start, map, size } = testCase;
  const visitMap: number[][][] = Array.from(Array(size.L)).map(_ =>
    Array.from(Array(size.R)).map(_ => Array(size.C).fill(-1)),
  );
  const queue = new Queue<Node>();
  queue.enqueue(start);
  visitMap[start.l][start.r][start.c] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    for (let i = 0; i < 6; i++) {
      const nl = node.l + dl[i];
      const nr = node.r + dr[i];
      const nc = node.c + dc[i];

      if (
        nl < 0 ||
        nl >= size.L ||
        nr < 0 ||
        nr >= size.R ||
        nc < 0 ||
        nc >= size.C
      ) {
        continue;
      }

      if (visitMap[nl][nr][nc] === -1 && map[nl][nr][nc] === ".") {
        visitMap[nl][nr][nc] = visitMap[node.l][node.r][node.c] + 1;
        queue.enqueue({ l: nl, r: nr, c: nc });
      } else if (map[nl][nr][nc] === "E") {
        return console.log(
          `Escaped in ${visitMap[node.l][node.r][node.c] + 1} minute(s).`,
        );
      }
    }
  }
  console.log("Trapped!");
}
