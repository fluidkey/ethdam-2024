// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "openzeppelin-contracts/contracts/utils/introspection/ERC165.sol";
import "openzeppelin-contracts/contracts/interfaces/IERC1271.sol";
import "./Interface/IKeystore.sol";

interface Verifier {
    function verify(bytes32 _hash, bytes calldata _signature) external view returns (bool);
}

contract MyContract is IERC1271, ERC165 {
    Verifier public verifier;
    IKeystore public keystore;
    bytes32 public stealthData;

    constructor(bytes32 stealth_init, address _verifier, address _keystore) {
        stealthData = stealth_init;
        verifier = Verifier(_verifier);
        keystore = IKeystore(_keystore);
    }

    function isValidSignature(bytes32 _hash, bytes memory _signature) public view override returns (bytes4) {
        if (keystore.getKey(_hash) && verifier.verify(_hash, _signature)) {
            return 0x1626ba7e;  // Magic value per EIP-1271
        }
        return 0xffffffff;  // Return value for invalid signature
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165) returns (bool) {
        return interfaceId == type(IERC1271).interfaceId || super.supportsInterface(interfaceId);
    }
}
