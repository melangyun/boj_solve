export {};
// https://www.acmicpc.net/problem/7569
// 3차원 토마토

type Node = { m: number; n: number; h: number };

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

// 가로, 세로, 높이
const [M, N, H] = inputStrings[0].split(" ").map(Number);
const tomatoes: number[][][] = [];
let tomatoesCnt = 0;
let alreadyRipeTomatoCnt = 0;
const dm = [0, 1, 0, -1, 0, 0];
const dn = [1, 0, -1, 0, 0, 0];
const dh = [0, 0, 0, 0, 1, -1];

init();
solution();

function init() {
	let row = 1;
	// 1 익은 토마토, 0 익지 않은 토마토, -1
	for (let i = 0; i < H; i++) {
		const layer: number[][] = [];
		for (let j = 0; j < N; j++) {
			layer.push(inputStrings[row++].split(" ").map(Number));
		}
		tomatoes.push(layer);
	}
}

function solution() {
	const queue = new Queue<Node>();
	const ripeTomato: number[][][] = Array.from(Array(H)).map(_ =>
		Array.from(Array(N)).map(_ => Array(M).fill(-1)),
	);
	let ripeCnt = alreadyRipeTomatoCnt;

	let lastDay = 0;

	for (let h = 0; h < H; h++) {
		for (let n = 0; n < N; n++) {
			for (let m = 0; m < M; m++) {
				if (tomatoes[h][n][m] === 1) {
					alreadyRipeTomatoCnt++;
					ripeCnt++;
					tomatoesCnt++;
					queue.enqueue({ h, n, m });
					ripeTomato[h][n][m] = 0;
				} else if (tomatoes[h][n][m] === 0) {
					tomatoesCnt++;
				}
			}
		}
	}

	if (tomatoesCnt === alreadyRipeTomatoCnt) {
		return console.log(0);
	}

	while (!queue.isEmpty()) {
		const node = queue.dequeue();
		if (node === null) break;

		for (let k = 0; k < 6; k++) {
			const nh = node.h + dh[k];
			const nn = node.n + dn[k];
			const nm = node.m + dm[k];

			if (nn < 0 || nn >= N || nm < 0 || nm >= M || nh < 0 || nh >= H) {
				continue;
			}

			if (tomatoes[nh][nn][nm] === 0 && ripeTomato[nh][nn][nm] === -1) {
				queue.enqueue({ h: nh, n: nn, m: nm });
				ripeTomato[nh][nn][nm] = ripeTomato[node.h][node.n][node.m] + 1;
				ripeCnt++;
				if (lastDay < ripeTomato[nh][nn][nm]) {
					lastDay = ripeTomato[nh][nn][nm];
				}
			}
		}
	}

	console.log(ripeCnt === tomatoesCnt ? lastDay : -1);
}
