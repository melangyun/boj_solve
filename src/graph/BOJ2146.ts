export {};

// https://www.acmicpc.net/problem/2146
const [sizeStr, ...landStr] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const land: number[][] = [];
const SIZE = Number(sizeStr);
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let minimum = -1;

type Pair = { i: number; j: number };

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

const queue = new Queue<Pair>();
init();
solution();

function init() {
  for (let i = 0; i < landStr.length; i++) {
    land.push(landStr[i].split(" ").map(Number));
  }
}

function solution() {
  // 1. 섬이 어디있는가, 어떤 섬인가 분류가 필요
  const coloredIsland = colorIsland();
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (coloredIsland[i][j] === 0) {
        continue;
      }
      queue.init();
      const bridgeLength = getBridgeLength(coloredIsland, { i, j });
      if (bridgeLength > 0) {
        minimum = bridgeLength;
      }
    }
  }
  console.log(minimum);
}

function colorIsland(): number[][] {
  const islands: number[][] = Array.from(Array(SIZE)).map(_ =>
    Array(SIZE).fill(0),
  );
  let islandFlag = 0;

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      // 바다이거나, 이미 표기된 섬이라면 패스
      if (land[i][j] === 0 || islands[i][j] !== 0) {
        continue;
      }

      queue.enqueue({ i, j });
      islands[i][j] = ++islandFlag;

      while (!queue.isEmpty()) {
        const pair = queue.dequeue();
        if (pair === null) break;

        for (let k = 0; k < 4; k++) {
          const nx = dx[k] + pair.i;
          const ny = dy[k] + pair.j;

          if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
            continue;
          }

          if (land[nx][ny] === 1 && islands[nx][ny] === 0) {
            queue.enqueue({ i: nx, j: ny });
            islands[nx][ny] = islandFlag;
          }
        }
      }
    }
  }

  return islands;
}

function getBridgeLength(
  coloredIsland: number[][],
  initLocation: Pair,
): number {
  // 2. 색칠한 섬을 돌면서 최단경로 찾기
  // 단, 최단경로만 찾으면됨
  const visitArr = Array.from(Array(SIZE)).map(_ => Array(SIZE).fill(-1));
  visitArr[initLocation.i][initLocation.j] = 0;
  queue.enqueue(initLocation);

  while (!queue.isEmpty()) {
    const pair = queue.dequeue();

    if (pair === null) {
      break;
    }

    for (let k = 0; k < 4; k++) {
      const nx = dx[k] + pair.i;
      const ny = dy[k] + pair.j;
      // 세상의 끝자락이면 패스
      if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
        continue;
      }

      // 가보지 않은 바다일때
      if (land[nx][ny] === 0 && visitArr[nx][ny] === -1) {
        queue.enqueue({ i: nx, j: ny });
        visitArr[nx][ny] = visitArr[pair.i][pair.j] + 1;
        if (minimum !== -1 && visitArr[nx][ny] > minimum) {
          // 망망 대해에서 minimum값을 넘겨버렸다면 중지
          return minimum;
        }
      }

      // 다른 대륙에 도착
      if (
        land[nx][ny] === 1 &&
        coloredIsland[nx][ny] !== coloredIsland[initLocation.i][initLocation.j]
      ) {
        return visitArr[pair.i][pair.j];
      }
    }
  }

  return -1;
}
