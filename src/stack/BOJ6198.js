const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [number, ...heightList] = require("fs").readFileSync(filePath).toString().split("\n").map(Number);
solution(number, heightList);

function solution(number, heightList){
    const stack = [];
    let answer = 0;
    
    for(let i = number-1 ; i >= 0 ; i--){
        
    }

    console.log(answer);
}