//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

interface IMonster {
    struct Monster {
        uint256 attack;
        uint256 monster_current_health;
        string monster_name;
    }
}
