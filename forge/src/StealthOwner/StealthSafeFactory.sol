// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Interface/IHydrator.sol";
import "./StealthOwner.sol";

contract StealthSafeFactory {

    IHydrator public constant HYDRATOR = IHydrator(0x1a93629BFcc6E9c7241E587094FAE26F62503FaD);
    address public VERIFIER;
    address public KEYSTORE;

    function deploySafe(bytes32 _stealth_init, address _verifier, address _keystore) public {
        StealthOwner stealthOwner = new StealthOwner(
            _stealth_init,
            VERIFIER,
            KEYSTORE
        );
        HYDRATOR.deploySafe(bytes32(uint256(uint160(address(stealthOwner))) << 96));
        VERIFIER = _verifier;
        KEYSTORE = _keystore;
    }
}
