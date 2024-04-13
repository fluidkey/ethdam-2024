// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
 *                  !
 *                 /@\
 *                /@@@\
 *               { ^_^ }
 *               \@@@@@/
 *                 """
 */

/**
 * @title FluidkeyHydrator v0.1
 * @author Fluidkey (fluidkey.com)
 * @notice This contract deploys 1/1 Safes with minimal calldata.
 *         It takes an address in bytes32 and inflates it to deploy
 *         a 1/1 v1.3.0 Safe controlled by the passed address.
 */
contract FluidkeyHydrator {
    function deploySafe(bytes32 signerAddress) public returns (address) {
        bytes memory dataChunk1 =
                    hex"1688f0b9000000000000000000000000d9db270c1b5e3bd161e8c8503c55ceabee709552000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164b63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000f48f2b2d2a534e402487b3ee7c18c33aec0fe5e40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000";
        bytes memory dataChunk2 =
                    hex"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

        bytes memory data = abi.encodePacked(dataChunk1, signerAddress, dataChunk2);

        (bool success, bytes memory result) = address(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2).call(data);
        require(success, "Failed to deploy Safe");

        // Convert returned bytes to address
        address generatedAddress = abi.decode(result, (address));
        return generatedAddress;
    }
}
