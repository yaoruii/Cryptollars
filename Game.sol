//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IGame.sol";

/**
 * @title Bank contract
 */
 contract Game is IGame{
    
   
	constructor () {
		players[msg.sender].is_pending = false;
	}
	// equipment attributes
	
    mapping(address => Player) players;
	mapping(address => address) duel_match;
	mapping(int => Equipment) equipments;
	Monster[] monsters;
	Equipment new_sword = Equipment(0, 12345, "new_sword");
	/*
     * @notice Player is reborned. Depends on the result of attack_monster
	 * Modifies: equipment, player health and current health
     */
	function reborn() public{

		players[msg.sender].current_health=players[msg.sender].max_health;
		delete players[msg.sender].equipment_storage[0];
		if(players[msg.sender].equipment_storage.length==0){
			
			players[msg.sender].equipment_storage.push(10,1,"new_sword");
		}

	}
    /*
     * @notice: Player attacks a monster.
	 * Depends on the monster's health, attack strength and player's attack strength and health 
	 * Modifies: player's health, Player's equipement and money balance
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id) external returns(bool result){
        
        uint256 monster_freq = players[msg.sender].current_health/monsters[monster_id].attack;
        uint256 player_freq = monsters[monster_id].monster_current_health/players[msg.sender].attack;
		if(player_freq<=monster_freq){
			result=true;
			players[msg.sender].current_health-=(player_freq-1)*monsters[monster_id].attack;
			/*
			add equipment and money
			*/
			return true;
		}
		result=false;
		reborn();
		return false;
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
	/*
     * @notice invites another player to duel. Depends on you can only send one invite at a time.
     * to judge if duel doesn't exist. add a variable

	 * Modifies: duel_match
     * dont use player_address, use inviter 
     */
	function invite_duel(address invitee) external returns(bool result){
		require(players[msg.sender].is_pending==false&&players[invitee].is_pending==false);
		players[msg.sender].is_pending=true;
		duel_match[msg.sender]=invitee;
		return true;
	}

	/*
     * @notice accepts another player to duel. Depends if you receive an invite
	 * Modifies: duel_match, current_health, max_health, opponent_life
	 * return means if the inviter wins
     */
	function accept_duel(address inviter) external returns(bool result){
		//received the invite
		require(duel_match[inviter]==msg.sender);
		players[msg.sender].is_pending=true;
        uint256 opponent_freq = players[msg.sender].current_health/players[inviter].attack;
        uint256 player_freq = players[inviter].current_health/players[msg.sender].attack;
		if(player_freq<=opponent_freq){
			players[inviter].current_health-=(player_freq-1)*players[msg.sender].attack;
			/*
			add equipment
			*/
			
			result = true;
		}else{
			result=false;
		}
		players[msg.sender].is_pending=false;
		players[inviter].is_pending=false;
		return result;
	}
	/*
     * @notice rejects another player to duel. Depends if you receive an invite
     */
	function reject_duel(address inviter) external returns(bool result){
		//received the invite
		require(duel_match[inviter]==msg.sender);
		players[msg.sender].is_pending=false;
		players[inviter].is_pending=false;
	}
	
	
 }