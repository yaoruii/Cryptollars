//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/*
 * @Game Contract
 * @core contract and code
 */
 
interface IGame {
    
	// player attributes
    struct Player {
		uint256 attack;
		uint256 max_health;
		uint256 current_health;
		string player_name;
		Equipment[] equipment_storage;
		Equipment equipment;
        bool is_pending;
    }
	
	// equipment attributes
	struct Equipment {
		uint256 sword_strength;
		uint256 equipment_id;
        string equipment_name;
    }
	
	// monster attributes
	struct Monster {
		uint256 attack;
		uint256 monster_current_health;
		string monster_name;
    }

    //mapping(address => Player) players;
	//mapping(address => address) duel_match;

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
	function reborn() external;
	
	/*
     * @notice invites another player to duel. Depends on you can only send one invite at a time.
     * to judge if duel doesn't exist. add a variable

	 * Modifies: duel_match
     * dont use player_address, use inviter 
     */
	function invite_duel(address invitee) external returns(bool result);

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
	function equip(uint equipment_id) external;
	
	/*
     * @notice unequipes player with equipment. Depends if the equipment is equiped
	 * Modifies: player attack_strength, equipment sale status
     */
	function unequip(uint equipment_id) external;
}