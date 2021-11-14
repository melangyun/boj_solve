import { createInterface } from 'readline';

const r1 = createInterface({input: process.stdin, output: process.stdout});

const input = [];

r1.on("line", (line)=> {input.push(line)})
.on("close", () => {
    console.log(input);
    process.exit();
})