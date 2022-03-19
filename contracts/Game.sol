//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IGame.sol";
import "./IPlayer.sol";
import "./GameMaster.sol";


/**
 * @title Game contract
 */

contract Game is IGame, GameMaster {
    // equipment attributes
    mapping(address => Player) public players;
    mapping(address => address) public duel_match;
    Equipment empty = Equipment(0, 0, "");

    mapping(address => Equipment[]) public equipments;

    modifier check_isinitialized() {
        require(
            players[msg.sender].is_initialized == true,
            "Haven't initialized the player yet."
        );
        _;
    }
    function get_storage(address addr)public returns(Equipment[] memory ){
        return equipments[addr];
    }
    function get_storage_len(address addr)public returns(uint256 ){
        return equipments[addr].length;
    }
    function get_current_health(address addr)public returns(uint256 ){
        return players[addr].current_health;
    }
    function initialize(string memory _name) public override {
        require(players[msg.sender].is_initialized == false);
        players[msg.sender].attack = 100;
        players[msg.sender].max_health = 500;
        players[msg.sender].current_health = 500;
        players[msg.sender].player_name = _name;
        players[msg.sender].is_initialized = true;
        equipments[msg.sender].push(empty);      
        mint_new_sword(players[msg.sender], msg.sender);
        equip(2);
        players[msg.sender].is_pending = false;
    }

   
    function reborn(address player) internal {
        players[player].current_health = players[player].max_health;
        uint256 index = get_random(players[player].equipment_storage.length);
        burn_equipment(players[player],player,players[player].equipment_storage[index].id,index);
        if (players[player].equipment_storage.length == 0) {
            players[player].equipment_storage.push(
                mint_new_sword(players[player], player)
            );
        }
    }

   
    function attack_monster(uint256 monster_id)external override check_isinitialized
        returns (bool result)
    {   
        require(allMonsters.length>0,"Monster's length should be bigger than 0");
        require(monster_id >= 0 && monster_id < allMonsters.length,"invalid monster id");
        uint256 monster_freq = players[msg.sender].current_health /
            allMonsters[monster_id].attack;
        uint256 player_freq = allMonsters[monster_id].monster_current_health /
            players[msg.sender].attack;
        if (player_freq <= monster_freq) {
            result = true;
            
            players[msg.sender].current_health -=
                (player_freq) *
                allMonsters[monster_id].attack;
            
            mint_equipment(players[msg.sender], msg.sender);

            return true;
        }
        reborn(msg.sender);
        return false;
    }

    
    function equip(uint256 equipment_id) public override check_isinitialized {
        bool gear;
        uint256 i;
        require(players[msg.sender].equipment.id == empty.id);
        for (i = 0; i < players[msg.sender].equipment_storage.length; i++) {
            if (players[msg.sender].equipment_storage[i].id == equipment_id) {
                gear = true;
                break;
            }
        }
        require(gear == true);
        players[msg.sender].attack =
            players[msg.sender].attack +
            players[msg.sender].equipment_storage[i].sword_strength;

        players[msg.sender].equipment = players[msg.sender].equipment_storage[i];
    }

   
    function unequip() external override check_isinitialized {
        require(players[msg.sender].equipment.id != empty.id);

        players[msg.sender].attack =players[msg.sender].attack -
            players[msg.sender].equipment.sword_strength;
        players[msg.sender].equipment = empty;
    }

    
 
}
