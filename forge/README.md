## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Deployed contracts:
* Verifier - 0x869a859a31b0dcc6a99ae4461d7163f4335819d1 - https://basescan.org/address/0x869a859a31b0dcc6a99ae4461d7163f4335819d1#code
* Keystore - 0x1b06b0519cfb4a395ad1a549589b325094a46d13 - https://basescan.org/address/0x1b06b0519cfb4a395ad1a549589b325094a46d13#code
* Hydrator - 0xEd249a7C0E7618987696DBfe5F18908993cc60d1 - https://basescan.org/address/0xed249a7c0e7618987696dbfe5f18908993cc60d1#code
* StealthSafeFactory - 0xC83608748C8b9e315104Cf880766f1097Ad88199 - https://basescan.org/address/0xc83608748c8b9e315104cf880766f1097ad88199#code

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ source .env && forge script script/Deploy.s.sol:DeployVerifierScript --fork-url $BASE_RPC_URL --broadcast --verify -vvvv
$ source .env && forge script script/Deploy.s.sol:DeployKeystoreScript --rpc-url $BASE_RPC_URL --broadcast --verify -vvvv
$ source .env && forge script script/Deploy.s.sol:DeployHydratorScript --rpc-url $BASE_RPC_URL --broadcast --verify -vvvv
$ source .env && forge script script/Deploy.s.sol:DeployStealthSafeFactoryScript --rpc-url $BASE_RPC_URL --broadcast --verify -vvvv
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
