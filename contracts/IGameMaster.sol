//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "./IMonster.sol";

/**
 * @title GameMaster contract interface
 * @notice ...
 */
interface IGameMaster is IMonster {
    function create_monster() external;

    function get_monster(uint256 _index) external returns (Monster memory);

    function get_all_monster() external returns (Monster[] memory);

    function pause() external;

    function unpause() external;
}
