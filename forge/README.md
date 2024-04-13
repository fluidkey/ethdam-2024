## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Deployed contracts:
* Verifier - 0x869a859a31b0dcc6a99ae4461d7163f4335819d1 - https://basescan.org/address/0x869a859a31b0dcc6a99ae4461d7163f4335819d1#code
* Keystore - 0x2b63f2748C3582EEf7134d7912895Ab65cfc6Db2 - https://basescan.org/address/0x2b63f2748c3582eef7134d7912895ab65cfc6db2#code
* Hydrator - 0xEd249a7C0E7618987696DBfe5F18908993cc60d1 - https://basescan.org/address/0xed249a7c0e7618987696dbfe5f18908993cc60d1#code
* StealthSafeFactory - 0x554E2E300e28651A13f3F71133dFf465055175A8 - https://basescan.org/address/0x554e2e300e28651a13f3f71133dff465055175a8#code

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
