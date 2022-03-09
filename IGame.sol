pragma solidity 0.8.0;

/**
 * @Game Contract
 * @core contract and code
 */
interface IGame {
    
	// player attributes
    struct Player {
		uint256 attack;
		uint256 max_health;
		uint256 current_health;
		Equipement equipename;
    }
	
	// equipment attributes
	struct Equipement {
		uint256 sword_strength;

    }
	
	// monster attributes
	struct Monster {
		uint256 monster_attack;
		uint256 monster_max_health;
		uint256 mosnter_current_health;
    }
	
	// duel attributes
	
	struct Duel {
		uint256 opponent_life;
		uint256 opponent_current_life;
	}
	
	// trade attributes
	struct Trade {
		uint256 opponent_money;
		Equipement equipename;
	}

    mapping(address => Player) players;
	mapping(adresss => Duel) duel_match;

    /**
     * @notice: Player attacks a monster.
	 * Depends on the monster's health, attack strength and player's attack strength and health 
	 * Modifies: monster's health and player's health, Player's equipement and money balance
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id) external returns(bool result);
	

	/**
     * @notice Player is reborned. Depends on the result of attack_monster
	 * Modifies: equipement, player health and current health
     */
	function reborn() internal;
	
	/**
     * @notice invites another player to duel. Depends on you can only send one invite at a time.
	 * Modifies: duel_match
     */
	function invite_duel(address player_address) external returns(bool result);

	/**
     * @notice accepts another player to duel. Depends if you receive an invite
	 * Modifies: duel_match, current_health, max_health, opponent_life
     */
	function accept_duel(address player_address) external returns(bool result);
	
	/**
     * @notice rejects another player to duel. Depends if you receive an invite
     */
	function reject_duel(address player_address) external returns(bool result);
	
	/**
     * @notice equipes player with equipment. Depends if equiepment is avaliable
	 * Modifies: attack_strength
     */
	function equip(uint equipment_id) external;
	
	/**
     * @notice unequipes player with equipment.
	 * Modifies: attack_strength
     */
	function unequip(uint equipment_id) external;
	
	/**
     * @notice invites another player to trade.
     */
	function invite_trade(address player_address, address equipment_address, address gold_address)  external returns(bool result);
	
	/**
     * @notice accepts another player;s trade offer .
     */
	function accept_trade(address player_address)  external returns(bool result);
	
	/**
     * @notice stake an unequipped equipment.
     */
	function stake(address equipment_address) internal;
	
	/**
     * @notice unstake and claim the reward.
     */
	function unstake(address equipment_address) internal;
}
