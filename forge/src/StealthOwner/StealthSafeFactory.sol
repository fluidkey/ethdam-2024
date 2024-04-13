// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Interface/IHydrator.sol";
import "./StealthOwner.sol";

contract StealthSafeFactory {

    IHydrator public HYDRATOR;
    address public VERIFIER;
    address public KEYSTORE;

    constructor(address _verifier, address _keystore, address _hydrator) {
        VERIFIER = _verifier;
        KEYSTORE = _keystore;
        HYDRATOR = IHydrator(_hydrator);
    }

    function deploySafe(bytes32 _stealth_init) public {
        StealthOwner stealthOwner = new StealthOwner(
            _stealth_init,
            VERIFIER,
            KEYSTORE
        );
        HYDRATOR.deploySafe(bytes32(uint256(uint160(address(stealthOwner))) << 96));
    }
}
