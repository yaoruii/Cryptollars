//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "./Random.sol";
import "./IGameMaster.sol";
import "./IMonster.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract GameMaster is IGameMaster{
     
    Monster[] public allMonsters;
    uint256 public monsterCounter;
    uint256 public system_monster_health;
    uint256 public monster_maximum_attack;
    bool public is_pause = false;
    Random public random;
    


    constructor (Random _random, uint256 _system_monster_health){
        monsterCounter = 0;
        random = _random;
        system_monster_health = _system_monster_health;
        //initialize some monsters firstly? 
        create_monster();
    }

    function create_monster() public override{
        // uint seed = random.get_random(monster_maximum_attack);
        uint attack = random.get_random(monster_maximum_attack);
        allMonsters.push(Monster(attack, system_monster_health, string(abi.encodePacked("monster",Strings.toString(monsterCounter)))));
        monsterCounter++;


    }
    
    function get_monster(uint _index) public view override returns (Monster memory name) {
        Monster storage monster = allMonsters[_index];
        return monster;
    }

    function get_all_monster() public view override returns (Monster[] memory) {
        return allMonsters;
    }

    function slay_monster(uint _index) public override{
      // mint equipment, token 
      delete allMonsters[_index];

    }
 
    function pause() public override{
        is_pause = true;
    }
 
    function unpause() public override{
        is_pause = false;
    }
}