// https://www.acmicpc.net/problem/2164
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const number = require("fs").readFileSync(filePath).toString().trim().split("\n");

solution(Number(number));

function solution(number){
    const queue = Array.from(Array(number)).map((el, i)=> i +1);
    let head = 0;
    let cnt = number;

    while(cnt !== 1){
        head+=2;
        queue.push(queue[head-1]);
        cnt--;
    }
    console.log(queue[head]);
}