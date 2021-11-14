const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [number, centers] = require("fs").readFileSync(filePath).toString().split("\n");
solution(number, centers.split(" ").map(Number));

function solution(number, centers){
    const stack = [];
    const answer = [];

    for (let i = 0 ; i < number ; i++){
        while(stack.length > 0){
            if(stack[stack.length-1].height >= centers[i]){
                answer.push(stack[stack.length-1].number);
                break;
            }
            stack.pop();
        }

        if(stack.length < 1){
            answer.push(0);
        }

        stack.push({number: i + 1 , height: centers[i]});
    }

    console.log(answer.join(" "));
}


// https://moonsbeen.tistory.com/204?category=1184369