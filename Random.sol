//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;
 
 
/**
* @title Random contract interface
* @notice ...
*/
interface Random{
    function get_random() external returns (uint8 random_a_byte);
}
