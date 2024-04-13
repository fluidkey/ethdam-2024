// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/Verifier.sol";
import {Keystore} from "../src/Keystore.sol";
import "../src/StealthOwner/StealthSafeFactory.sol";

contract DeployVerifierScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        UltraVerifier ultraVerifier = new UltraVerifier();
        vm.stopBroadcast();
    }
}


contract DeployKeystoreScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        Keystore keystore = new Keystore();
        vm.stopBroadcast();
    }
}

contract DeployStealthSafeFactoryScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        StealthSafeFactory ssf = new StealthSafeFactory();
        vm.stopBroadcast();
    }
}
