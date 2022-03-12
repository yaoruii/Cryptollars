//SPDX-License-Identifier: MIT;
pragma solidity 0.8.0;

/**
 * @title Bank contract
 */
 contract Game is IGame{
     // player attributes
    struct Player {
		uint256 attack;
		uint256 max_health;
		uint256 current_health;
		string player_name;
		int[] equipment_storage;
		Equipment equipename;
    }
	
	// equipment attributes
	struct Equipment {
		uint256 sword_strength;
		int equipment_id;
    }
	
	// monster attributes
	struct Monster {
		uint256 monster_attack;
		uint256 monster_current_health;
		string monster_name;
    }
    mapping(address => Player) players;
	mapping(address => address) duel_match;
	mapping(int => Equipment) equipments;
    /*
     * @notice: Player attacks a monster.
	 * Depends on the monster's health, attack strength and player's attack strength and health 
	 * Modifies: player's health, Player's equipement and money balance
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id) external returns(bool result){
        uint256 current_attack = players[msg.sender].attack+equipename.sword_strength;
        uint256 monster_freq = players[msg.sender].current_health/monsters[monster_id].attack;
        uint256 player_freq = monsters[monster_id].monster_current_health/current_attack;
		if(player_freq<=monster_freq){
			result=true;
			players[msg.sender].current_health-=player_freq*monsters[monster_id].attack;
			/*
			add equipment and money
			*/
		}
		else{
			result=false;
			reborn();
		}
		return result;
		
    }
	/*
     * @notice Player is reborned. Depends on the result of attack_monster
	 * Modifies: equipment, player health and current health
     */
	function reborn() external{

		players[msg.sender].current_health=players[msg.sender].max_health;

	}
	/*
     * @notice equipes player with equipment. Depends if equipment is avaliable
	 * Modifies: player attack_strength, equipment sale status
     */
	function equip(uint equipment_id) external;
	
	/*
     * @notice unequipes player with equipment. Depends if the equipment is equiped
	 * Modifies: player attack_strength, equipment sale status
     */
	function unequip(uint equipment_id) external;
	
 }