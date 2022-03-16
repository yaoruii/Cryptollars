//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "./IMonster.sol";

/**
 * @title GameMaster contract interface
 */
interface IGameMaster is IMonster {
    /*
     * @notice: create a monster
     * Modifies: allMonster array
     */
    function create_monster() external;

    /*
     * @notice: remove a monster
     * Modifies: allMonster array
     */
    // function slay_monster(uint256 _index) external;

    /*
     * @notice get a monster's details
     * @Depends on: _index
     * @return a monster's details
     */
    function get_monster(uint256 _index) external returns (Monster memory);

    /*
     * @notice: get all monsters' details
     * @return all monsters' details
     */
    function get_all_monster() external returns (Monster[] memory);

    /*
     * @notice: pause this game
     */
    function pause() external;

    /*
     * @notice: unpause this game
     */
    function unpause() external;
}
