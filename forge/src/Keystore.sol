// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Keystore {
    bytes32 public root;
    bytes32[] public leaves;
    uint256 public nextAvailableIndex = 0;

    constructor(bytes32 _root, bytes32[] memory _leaves) {
        root = _root;
        leaves = _leaves;
    }

    function verify(bytes32 leaf, bytes32[] memory proof) public view returns (bool) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = keccak256(abi.encodePacked(computedHash, proof[i]));
        }
        return (computedHash == root);
    }

    // allow to update a leaf if it is bytes32(0)
    function addKey(bytes32[] memory proof, bytes32 newPubKeyX, bytes32 newPubKeyY) public returns (bytes32, bytes32) {
        // verify the proofs are valid
        require(nextAvailableIndex < 8, "No more space");
        require(verify(leaves[nextAvailableIndex], proof), "Invalid proof");
        // compute the hash of the new public key
        bytes32 newPubKeyHash = keccak256(abi.encodePacked(newPubKeyX, newPubKeyY));
        bytes32 newHash =
            keccak256(abi.encodePacked(keccak256(abi.encodePacked(bytes32(nextAvailableIndex), newPubKeyHash))));
        leaves[nextAvailableIndex] = newHash;
        nextAvailableIndex++;
        // compute the new root hash
        bytes32 rootHash = newHash;
        for (uint256 i = 0; i < proof.length; i++) {
            rootHash = keccak256(abi.encodePacked(rootHash, proof[i]));
        }
        return (newHash, rootHash);
    }

    function getLeaf(uint256 index) public view returns (bytes32) {
        return leaves[index];
    }

    // if the current leaf publickey has signed a message authorizing the change
    // index, new pk, signed message
}
