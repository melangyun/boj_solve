const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [num, people] = require("fs").readFileSync(filePath).toString().trim().split("\n");
solution(Number(num), people.split(" ").map(Number));

function solution(num, people){
    const stack = [];

    for(let i = 1 ; i <= num ; i++){
        while(true){
            if(stack[stack.length-1] === i){
                stack.pop();
                break;
            }
            if(people.length === 0){
                return console.log("Sad");
            }
            const person = people.shift();
            if(person === i){
                break;
            }
            stack.push(person);
        }
    }
    console.log(stack.length > 0 ? "Sad" : "Nice");
}