# Ganache Filecoin Alpha CLI

Alpha CLI for Ganache's Filecoin integration. Will be replaced by [ganache-cli](https://github.com/trufflesuite/ganache-cli) once integration is stable.

Running `ganache-filecoin-alpha-cli` will start a web server that simulates a full [Lotus](https://docs.lotu.sh/) client. Use this CLI instead of Lotus during development for faster development cycles and instant storage mining. 

### DISCLAIMER

This is alpha software. We're releasing this version of the CLI to let Filecoin developers test out the early version of our integration ahead of the Filecoin Mainnet launch. This software is likely to change very rapidly based on user feedback and its use with real applications. Please file issues in [ganache-cli](https://github.com/trufflesuite/ganache-cli), as this repository will be removed once integration in `ganache-cli` is stable. 

### Install

```
$ npm install -g ganache-filecoin-alpha-cli
```

On Windows, you may need to run the above with the `--ignore-scripts` flag, as Windows has trouble compiling some optional dependencies. 

### Usage

```
$ ganache-filecoin-alpha-cli <options>
```

This will start a Filecoin simulator on port `7777` and a connected IPFS server on port `5001`. See options below to change ports used.

### Command line options

The following options are available when starting the server:

* `--port`: The port to host the Lotus API. Default is `7777`
* `--ipfs-port`: The port to host the connected IPFS server. Default is `5001`
* `--tipset-time <milliseconds>`: Mine new tipsets on a timer, specified by the number of milliseconds given. Default is `0`. When specified (not `0`), storage proposals will be mined over the course of many tipsets, and tipsets will be mined continously regardless of the presence of storage proposals. When not specified (or `0`), Ganache will mine storage proposals instantly, and will only mine tipsets when storage proposals are processing. 
* `--seed <seed>`: Seed the random number generator used to create the wallet address and private key. (This will be more useful when more than one account is created.)
* `--verbose`: Log JSON RPC requests received and associated responses. 

### Example output

```
$ ganache-filecoin-alpha-cli
/*
 * Welcome to Ganache+Filecoin early-access! Once stable, this package will be deprecated and replaced by `ganache-cli`.
 *
 * Please file issues at: https://github.com/trufflesuite/ganache-cli/issues
 */

Starting Filecoin and IPFS simulator...

Lotus API started on: http://localhost:7777
IPFS  API started on: http://localhost:5001

---------------

  Wallet:

    Address:
      t3ugcjhhndtopnuikkk6eww5yqqt3lnig4fdo53o2q2lsxuvlzlrkk4ydoezdfbl4zyshxwvdhd7ybqpszpjcq

    Private key:
      ee547a280d0347e23ad3dc5cd523a28df3c3158bbe1e5302f9dfe479b529c655

    Balance:
      500 FIL

  Your private key is *not* secure. Do not use this private key outside of development.

---------------

Beginning mining (automining):

2020-08-04T05:16:27.527Z INFO New heaviest tipset! [bafy2bzaceabyw5a7c23nmwzaey4pyypsxii62l3ulcwan4duemiiy52kpaxna] (height=0)

```

### Mining strategies

You have two mining stratagies available to you. One is "automining", and the other is mining new tipsets on a timer. Both are valuable in different scenarios, as described below.

#### Automining (the default)

Ganache will choose the automining strategy by default, or when `--tipset-time` is set to `0`. This strategy is best for speed, and is typically used during application development when quick results are necessary, for instance when running automated tests. In this strategy the simulator won't mine new tipsets until a storage proposal is received; and once received, it'll mine the storage proposal and associated tipsets instantly. As a user, you'll see your storage proposals immediately accepted and ushered into the `Active` state without waiting for your proposal to be published, transferred or sealed. You will see 12 tipsets mined per proposal, however, as that reprsents the number of state changes necessary to get the proposal to the `Active` state.

#### Mining on a timer

Ganache will mine new tipsets on a timer when `--tipset-time` is non-zero. This strategy is best if you want Ganache to act more like a real Filecoin environment, where storage proposals are mined over time and over the course of many tipsets. As currently implemented, a storage proposal will progress through to the `Active` state over the course of 12 tipsets, receiving a new state change on every new tipset until `Active` is finally reached. Note that the state of a proposal within a real Lotus server doesn't change states so quickly, and it usually spends more time on the `Tranferring` and `Sealing` states. Please let us know if we should simulate that behavior in more detail.

### Supported Methods

* `Filecoin.ChainGetGenesis`
* `Filecoin.ChainHead`
* `Filecoin.StateListMiners`
* `Filecoin.WalletDefaultAddress`
* `Filecoin.WalletBalance`
* `Filecoin.ClientStartDeal`
* `Filecoin.ClientListDeals`
* `Filecoin.ClientFindData`
* `Filecoin.ClientHasLocal`
* `Filecoin.ClientRetrieve`

### Still under development

Our Filecoin + Ganache integration is in very active development! We're working hard to implement all the features you've come to expect from other flavors of Ganache. On the roadmap for 2020 is the following:

* **Database & persistence.** Ever want to save your development session and come back later? Database support will let you do that, and let you stop your Ganache server without worry.
* **Snapshotting & reverting.** One feature that can add even further speed up to automated tests is providing snapshotting and reverting. Put shortly, you (and your automated testing frameworks) can snapshot the state of the Ganache database and revert back to that time as needed. This speeds up test runs becuase it prevents the framework from recreating the previous state unnecessarily. The speedup, it's yuge!
* **Websocket support.** The current implementation of Filecoin+Ganache doesn't yet support websockets. It's on the list, and will come soon. 
* **More accounts by default.** Need more than one account? We'll have you covered soon. 
* **BIP39 mnemonics.** What's a [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)? It allows for seed phrases like `witch collapse practice feed shame open despair creek road again ice least` which have long been the hottest way to manage crypto addresses.