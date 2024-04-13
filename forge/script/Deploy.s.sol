// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/Verifier.sol";
import {Keystore} from "../src/Keystore.sol";
import "../src/StealthOwner/StealthSafeFactory.sol";
import "../src/Hydrator.sol";

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
        Keystore keystore = new Keystore(bytes32(0x9d1e47d5cfc1e13496cc0ad15235629fe73dab58e565eabfe4eb0a89bc6b9803));
        vm.stopBroadcast();
    }
}


contract DeployHydratorScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        FluidkeyHydrator hydrator = new FluidkeyHydrator();
        vm.stopBroadcast();
    }
}

contract DeployStealthSafeFactoryScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address _hydrator = address(0xEd249a7C0E7618987696DBfe5F18908993cc60d1);
        address _verifier = address(0x869A859a31b0Dcc6a99ae4461d7163F4335819d1);
        address _keystore = address(0xBA4723FB08e9f846e0A6308060fA32C87B4AE040);
        StealthSafeFactory ssf = new StealthSafeFactory(_verifier, _keystore, _hydrator);
        vm.stopBroadcast();
    }
}
