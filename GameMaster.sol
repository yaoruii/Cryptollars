pragma solidity >=0.8.0;
 
 
/**
* @title GameMaster contract interface
* @notice ...
*/
interface GameMaster{
 
    struct Monster{
 
    }
   
 
    function create_monster() external returns (Monster memory newMonster);
 
    function slay_monster(Monster memory monster) external returns (bool result);
 
    function pause() external returns (bool result);
 
    function unpause() external returns (bool result);
 
}
