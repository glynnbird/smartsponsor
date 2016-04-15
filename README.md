## Installation

We need to install two command-line tools:

* geth - the Ethereum client built using the Go language
* solc - the Solidity compiler

```sh
> sudo apt-get install software-properties-common
> sudo add-apt-repository -y ppa:ethereum/ethereum
> sudo apt-get update
> sudo apt-get install ethereum
> sudo apt-get install solc
```

## Create some accounts

We probably want to create a number of accounts

* first account to receive the benefits of mining activity - we'll call this user "theminer"
* second account who is the sponsored runner - "therunner"
* third account who pledges donations to the campaign - "thesponsor"

Accounts are created from the command line by using the `geth account new` command and entering a password (twice):

```sh
> geth account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {4bdebee7a217d04e86ab67be5b6e108148b1fc8e}
```

Repeat this process for two more accounts. We can then list our accounts with `geth account list`:

```sh
> geth account list
Account #0: {4bdebee7a217d04e86ab67be5b6e108148b1fc8e} 
Account #1: {458305055882d53663b41a00eebd0b657469843f} 
Account #2: {225905462cf12404757852c01edfd2ec0bf0dbe9} 
```


## The Genesis block

The first block in a blockchain is called the "Genesis Block". We create a file called "genesis.json" containing:

```js
{
    "nonce": "0x0000000000000042",     
    "timestamp": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x0",     
    "gasLimit": "0x8000000",     
    "difficulty": "0x400",
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x3333333333333333333333333333333333333333",     
    "alloc": {     }
}
```

Then we can initialise our blockchain with

```sh
> geth --nodiscover --maxpeers 0 init genesis.json
I0413 16:31:32.885748 ethdb/database.go:82] Alloted 16MB cache and 16 file handles to /home/gbird/.ethereum/chaindata
I0413 16:31:32.892712 cmd/geth/main.go:333] successfully wrote genesis block and/or chain rule set: 6650a0ac6c5e805475e7ca48eae5df0e32a2147a154bb2222731c770ddb5c158

```

N.B older geth versions use `geth --nodiscover --maxpeers 0 --genesis genesis.json`

## Mining

We need mining for two reasons

* to generate some wealth
* mining is used to verify transactions before adding to the blockchain, so this executes our Solidity code

To start `geth` so that it starts mining we can use the command:

```sh
geth --rpc --rpcport 8000 --rpccorsdomain '"*"' --mine --minerthreads 1 --maxpeers 0 --nodiscover --networkid 3301 console
```

Geth should startup and then spend the next 15 minutes or so generating the [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph). This delay only occurs on your first run.

In other consoles on the same server, we can run `geth attach` to interact with the contract.




