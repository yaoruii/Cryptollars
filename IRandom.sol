//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

/**
 * @title Random contract interface
 * @notice ...
 */
interface IRandom {
    function get_random(uint256 upperBoundary)
        external
        returns (uint256 random_num);
}
