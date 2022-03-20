//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;
 
 
/**
* @title Random contract interface
*/
interface IRandom{
    /**
     * @notice get a random number
     * @param upperBoundary a upper boundary
     */
    function get_random(uint256 upperBoundary) external returns (uint256 random_num);
}
