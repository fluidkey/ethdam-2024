// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Keystore {
    bytes32 public root;
    bytes32[64] public leaves;
    uint256 public nextAvailableIndex = 0;

    constructor(bytes32 _root) {
        root = _root;
    }

    // !!!! also pass the index so the order is correct
    function verify(bytes32 leaf, bytes32[] memory proof, uint8[] memory position) public view returns (bool) {
        bytes32 computedHash = keccak256(abi.encodePacked(leaf));
        for (uint256 i = 0; i < proof.length; i++) {
            if (position[i] == 0) {
                computedHash = keccak256(abi.encodePacked(proof[i], computedHash));
            } else {
                computedHash = keccak256(abi.encodePacked(computedHash, proof[i]));
            }
        }
        return (computedHash == root);
    }

    // allow to update a leaf if it is bytes32(0)
    function addKey(bytes32[] memory proof, uint8[] memory position, bytes32 newPubKeyX, bytes32 newPubKeyY)
        public
        returns (bytes32, bytes32)
    {
        // verify the proofs are valid
        require(nextAvailableIndex < 64, "No more space");
        bytes32 nextAvailableKey = computeLeaf(nextAvailableIndex, bytes32(0), bytes32(0));
        require(verify(nextAvailableKey, proof, position), "Invalid proof");
        // compute the hash of the new public key
        bytes32 newKey = computeLeaf(nextAvailableIndex, newPubKeyX, newPubKeyY);
        leaves[nextAvailableIndex] = newKey;
        nextAvailableIndex++;
        // compute the new root hash
        bytes32 rootHash = keccak256(abi.encodePacked(newKey));
        for (uint256 i = 0; i < proof.length; i++) {
            if (position[i] == 0) {
                rootHash = keccak256(abi.encodePacked(proof[i], rootHash));
            } else {
                rootHash = keccak256(abi.encodePacked(rootHash, proof[i]));
            }
        }
        root = rootHash;
        return (newKey, rootHash);
    }

    function getLeaf(uint256 index) public view returns (bytes32) {
        return leaves[index];
    }

    function publicKeyToAddress(bytes32 pubKeyX, bytes32 pubKeyY) public pure returns (address) {
        return address(uint160(uint256(keccak256(abi.encodePacked(pubKeyX, pubKeyY)))));
    }

    function computeLeaf(uint256 index, bytes32 pubKeyX, bytes32 pubKeyY) public view returns (bytes32) {
        bytes32 pubKeyHash = keccak256(abi.encodePacked(pubKeyX, pubKeyY));
        return keccak256(abi.encodePacked(pubKeyHash, bytes32(index)));
    }

    // if the current leaf publickey has signed a message authorizing the change
    // index, new pk, signed message
    function updateKey(
        uint256 index,
        bytes32 currentPubKeyX,
        bytes32 currentPubKeyY,
        bytes32 newPubKeyX,
        bytes32 newPubKeyY,
        bytes32[] memory proof,
        uint8[] memory position,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public returns (bytes32, bytes32) {
        // verify the proofs are valid
        require(index < 64, "Index out of bound");
        bytes32 leaf = leaves[index];
        require(verify(leaf, proof, position), "Invalid proof");
        // check that the leaf corresponds to currentPubKey
        bytes32 currentLeaf = computeLeaf(index, currentPubKeyX, currentPubKeyY);
        require(leaf == currentLeaf, "Invalid current public key");
        // check that the signature is valid
        bytes32 message = keccak256(abi.encodePacked(index, newPubKeyX, newPubKeyY));
        address currentAddress = publicKeyToAddress(currentPubKeyX, currentPubKeyY);
        address recoveredAddress = ecrecover(message, v, r, s);
        require(currentAddress == recoveredAddress, "Invalid signature");
        // compute the hash of the new public key
        bytes32 newLeaf = computeLeaf(index, newPubKeyX, newPubKeyY);
        leaves[index] = newLeaf;
        // compute the new root hash
        bytes32 rootHash = keccak256(abi.encodePacked(newLeaf));
        for (uint256 i = 0; i < proof.length; i++) {
            if (position[i] == 0) {
                rootHash = keccak256(abi.encodePacked(proof[i], rootHash));
            } else {
                rootHash = keccak256(abi.encodePacked(rootHash, proof[i]));
            }
        }
        root = rootHash;
        return (newLeaf, rootHash);
    }
}
