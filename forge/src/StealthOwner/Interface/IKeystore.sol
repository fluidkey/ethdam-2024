// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IKeystore {
    function verify(bytes32 leaf, bytes32[] memory proof) external view returns (bool);
    function addKey(bytes32[] memory proof, bytes32 newPubKeyX, bytes32 newPubKeyY) external returns (bytes32, bytes32);
    function getLeaf(uint256 index) external view returns (bytes32);
}
