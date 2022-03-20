//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IPlayer {
    // player attributes
    struct Player {
        uint256 attack;
        uint256 max_health;
        uint256 current_health;
        string player_name;
        Equipment[] equipment_storage;
        Equipment equipment;
        bool is_pending;
    }
    struct Equipment {
        uint256 sword_strength;
        uint256 id;
        string equipment_name;
    }
}
