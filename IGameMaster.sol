//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;
 
import "./IMonster.sol";
/**
* @title GameMaster contract interface
* @notice ...
*/
interface IGameMaster is IMonster{
    struct Monster {
            uint256 id;
            uint256 monster_attack;
            uint256 monster_current_health;
            string monster_name;
    }
    function create_monster() external;
 
    function slay_monster(uint256 _index) external;

    function get_monster(uint256 _index) external returns (Monster memory);

    function get_all_monster() external returns (Monster[] memory);
 
    function pause() external ;
 
    function unpause() external ;
 
}
