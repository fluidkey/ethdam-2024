// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "openzeppelin-contracts/contracts/utils/introspection/ERC165.sol";
import "openzeppelin-contracts/contracts/interfaces/IERC1271.sol";
import "./Interface/IKeystore.sol";
import "./Interface/IVerifier.sol";

contract StealthOwner is IERC1271, ERC165 {
    IUltraVerifier public verifier;
    IKeystore public keystore;
    bytes32 public stealthInit;

    constructor(bytes32 _stealth_init, address _verifier, address _keystore) {
        stealthInit = _stealth_init;
        verifier = IUltraVerifier(_verifier);
        keystore = IKeystore(_keystore);
    }

    /**
    * @dev Returns the magic value "0x1626ba7e" when the signature is valid and "0xffffffff" when it is invalid
    * @param _hash Hash of the data to be signed
    * @param _signature The zk proof
    **/
    function isValidSignature(bytes32 _hash, bytes memory _signature) public view override returns (bytes4) {
        bytes32 _root = keystore.root();
        bytes32[] memory _publicInputs = new bytes32[](96);
        bytes32[] memory _hashSplit = splitBytes32(_hash);
        bytes32[] memory _stealthInitSplit = splitBytes32(stealthInit);
        bytes32[] memory _rootSplit = splitBytes32(_root);
        for (uint256 i = 0; i < _hashSplit.length; i++) {
            _publicInputs[i] = _hashSplit[i];
            _publicInputs[i + (32)] = _stealthInitSplit[i];
            _publicInputs[i + (64)] = _rootSplit[i];
        }
        if (verifier.verify(_signature, _publicInputs)) {
            return 0x1626ba7e;
        } else {
            return 0xffffffff;  // Return value for invalid signature
        }
    }

    /**
    * @dev Splits a bytes32 into an array of bytes32
    * @param input The bytes32 to split
    **/
    function splitBytes32(bytes32 input) public pure returns (bytes32[] memory) {
        bytes32[] memory output = new bytes32[](32);
        for (uint256 i = 0; i < 32; i++) {
            bytes32 b;
            assembly {
                b := and(shr(mul(sub(31, i), 8), input), 0xFF)
            }
            output[i] = b;
        }
        return output;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165) returns (bool) {
        return interfaceId == type(IERC1271).interfaceId || super.supportsInterface(interfaceId);
    }
}
