export {};

const set = new Set(
  require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(value => value % 42),
);
console.log(set.size);
