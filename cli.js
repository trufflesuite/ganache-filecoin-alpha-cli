const spawn = require("child_process").spawn;

var args = process.argv.slice(2);

args.unshift("./index.js");
args.unshift("ts-node");

spawn("npx", args, {
  stdio: "inherit",
  shell: true
})