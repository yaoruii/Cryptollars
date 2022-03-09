pragma solidity 0.8.0;

/**
 * @Game Contract
 * @core contract and code
 */
interface IGame {
    
	// player attributes
    struct Player {
		uint256 attack;
		uint256 defence;
		uint256 max_health;
		uint256 current_health;
		uint256 money;
		Equipement;
    }
	
	// equipment attributes
	struct Equipement {
		uint256 sword;
		uint256 armour;
		uint256 potion;
		uint256 knife;
		uint256 horse;
		uint256 dragon;
    }
	
	// environment attributes
	struct Environment {
		uint256 battlefield;
		uint256 store;
		uint256 home;
		uint256 village;
		uint256 mountains;
		uint256 forest;
    }

    mapping(address => player) players;

    /**
     * @notice Player attacks a monster.
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id) external returns(bool result);
	
	/**
     * @notice Player is reborned.
     */
	function reborn() internal;
	
	/**
     * @notice invites another player to duel.
     */
	function invite_duel(address player_address) external returns(bool result);

	/**
     * @notice accepts another player to duel.
     */
	function accept_duel(address player_address) external returns(bool result);
	
	/**
     * @notice rejects another player to duel.
     */
	function reject_duel(address player_address) external returns(bool result);
	
	/**
     * @notice equipes player with equipment.
     */
	function equip(address equipment_address) internal;
	
	/**
     * @notice unequipes player with equipment.
     */
	function unequip(address equipment_address) internal;
	
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
