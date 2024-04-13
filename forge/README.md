## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Deployed contracts:
* Verifier - 0x869a859a31b0dcc6a99ae4461d7163f4335819d1 - https://basescan.org/address/0x869a859a31b0dcc6a99ae4461d7163f4335819d1#code
* Keystore - 0xBA4723FB08e9f846e0A6308060fA32C87B4AE040 - https://basescan.org/address/0xBA4723FB08e9f846e0A6308060fA32C87B4AE040#code
* Hydrator - 0xEd249a7C0E7618987696DBfe5F18908993cc60d1 - https://basescan.org/address/0xed249a7c0e7618987696dbfe5f18908993cc60d1#code
* StealthSafeFactory - 0x4CFAF6CeEc70aF35259e0d494a088219FD58c3a1 - https://basescan.org/address/0x4cfaf6ceec70af35259e0d494a088219fd58c3a1#code

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
