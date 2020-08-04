# Ganache Filecoin Alpha CLI

Alpha CLI for Ganache's Filecoin integration. Will be replaced by [ganache-cli](https://github.com/trufflesuite/ganache-cli) once integration is stable.

Running `ganache-filecoin-alpha-cli` will start a web server that simulates a full [Lotus](https://docs.lotu.sh/) client. Use this CLI instead of Lotus during development for faster development cycles and instant storage mining. 

### DISCLAIMER

This is alpha software. We're releasing this version of the CLI to allow Filecoin developers to test out the early version of our integration ahead of the Filecoin Mainnet launch. This software is likely to change very rapidly based on user feedback and its use in real applications. Please file issues in [ganache-cli](https://github.com/trufflesuite/ganache-cli), as this repository will be removed once integration in `ganache-cli` is stable. 

### Install

```
$ npm install ganache-filecoin-alpha-cli
```

### Usage

```
$ ganache-filecoin-alpha-cli <options>
```

This will start a Filecoin simualtor on port `7777`, and a connected IPFS server on port `5001`. See options below to change ports used.

### Command line options

The following options are available when starting the server:

* `--port`: The port to host the Lotus API. Default is `7777`
* `--ipfs-port`: The port to host the connected IPFS server. Default is `5001`
* `--tipset-time <milliseconds>`: Mine new tipsets on a timer, specified by the number of milliseconds given. Default is `0`. When specified (not `0`), storage proposals will be mined over the course of many tipsets, and tipsets will be mined continously regardless of the presence of storage proposals. When not specified (or `0`), Ganache will mine storage proposals instantly, and will only mine tipsets when storage proposals are processing. 

### Example output

```
$ ganache-filecoin-alpha-cli

ATTENTION! This is alpha software meant to provide early access to the `ganache-cli` Filecoin integration. Once integration is stable, this package will be deprecated and replaced by `ganache-cli`. Please file issues at: https://github.com/trufflesuite/ganache-cli/issues

---------------

Starting Filecoin and IPFS simulator...

Lotus API started on: http://localhost:7777
IPFS  API started on: http://localhost:5001

---------------

Wallet: 

  Address: 
    t3vc4eetfk32n3tv5z55p73a2vm32pwxnqgr3jmpf7ssnwff6yh34bjc4vvarzivian5advbmvpmgw7ijxrboa

  Private key:
    f47e78b912695e50283ffb6bf032e489055add72fc5da206e3fc29bda8cafc52

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

