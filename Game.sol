//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IGame.sol";
import "./IPlayer.sol";

/**
 * @title Bank contract
 */

contract Game is IGame {
    // equipment attributes

    mapping(address => Player) players;
    mapping(address => address) duel_match;
    //mapping (uint => Monster) public monsters;
    Monster[] public monsters;

    Equipment new_sword = Equipment(0, 12345, "new_sword");
    Equipment empty = Equipment(0, 12345, "");

    modifier check() {
        require(
            players[msg.sender].is_initialized == true,
            "Haven't initialized the player yet."
        );
        _;
    }

    function initialize() public returns (bool result) {
        require(players[msg.sender].is_initialized == false);
        players[msg.sender].attack = 100;
        players[msg.sender].max_health = 500;
        players[msg.sender].current_health = 500;
        players[msg.sender].player_name = "Jack";
        add_equipment(0, 12345, "new_sword");
        equip(0);
        players[msg.sender].is_pending = false;
        players[msg.sender].is_initialized = true;
    }

    function push_master(
        uint256 attack,
        uint256 monster_current_health,
        string calldata monster_name
    ) external {
        monsters.push(Monster(attack, monster_current_health, monster_name));
    }

    function add_equipment(
        uint256 sword_strength,
        uint256 id,
        string memory equipment_name
    ) internal {
        players[msg.sender].equipment_storage.push(
            Equipment(sword_strength, id, equipment_name)
        );
    }

    /*
     * @notice Player is reborned. Depends on the result of attack_monster
     * Modifies: equipment, player health and current health
     */
    function reborn() internal {
        players[msg.sender].current_health = players[msg.sender].max_health;
        delete players[msg.sender].equipment_storage[0];
        if (players[msg.sender].equipment_storage.length == 0) {
            players[msg.sender].equipment_storage.push(new_sword);
        }
    }

    /*
     * @notice: Player attacks a monster.
     * Depends on the monster's health, attack strength and player's attack strength and health
     * Modifies: player's health, Player's equipement and money balance
     * @param monster_id the id of a monster.
     * @return result True = kill the monster; False = get killed.
     */
    function attack_monster(uint256 monster_id)
        external
        check
        returns (bool result)
    {
        require(monster_id >= 0 && monster_id < monsters.length);
        uint256 monster_freq = players[msg.sender].current_health /
            monsters[monster_id].attack;
        uint256 player_freq = monsters[monster_id].monster_current_health /
            players[msg.sender].attack;
        if (player_freq <= monster_freq) {
            result = true;
            players[msg.sender].current_health -=
                (player_freq - 1) *
                monsters[monster_id].attack;
            add_equipment(100, 2, "good_sword");
            return true;
        }

        reborn();
        return false;
    }

    /*
     * @notice equipes player with equipment. Depends if equipment is avaliable
     * Modifies: player attack_strength, equipment sale status
     */
    function equip(uint256 equipment_id) public {
        bool gear;
        uint256 i;
        require(players[msg.sender].equipment.id == empty.id);

        for (i = 0; i < players[msg.sender].equipment_storage.length; i++) {
            if (players[msg.sender].equipment_storage[i].id == equipment_id) {
                gear = true;
            }
        }

        require(gear == true);

        players[msg.sender].attack =
            players[msg.sender].attack +
            players[msg.sender].equipment_storage[i].sword_strength;

        players[msg.sender].equipment = players[msg.sender].equipment_storage[
            i
        ];
    }

    /*
     * @notice unequipes player with equipment. Depends if the equipment is equiped
     * Modifies: player attack_strength, equipment sale status
     */
    function unequip(uint256 equipment_id) external {
        require(players[msg.sender].equipment.id != empty.id);

        players[msg.sender].attack =
            players[msg.sender].attack -
            players[msg.sender].equipment.sword_strength;

        players[msg.sender].equipment = empty;
    }

    /*
     * @notice invites another player to duel. Depends on you can only send one invite at a time.
     * to judge if duel doesn't exist. add a variable

	 * Modifies: duel_match
     * dont use player_address, use inviter 
     */
    function invite_duel(address invitee) external check returns (bool result) {
        require(
            players[msg.sender].is_pending == false &&
                players[invitee].is_pending == false
        );
        players[msg.sender].is_pending = true;
        players[invitee].is_pending = true;
        duel_match[msg.sender] = invitee;
        return true;
    }

    /*
     * @notice accepts another player to duel. Depends if you receive an invite
     * Modifies: duel_match, current_health, max_health, opponent_life
     * return means if the inviter wins
     */
    function accept_duel(address inviter) external check returns (bool result) {
        //received the invite
        require(duel_match[inviter] == msg.sender);
        players[msg.sender].is_pending = true;
        uint256 opponent_freq = players[msg.sender].current_health /
            players[inviter].attack;
        uint256 player_freq = players[inviter].current_health /
            players[msg.sender].attack;
        if (player_freq <= opponent_freq) {
            players[inviter].current_health -=
                (player_freq - 1) *
                players[msg.sender].attack;
            /*
			add equipment
			*/

            result = true;
        } else {
            result = false;
        }
        players[msg.sender].is_pending = false;
        players[inviter].is_pending = false;
        return result;
    }

    /*
     * @notice rejects another player to duel. Depends if you receive an invite
     */
    function reject_duel(address inviter) external returns (bool result) {
        //received the invite
        require(duel_match[inviter] == msg.sender);
        players[msg.sender].is_pending = false;
        players[inviter].is_pending = false;
        return true;
    }
}
