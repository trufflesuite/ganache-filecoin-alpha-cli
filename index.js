const Ganache = require("ganache-core");

const {argv} = require('yargs')

console.log("/* ")
console.log(" * Welcome to Ganache+Filecoin early-access! Once stable, this package will be deprecated and replaced by `ganache-cli`.")
console.log(" * ") 
console.log(" * Please file issues at: https://github.com/trufflesuite/ganache-cli/issues");
console.log(" */")
console.log("")
console.log("Starting Filecoin and IPFS simulator...")

let options = {
  flavor: "filecoin",
  ipfsPort: argv.ipfsPort || 5001,
  blockTime: argv.tipsetTime || 0,
  seed: argv.seed || undefined,
  logger: console,
  verbose: argv.verbose || false
}
let port = argv.port || 7777;

const server = Ganache.server(options);
server.listen(port, (e) => {
  if (e) {
    console.log(e);
    process.exit(1);
  }

  let blockchain = server.provider.blockchain;
  let balance = blockchain.balance.toFIL();

  console.log("")
  console.log("Lotus API started on: http://localhost:" + port);
  console.log("IPFS  API started on: http://localhost:" + options.ipfsPort); 
  console.log("")
  console.log("---------------")
  console.log("")
  console.log("  Wallet:")
  console.log("")
  console.log("    Address:") 
  console.log(`      ${blockchain.address.value}`)
  console.log("")
  console.log("    Private key:")
  console.log(`      ${blockchain.address.privateKey}`)
  console.log("")
  console.log("    Balance:")
  console.log(`      ${balance} FIL`)
  console.log("");
  console.log("  Your private key is *not* secure. Do not use this private key outside of development.")
  console.log("")
  console.log("---------------");
  console.log("")
  console.log(`Beginning mining (${blockchain.blockTime == 0 ? "automining" : "every " + blockchain.blockTime + "ms"}):`)
  console.log("")
});
