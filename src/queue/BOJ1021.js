// https://www.acmicpc.net/problem/1021

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputs = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [size, _] = inputs[0].trim().split(" ").map(Number);
const targetLocations = inputs[1].trim().split(" ").map(Number);

solution(size, targetLocations);

function solution(size, targetLocations){
    const queue = Array.from(Array(size)).map((_, i) => i + 1);

    let exit = 0;
    let cnt = 0;
    targetLocations.forEach(location => {
        const index = queue.indexOf(location);
        const shortCut = Math.abs(exit - index) > queue.length - Math.abs(exit - index) 
            ? queue.length - Math.abs(exit - index)
            : Math.abs(exit - index);
        cnt+= shortCut;
        exit = index;
        queue.splice(index, 1);
    });

    console.log(cnt);
}