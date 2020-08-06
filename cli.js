#!/usr/bin/env node
const spawn = require("child_process").spawn;

var args = process.argv.slice(2);

args.unshift("./index.js");
args.unshift("node");

var ganache = spawn("npx", args, {
  shell: true
})

ganache.stdout.on('data', (data) => {
  process.stdout.write(data);
});

ganache.stderr.on('data', (data) => {
  if (data.toString().indexOf("bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)" >= 0)) {
    return;
  }
  process.stderr.write(data);
});

ganache.on('close', (code) => {
  process.exit(code);
});