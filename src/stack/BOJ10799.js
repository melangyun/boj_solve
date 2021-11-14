const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const blankets = require("fs").readFileSync(filePath).toString().trim();
solution(blankets);

function solution(blankets){
    // stack에는 쇠막대기가 들어감
    const stack = [];
    let answer = 0;
    for(let i = 0; i < blankets.length; i++){
        if(blankets[i] === "("){ //막대가 들어감
            stack.push(blankets[i]);
            answer++;
        }
        else if(blankets[i-1] === "(" && blankets[i] === ")"){ // 레이저라면
            stack.pop();
            answer+= stack.length -1; // 막대라고 생각한것도 빼줘야함
        }
        else if(blankets[i] === ")"){
            stack.pop();
        }
        
    }

    console.log(answer);
}