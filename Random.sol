//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "./IRandom.sol";

contract Random is IRandom{
    uint256 initialNumber;
    // uint256 upperBoundary;
    constructor(uint256 _initialNumber){
        initialNumber = _initialNumber;
        // upperBoundary = _upperBoundary;

    }

    function get_random(uint256 upperBoundary) public override returns(uint256){
        return uint(keccak256(abi.encodePacked(initialNumber++)))%upperBoundary;
    }
}