pragma solidity 0.8.0;

/*
 * @Game Contract
 * @core contract and code
 */
 
contract IGame {
    
	// player attributes
    struct Player {
		uint256 attack;
		uint256 max_health;
		uint256 current_health;
		string player_name;
		Equipment[] equipment_storage;
		Equipment equipment;
    }
	
	Equipment empty = Equipment(0, 12345, "");
	
	// equipment attributes
	struct Equipment {
		uint256 sword_strength;
		uint256 id;
		string equipment_name;
    }
	
	// monster attributes
	struct Monster {
		uint256 monster_attack;
		uint256 monster_current_health;
		string monster_name;
    }

    mapping(address => Player) players;
	mapping(address => address) duel_match;
	
    /*
     * @notice: Player attacks a monster.
	 * Depends on the monster's health, attack strength and player's attack strength and health 
	 * Modifies: monster's health and player's health, Player's equipement and money balance
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id) external returns(bool result);
	
	/*
     * @notice Player is reborned. Depends on the result of attack_monster
	 * Modifies: equipment, player health and current health
     */
	function reborn() external{
		//equipment lost
		
		players[message.sender];
	}
	/*
     * @notice invites another player to duel. Depends on you can only send one invite at a time.
	 * Modifies: duel_match
     */
	function invite_duel(address player_address) external returns(bool result);

	/*
     * @notice accepts another player to duel. Depends if you receive an invite
	 * Modifies: duel_match, current_health, max_health, opponent_life
     */
	function accept_duel(address player_address) external returns(bool result);
	
	/*
     * @notice rejects another player to duel. Depends if you receive an invite
     */
	function reject_duel(address player_address) external returns(bool result);

	/*
     * @notice equipes player with equipment. Depends if equipment is avaliable
	 * Modifies: player attack_strength, equipment sale status
     */
	function equip(uint equipment_id) external {
	
        bool gear;
        uint256 i; 
		require(players[msg.sender].equipment.id == empty.id);
        
        for(i  = 0; i < players[msg.sender].equipment_storage.length; i++){
			if (players[msg.sender].equipment_storage[i].id == equipment_id) {
			gear = true;
			}
		}

		require(gear == true);
		
		players[msg.sender].attack = players[msg.sender].attack + players[msg.sender].equipment_storage[i].sword_strength;
		
		players[msg.sender].equipment = players[msg.sender].equipment_storage[i];
	}
	
	/*
     * @notice unequipes player with equipment. Depends if the equipment is equiped
	 * Modifies: player attack_strength, equipment sale status
     */
	function unequip() external{
	
		require(players[msg.sender].equipment.id != empty.id);
		
		players[msg.sender].attack = players[msg.sender].attack - players[msg.sender].equipment.sword_strength;
		
		players[msg.sender].equipment = empty;
    }
}