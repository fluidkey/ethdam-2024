// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IHydrator {
    function deploySafe(bytes32 signerAddress) public;
}
