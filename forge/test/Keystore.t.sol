// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Keystore} from "../src/Keystore.sol";

contract KeystoreTest is Test {
    Keystore public keystore;

    function setUp() public {
        keystore = new Keystore(bytes32(0x02524cdb499f6b542ce65e49d39b684829a54038618809edeb4cd9f797a4465b));
    }

    // function test_Verify() public view {
    //     bytes32[3] memory fixedProofs = [
    //         bytes32(0x9eaccf3d397656f4ad37ea817192d14e40d856dd43a2bac16421700ddf613a07),
    //         bytes32(0x8e0bc5bf767ff329ab20af0bf4e749fe21e79b3d58a0d25c0312e8f6819405bf),
    //         bytes32(0x34696f0ef337c20f55921f5e23ae081fca3b7d0ffd52aa2521363771b6eb1475)
    //     ];

    //     bytes32[] memory proofs = new bytes32[](3);
    //     for (uint256 i = 0; i < 3; i++) {
    //         proofs[i] = fixedProofs[i];
    //     }

    //     bool verified =
    //         keystore.verify(bytes32(0xf0df3dcda05b4fbd9c655cde3d5ceb211e019e72ec816e127a59e7195f2cd7f5), proofs);

    //     assertTrue(verified, "Verification failed");
    // }

    function test_AddUpdateKey() public {
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

        console.logBytes32(newHash);
        console.logBytes32(rootHash);

        bytes32[3] memory fixedProofs2 = [
            bytes32(0x9eaccf3d397656f4ad37ea817192d14e40d856dd43a2bac16421700ddf613a07),
            bytes32(0x8e0bc5bf767ff329ab20af0bf4e749fe21e79b3d58a0d25c0312e8f6819405bf),
            bytes32(0x34696f0ef337c20f55921f5e23ae081fca3b7d0ffd52aa2521363771b6eb1475)
        ];

        proofs = new bytes32[](3);
        for (uint256 i = 0; i < 3; i++) {
            proofs[i] = fixedProofs2[i];
        }

        bool verified = keystore.verify(newHash, proofs);

        console.logBool(verified);
        assertTrue(verified, "Verification failed");
        // console.logString("Leaves");

        // for (uint256 i = 0; i < 8; i++) {
        //     console.logBytes32(keystore.getLeaf(i));
        // }
        // bytes32[3] memory fixedProofs2 = [
        //     bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b),
        //     bytes32(0xd07902618ebcddf72757caeaa3856c3f84207fc70993c252a4b4a0a9b6e8fa0e),
        //     bytes32(0xd17ad691459a0b570a2ac9a039a56a74dd0c5597b11b793b17991b123db576ad)
        // ];

        (bytes32 secondHash, bytes32 secondRootHash) = keystore.updateKey(
            0,
            bytes32(0xd07902618ebcddf72757caeaa3856c3f84207fc70993c252a4b4a0a9b6e8fa0e),
            bytes32(0xd17ad691459a0b570a2ac9a039a56a74dd0c5597b11b793b17991b123db576ad),
            bytes32(0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a),
            bytes32(0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca),
            proofs,
            28,
            bytes32(0x964a6bd640d0c76521abe3c305ed5ec33579abcf555f2ac13c8f1e29cc425b3e),
            bytes32(0x698577d8b9580200c913f991478bf221678b37d16022ce4c59872734cbe7d9a9)
        );
    }
}
