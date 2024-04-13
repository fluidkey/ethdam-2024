// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Keystore} from "../src/Keystore.sol";

contract KeystoreTest is Test {
    Keystore public keystore;

    function setUp() public {
        bytes32[8] memory fixedKeys = [
            bytes32(0xf0df3dcda05b4fbd9c655cde3d5ceb211e019e72ec816e127a59e7195f2cd7f5),
            bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b),
            bytes32(0x7d2944a272ac5bae96b5bd2f67b6c13276d541dc09eb1cf414d96b19a09e1c2f),
            bytes32(0xcfb339bd1c51c488f6134f4ac63d1594afad827b3401c3fc51ed1da74a8ca14e),
            bytes32(0x295841a49a1089f4b560f91cfbb0133326654dcbb1041861fc5dde96c724a22f),
            bytes32(0xd08c889a2b804c67887cd70e57ff036e6bc341281711f6587c117607d171d093),
            bytes32(0xf1ca0f4808f7f0c52440675894727c9e66265266cd1e1f5015f8b745ca2de5f3),
            bytes32(0xd9e659536a2f603b20938d4b8c1783b32b56367744f7b53b49ad35612a31e7ca)
        ];

        bytes32[] memory keys = new bytes32[](8);
        for (uint256 i = 0; i < 8; i++) {
            keys[i] = fixedKeys[i];
        }

        keystore = new Keystore(bytes32(0xeca87e8a05428002d19fe3fd628ae2613f549c1c90b44eb975be8290582a9c89), keys);
    }

    function test_Verify() public view {
        bytes32[3] memory fixedProofs = [
            bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b),
            bytes32(0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a),
            bytes32(0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca)
        ];

        bytes32[] memory proofs = new bytes32[](3);
        for (uint256 i = 0; i < 3; i++) {
            proofs[i] = fixedProofs[i];
        }

        bool verified =
            keystore.verify(bytes32(0xf0df3dcda05b4fbd9c655cde3d5ceb211e019e72ec816e127a59e7195f2cd7f5), proofs);

        assertTrue(verified, "Verification failed");
    }

    function test_AddUpdateKey() public {
        bytes32[3] memory fixedProofs = [
            bytes32(0x0eb5be412f275a18f6e4d622aee4ff40b21467c926224771b782d4c095d1444b),
            bytes32(0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a),
            bytes32(0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca)
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

        (bytes32 secondHash, bytes32 secondRootHash) = keystore.updateKey(
            0,
            bytes32(0x6fc4e292df09c8fe0e4ada2e390bd1736ff287e9bbd4e013275676490910b19a),
            bytes32(0xcc91b473d1d747edcc6455265f693c21f4605c982b1480a03f20b2358b059eca),
            newPubKeyX,
            newPubKeyY,
            proof,
            v,
            r,
            s
        );
    }
}
