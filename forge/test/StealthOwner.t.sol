// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {StealthOwner} from "../src/StealthOwner/StealthOwner.sol";
import "../src/Keystore.sol";

contract StealthOwnerTest is Test {
    StealthOwner public stealthOwner;
    Keystore public keystore;

    function setUp() public {
        keystore = new Keystore(bytes32(0xeca87e8a05428002d19fe3fd628ae2613f549c1c90b44eb975be8290582a9c89));

        stealthOwner = new StealthOwner(
            bytes32(0x6196b502ff84507397f9a0280bf6c6f2ea553dafdd2e576735dfd3c34b746986),
            address(0x3192A065Fc42E06f1775C1c3Ff0b6E578305879a),
            address(keystore)
        );

        // register also one key
        bytes32[3] memory fixedProofs = [
                            bytes32(0x9eaccf3d397656f4ad37ea817192d14e40d856dd43a2bac16421700ddf613a07),
                            bytes32(0x8e0bc5bf767ff329ab20af0bf4e749fe21e79b3d58a0d25c0312e8f6819405bf),
                            bytes32(0x34696f0ef337c20f55921f5e23ae081fca3b7d0ffd52aa2521363771b6eb1475)
            ];
        bytes32[] memory proofs = new bytes32[](3);
        for (uint256 i = 0; i < 3; i++) {
            proofs[i] = fixedProofs[i];
        }
        (bytes32 newHash, bytes32 rootHash) = keystore.addKey(
            proofs,
            bytes32(0xd07902618ebcddf72757caeaa3856c3f84207fc70993c252a4b4a0a9b6e8fa0e),
            bytes32(0xd17ad691459a0b570a2ac9a039a56a74dd0c5597b11b793b17991b123db576ad)
        );
    }

    function test_splitBytes32() public view {
        bytes32[] memory result = stealthOwner.splitBytes32(bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b));
        for (uint i = 0; i<32; i++) {
            console.logBytes32(result[i]);
        }
        assertTrue(result[0] == bytes32(0x000000000000000000000000000000000000000000000000000000000000000e), "splitBytes32 failed");
        assertTrue(result[1] == bytes32(0x00000000000000000000000000000000000000000000000000000000000000b5), "splitBytes32 failed");
        assertTrue(result[31] == bytes32(0x000000000000000000000000000000000000000000000000000000000000004b), "splitBytes32 failed");
    }

    function test_verifyTransaction() public view {
        bytes32 _hash = bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b);
        bytes memory _signature = hex"0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b23142324234234242243";
//        stealthOwner.isValidSignature(_hash, _signature);
    }
}
