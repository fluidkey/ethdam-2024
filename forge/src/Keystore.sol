// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Keystore {
    bytes32 public root;
    bytes32[8] public leaves;
    uint256 public nextFreeSlot = 0;

    constructor(bytes32 _root) {
        root = _root;
    }

    // Verify a leaf is part of the merkle tree
    function verify(bytes32 leaf, bytes32[] memory proofs, uint8[] memory positions) public view returns (bool) {
        bytes32 computedRoot = computeRoot(leaf, proofs, positions);
        return (computedRoot == root);
    }

    // Compute the root hash of a merkle tree
    function computeRoot(bytes32 leaf, bytes32[] memory proofs, uint8[] memory positions)
        public
        pure
        returns (bytes32)
    {
        bytes32 computedRoot = keccak256(abi.encodePacked(leaf));
        for (uint256 i = 0; i < proofs.length; i++) {
            if (positions[i] == 0) {
                computedRoot = keccak256(abi.encodePacked(proofs[i], computedRoot));
            } else {
                computedRoot = keccak256(abi.encodePacked(computedRoot, proofs[i]));
            }
        }
        return computedRoot;
    }

    // Get the leaf at a specific index
    function getLeaf(uint256 index) public view returns (bytes32) {
        return leaves[index];
    }

    // Compute the value of a leaf
    function computeLeaf(uint256 index, bytes32 pubKeyX, bytes32 pubKeyY) public view returns (bytes32) {
        bytes32 pubKeyHash = keccak256(abi.encodePacked(pubKeyX, pubKeyY));
        return keccak256(abi.encodePacked(pubKeyHash, bytes32(index)));
    }

    // Convert a public keypair to an Ethereum address
    function publicKeyToAddress(bytes32 pubKeyX, bytes32 pubKeyY) public pure returns (address) {
        return address(uint160(uint256(keccak256(abi.encodePacked(pubKeyX, pubKeyY)))));
    }

    // Add a new key to an empty slot in the merkle tree
    function addKey(bytes32[] memory proofs, uint8[] memory positions, bytes32 newPubKeyX, bytes32 newPubKeyY)
        public
        returns (bytes32, bytes32)
    {
        require(nextFreeSlot < 8, "No more space");
        bytes32 currentLeaf = computeLeaf(nextFreeSlot, bytes32(0), bytes32(0));
        require(verify(currentLeaf, proofs, positions), "Invalid proofs");
        bytes32 newLeaf = computeLeaf(nextFreeSlot, newPubKeyX, newPubKeyY);
        leaves[nextFreeSlot] = newLeaf;
        nextFreeSlot++;
        bytes32 computedRoot = computeRoot(newLeaf, proofs, positions);
        root = computedRoot;
        return (newLeaf, computedRoot);
    }

    // Update a key slot in the merkle tree
    function updateKey(
        uint256 index,
        bytes32 currentPubKeyX,
        bytes32 currentPubKeyY,
        bytes32 newPubKeyX,
        bytes32 newPubKeyY,
        bytes32[] memory proofs,
        uint8[] memory positions,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public returns (bytes32, bytes32) {
        require(index < 8, "Index out of bound");
        bytes32 leaf = leaves[index];
        require(verify(leaf, proofs, positions), "Invalid proofs");
        bytes32 currentLeaf = computeLeaf(index, currentPubKeyX, currentPubKeyY);
        require(leaf == currentLeaf, "Invalid current public key");
        bytes32 message = keccak256(abi.encodePacked(index, newPubKeyX, newPubKeyY));
        address currentAddress = publicKeyToAddress(currentPubKeyX, currentPubKeyY);
        address recoveredAddress = ecrecover(message, v, r, s);
        require(currentAddress == recoveredAddress, "Invalid signature");
        bytes32 newLeaf = computeLeaf(index, newPubKeyX, newPubKeyY);
        leaves[index] = newLeaf;
        bytes32 computedRoot = computeRoot(newLeaf, proofs, positions);
        root = computedRoot;
        return (newLeaf, computedRoot);
    }
}
