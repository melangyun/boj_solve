// https://www.acmicpc.net/problem/1926

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [numbers, ...pictureStrList] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [length, transverse] = numbers.split(" ").map(Number);
const picture = [];
pictureStrList.forEach(pictureStr => picture.push(pictureStr.split(" ").map(Number)));

class Queue {
	constructor(){
		this.queue = [];
		this.head = 0;
	}

	enqueue(x, y){
		this.queue.push({x, y});
	}

	dequeue(){
		return this.queue[this.head++];
	}

	isEmpty(){
		return this.queue.length - this.head === 0;
	}
}

solution(picture);

function solution(picture){
	const visit = Array.from(Array(length)).map(_ => Array.from(Array(transverse)).fill(false));
	const dx = [1, 0, -1, 0];
	const dy = [0, 1, 0, -1];

	let count = 0;
	let area = 0;
	let max = 0;

	const queue = new Queue();

	for(let i = 0 ; i < length ; i++){
		for(let j = 0; j < transverse; j++){
			if(picture[i][j] === 0 ||  visit[i][j]){
				continue;
			}

			count++;
			queue.enqueue(i, j);
			visit[i][j] = true;
			area = 0;

			while(!queue.isEmpty()){
				const pair = queue.dequeue();
				area++;
				for(let k = 0 ; k < 4 ; k++){
					const nx = pair.x + dx[k];
					const ny = pair.y + dy[k];
					if(nx < 0 || nx >= length || ny < 0 || ny >= transverse){
						continue;
					}

					if(picture[nx][ny] === 1 && !visit[nx][ny]){
						queue.enqueue(nx, ny);
						visit[nx][ny] = true;
					}
				}
			}

			if(area > max){
				max = area;
			}
		}
	}
	console.log(count);
	console.log(max);
}