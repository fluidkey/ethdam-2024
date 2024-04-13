// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Interface/IHydrator.sol";
import "./StealthOwner.sol";

contract StealthSafeFactory {

    IHydrator public constant HYDRATOR = new IHydrator(0x1a93629bfcc6e9c7241e587094fae26f62503fad);
    address public constant VERIFIER = address(0x3192A065Fc42E06f1775C1c3Ff0b6E578305879a);
    address public constant KEYSTORE = address(0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa);

    function deploySafe(bytes32 _stealth_init) public {
        StealthOwner stealthOwner = new StealthOwner(
            _stealth_init,
            VERIFIER,
            KEYSTORE
        );
        HYDRATOR.deploySafe(address(stealthOwner));
    }
}
