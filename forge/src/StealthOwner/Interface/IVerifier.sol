// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IUltraVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}
