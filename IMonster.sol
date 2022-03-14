//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

/**
* @title IMonster interface
* @notice defind Monster struct
*/
interface IMonster{
    struct Monster {
        uint256 attack;
        uint256 monster_current_health;
        string monster_name;
    }
}

