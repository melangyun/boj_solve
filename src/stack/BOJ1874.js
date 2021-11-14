const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [number, ...sequence] = require("fs").readFileSync(filePath).toString().split("\n").map(Number);
solution(number, sequence);

function solution (number, sequence){
    const stack = [];
    let result = "";
    let sequenceCount = 0;
    
    function pop(){
        stack.pop();
        result += "-\n";
        sequenceCount++;
    }

    function push(num){
        stack.push(num);
        result += "+\n";
    }

    for(let i = 1; i <= number; i++){
        push(i);
        while(1){
            if(stack[stack.length-1] === sequence[sequenceCount]) {
                pop();
                if(sequenceCount === sequence.length) break;
                
            }
            else break;
        }
    }
    
    console.log(stack.length ? "NO" : result);
}

