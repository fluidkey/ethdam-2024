// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Keystore} from "../src/Keystore.sol";

contract KeystoreTest is Test {
    Keystore public keystore;

    function setUp() public {
        keystore = new Keystore(bytes32(0x9d1e47d5cfc1e13496cc0ad15235629fe73dab58e565eabfe4eb0a89bc6b9803));
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
        uint8[6] memory positions = [1, 1, 1, 1, 1, 1];

        bytes32[6] memory proofs = [
            bytes32(0x9eaccf3d397656f4ad37ea817192d14e40d856dd43a2bac16421700ddf613a07),
            bytes32(0x8e0bc5bf767ff329ab20af0bf4e749fe21e79b3d58a0d25c0312e8f6819405bf),
            bytes32(0x34696f0ef337c20f55921f5e23ae081fca3b7d0ffd52aa2521363771b6eb1475),
            bytes32(0x9ee25ee9185269701f752702c001ed3b1f0bad3c50120afc41fa197cd3f902c0),
            bytes32(0x6ba91e3b0c008c5a001dc344c1a1458eea897b9258734931cf204c975642482e),
            bytes32(0x98ab828cfe1af8a4a01cdcaeea7e8332b3b25eec386ea7a9d3680c64dd54d815)
        ];

        (bytes32 newLeaf, bytes32 rootHash) = keystore.addKey(
            proofs,
            positions,
            bytes32(0xf28f28f24dace47460d03ada214f8a9ec42f5620ad04d019f3bcf4ee6a2d0495),
            bytes32(0xa0e73650adc3b684309851e2bf11eb05d99ffb0562c36dbef1460c243fe007ce)
        );
        console.logBytes32(newLeaf);
        console.logBytes32(rootHash);

//        console.logBytes32(newHash);
//        console.logBytes32(rootHash);
//
//        bytes32[3] memory fixedProofs2 = [
//            bytes32(0x9eaccf3d397656f4ad37ea817192d14e40d856dd43a2bac16421700ddf613a07),
//            bytes32(0x8e0bc5bf767ff329ab20af0bf4e749fe21e79b3d58a0d25c0312e8f6819405bf),
//            bytes32(0x34696f0ef337c20f55921f5e23ae081fca3b7d0ffd52aa2521363771b6eb1475)
//        ];
//
//        proofs = new bytes32[](3);
//        for (uint256 i = 0; i < 3; i++) {
//            proofs[i] = fixedProofs2[i];
//        }
//
//        bool verified = keystore.verify(newHash, proofs, positions);
//
//        console.logBool(verified);
//        assertTrue(verified, "Verification failed");
        // console.logString("Leaves");

        // for (uint256 i = 0; i < 8; i++) {
        //     console.logBytes32(keystore.getLeaf(i));
        // }
        // bytes32[3] memory fixedProofs2 = [
        //     bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b),
        //     bytes32(0xd07902618ebcddf72757caeaa3856c3f84207fc70993c252a4b4a0a9b6e8fa0e),
        //     bytes32(0xd17ad691459a0b570a2ac9a039a56a74dd0c5597b11b793b17991b123db576ad)
        // ];

//        (bytes32 secondHash, bytes32 secondRootHash) = keystore.updateKey(
//            0,
//            bytes32(0xd07902618ebcddf72757caeaa3856c3f84207fc70993c252a4b4a0a9b6e8fa0e),
//            bytes32(0xd17ad691459a0b570a2ac9a039a56a74dd0c5597b11b793b17991b123db576ad),
//            bytes32(0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a),
//            bytes32(0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca),
//            proofs,
//            positions,
//            27,
//            bytes32(0x262b33ddcae1c8772ee936d2f1f8e43ae9ea517f564c1cd4fb92bae5403ac4e6),
//            bytes32(0x1d23d386f867bbb7dfb08582c3ac3623047edd75c9c6cd568fbd399538872bd9)
//        );
    }
}
