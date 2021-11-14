import fs from "fs";
const input = fs.readFileSync("dev/stdin").toString().split(" ");

const num = Number(input);

for(let i = 0 ; i <= num; i++){
    console.log(i);
}