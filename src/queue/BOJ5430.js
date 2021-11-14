// https://www.acmicpc.net/problem/5430
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [_, ...details] = require("fs").readFileSync(filePath).toString().trim().split("\n");
for(let i = 0 ; i < details.length ; i +=3 ){
    const functions = details[i].split(""); // RDD
    const arr = JSON.parse(details[i+2].trim());// [1,2,3,4]
    solution(functions, arr);
}

// R: 뒤집기
// D: 버리기
function solution(functions, arr){
    let head = 0;
    let tail = arr.length - 1;
    let cnt = arr.length;
    let isReverse = false;

    for(const func of functions){
        if(func === "R"){
            isReverse = !isReverse
        }
        else if(cnt < 1){
            return console.log("error");
        }
        else {
            cnt--;
            isReverse ? tail-- : head++;
        }
    }

    console.log(
        isReverse 
            ? `[${arr.slice(head, tail+1).reverse().toString()}]`
            : `[${arr.slice(head, tail + 1).toString()}]`
            );
}