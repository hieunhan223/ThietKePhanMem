const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Họ tên: ", function(inputString) {
  console.log("Xin chào", inputString);
  rl.close();
});