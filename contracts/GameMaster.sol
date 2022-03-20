//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "./Random.sol";
import "./IGameMaster.sol";
import "./IMonster.sol";
import "./GameItems.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
* @title GameMaster contract
* @notice create, slay monsters and control the game
*/
contract GameMaster is IGameMaster, GameItems{
     
    Monster[] public allMonsters;
    address public admin;
    uint256 public monsterCounter;
    uint256 public monster_maximum_health = 20;
    uint256 public monster_maximum_attack = 12;
    uint256 public monster_minimum_attack = 8;
    bool public is_going ;

    

    constructor () GameItems(){
        monsterCounter = 0;
        admin = msg.sender;
        is_going = true;
        // system_monster_health = _system_monster_health;
        //initialize some monsters firstly? ?
        create_monster();
    }

    /**
     */
     function get_admin() public view returns(address){
         return admin;

     }

    /*
     * @notice: create a monster
     * Modifies: allMonster array
     * can not create monster when game is paused
     */
    function create_monster() public override{
        // uint seed = random.get_random(monster_maximum_attack);
        uint attack = get_random(monster_maximum_attack);
        uint monster_health = get_random(monster_maximum_health);
        allMonsters.push(Monster(attack, monster_health, string(abi.encodePacked("monster",Strings.toString(monsterCounter)))));
        monsterCounter++;
    }
    
    /*
     * @notice get a monster's details
     * @Depends on: _index
     * @return a monster's details
     */
    function get_monster(uint _index) public view override returns (Monster memory name) {
        Monster storage monster = allMonsters[_index];
        return monster;
    }

    /*
     * @notice: get all monsters' details
     * @return all monsters' details
     */
    function get_all_monster() public view override returns (Monster[] memory) {
        return allMonsters;
    }

    


    /*
     * @notice: pause this game
     * require
     * admin
     */
    function pause() public override {
        require(msg.sender == admin, "only admin can do pause operation!");
        require(is_going, "game is already paused, please do not repeat this");
        is_going = false;
    }

    /*
     * @notice: unpause this game
     * require
     * admin
     */
    function unpause() public override{
        require(msg.sender == admin, "only admin can do unpause operation!");
        require(!is_going, "game is already unpaused, please do not repeat this");
        is_going = true;
    }

    /**
     */
     function get_game_status() public view returns (bool){
         return is_going;
     }
}