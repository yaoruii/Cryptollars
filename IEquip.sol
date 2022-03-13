//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IEquip {
    // equipment attributes
    struct Equipment {
        uint256 sword_strength;
        uint256 id;
        string equipment_name;
    }
}
