//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IGame.sol";
import "./IPlayer.sol";
import "./GameMaster.sol";
import "./GameItems.sol";

/**
 * @title Game contract
 */

contract Game is IGame, GameMaster, GameItems {
    // equipment attributes

    mapping(address => Player) players;
    mapping(address => address) duel_match;

    Equipment empty = Equipment(0, 0, "");

    modifier check_isinitialized() {
        require(
            players[msg.sender].is_initialized == true,
            "Haven't initialized the player yet."
        );
        _;
    }

    function initialize(string memory _name) public override {
        require(players[msg.sender].is_initialized == false);
        players[msg.sender].attack = 100;
        players[msg.sender].max_health = 500;
        players[msg.sender].current_health = 500;
        players[msg.sender].player_name = _name;
        players[msg.sender].equipment_storage.push(
            mint_new_sword(players[msg.sender], msg.sender)
        );
        equip(2);
        players[msg.sender].is_pending = false;
        players[msg.sender].is_initialized = true;
    }

    /*
     * @notice Player is reborned. Depends on the result of attack_monster
     * Modifies: equipment, player health and current health
     */
    function reborn(address player) internal {
        players[player].current_health = players[player].max_health;
        uint256 index = get_random(players[player].equipment_storage.length);
        burn_equipment(
            players[player],
            player,
            players[player].equipment_storage[index].id,
            index
        );
        if (players[player].equipment_storage.length == 0) {
            players[player].equipment_storage.push(
                mint_new_sword(players[player], player)
            );
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
        override
        check_isinitialized
        returns (bool result)
    {
        require(monster_id >= 0 && monster_id < allMonsters.length);
        uint256 monster_freq = players[msg.sender].current_health /
            allMonsters[monster_id].attack;
        uint256 player_freq = allMonsters[monster_id].monster_current_health /
            players[msg.sender].attack;
        if (player_freq <= monster_freq) {
            result = true;
            players[msg.sender].current_health -=
                (player_freq - 1) *
                allMonsters[monster_id].attack;

            mint_equipment(players[msg.sender], msg.sender);

            return true;
        }
        reborn(msg.sender);
        return false;
    }

    /*
     * @notice equipes player with equipment. Depends if equipment is avaliable
     * Modifies: player attack_strength, equipment sale status
     */
    function equip(uint256 equipment_id) public override {
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

        players[msg.sender].equipment = players[msg.sender].equipment_storage[
            i
        ];
    }

    /*
     * @notice unequipes player with equipment. Depends if the equipment is equiped
     * Modifies: player attack_strength, equipment sale status
     */
    function unequip(uint256 equipment_id) external override {
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
    function invite_duel(address invitee)
        external
        override
        check_isinitialized
    {
        require(
            players[msg.sender].is_pending == false &&
                players[invitee].is_pending == false
        );
        players[msg.sender].is_pending = true;
        players[invitee].is_pending = true;
        duel_match[msg.sender] = invitee;
    }

    /*
     * @notice accepts another player to duel. Depends if you receive an invite
     * Modifies: duel_match, current_health, max_health, opponent_life
     * return means if the invitee wins
     */
    function accept_duel(address inviter)
        external
        override
        check_isinitialized
        returns (bool result)
    {
        //received the invitation
        require(duel_match[inviter] == msg.sender);
        uint256 opponent_freq = players[msg.sender].current_health /
            players[inviter].attack;
        uint256 player_freq = players[inviter].current_health /
            players[msg.sender].attack;
        if (player_freq <= opponent_freq) {
            players[inviter].current_health -=
                (player_freq - 1) *
                players[msg.sender].attack;
            uint256 index = get_random(
                players[msg.sender].equipment_storage.length
            );
            transferEquipment(
                players,
                msg.sender,
                inviter,
                players[msg.sender].equipment_storage[index].id,
                index
            );

            if (players[msg.sender].equipment_storage.length == 0) {
                players[msg.sender].equipment_storage.push(
                    mint_new_sword(players[msg.sender], msg.sender)
                );
            }
            result = false;
        } else {
            uint256 index = get_random(
                players[inviter].equipment_storage.length
            );
            transferEquipment(
                players,
                inviter,
                msg.sender,
                players[inviter].equipment_storage[index].id,
                index
            );
            if (players[inviter].equipment_storage.length == 0) {
                players[inviter].equipment_storage.push(
                    mint_new_sword(players[inviter], inviter)
                );
            }
            result = true;
        }
        players[msg.sender].is_pending = false;
        players[inviter].is_pending = false;
        delete duel_match[inviter];
        return result;
    }

    /*
     * @notice rejects another player to duel. Depends if you receive an invite
     */
    function reject_duel(address inviter) external override {
        //received the invitation
        require(duel_match[inviter] == msg.sender);
        players[msg.sender].is_pending = false;
        players[inviter].is_pending = false;
        delete duel_match[inviter];
    }
}
