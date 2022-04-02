//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./IPlayer.sol";
import "./GameMaster.sol";
import "./Trade.sol";


/**
 * @title Game contract
 */

contract Game is IGame, GameMaster, Trade{
    // equipment attributes
    //mapping(address => Player) public players;
    mapping(address => address) public duel_match;
    Equipment empty = Equipment(0, 0, "");

   // mapping(address => Equipment[]) public equipments;

    modifier check_isinitialized() {
        require(
            players[msg.sender].is_initialized == true,
            "Haven't initialized the player yet."
        );
        _;
    }
    function mock_monster(uint256 attack, uint256 monster_health, string memory name) public{
        allMonsters.push(
            Monster(
                attack,
                monster_health,
                name
            )
        );
    }
    function get_storage(address addr)public view returns(Equipment[] memory ){
        return players[addr].equipment_storage;
    }
    function get_storage_len(address addr)public view returns(uint256 ){
        return players[addr].equipment_storage.length;
    }
    function get_current_health(address addr)public view returns(uint256 ){
        return players[addr].current_health;
    }
    function get_max_health(address addr)public view returns(uint256 ){
        return players[addr].max_health;
    }
    function get_attack(address addr)public view returns(uint256 ){
        return players[addr].attack;
    }
    function get_equip_id(address addr)public view returns(uint256 ){
        return players[addr].equipment.id;
    }
    function get_is_pending(address addr)public view returns(bool ){
        return players[addr].is_pending;
    }
    function set_health(address addr,uint256 ch)public {
        players[addr].current_health = ch;
    }
    function initialize(string memory _name) public override {
        require(players[msg.sender].is_initialized == false);
        players[msg.sender].attack = 100;
        players[msg.sender].max_health = 500;
        players[msg.sender].current_health = 500;
        players[msg.sender].player_name = _name;
        players[msg.sender].is_initialized = true;      
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
            //add money
             uint256 amount = get_random(
                10000000
            );
            super.mint_money_silver(msg.sender, amount);
            return true;
        }
        reborn(msg.sender);
        return false;
    }

    
    function equip(uint256 equipment_id) public override check_isinitialized {
        bool gear;
        uint256 i;
        require(players[msg.sender].equipment.id == empty.id, "already has a equipped equipment");
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

    function invite_duel(address invitee)
        external
        override
        check_isinitialized
    {
        require(
            players[msg.sender].is_pending == false &&
                players[invitee].is_pending == false
        );
        require(players[invitee].is_initialized==true,"Player doesn't exist");
        players[msg.sender].is_pending = true;
        players[invitee].is_pending = true;
        duel_match[msg.sender] = invitee;
        super.setApprovalForAll(invitee, true);
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
        //calculate how many times the invitee will need to attack to kill the inviter
        uint256 player_freq = players[inviter].current_health /
            players[msg.sender].attack;
        
        uint256 opponent_freq = players[msg.sender].current_health /
            players[inviter].attack;
        address winner;
        address loser;
        bool result;
            //invitee wins
        if (player_freq <= opponent_freq) {
            winner = msg.sender;
            loser = inviter;
             players[msg.sender].current_health -=
                opponent_freq *
                players[inviter].attack;
            result = true;
        }
        else{
            winner = inviter;
            loser = msg.sender;
             players[inviter].current_health -=
                (player_freq) *
                players[msg.sender].attack;
                result = false;
        }
           
            uint256 index;
            if(players[loser].equipment_storage.length==1){
                index=0;
            }else{
             index= get_random(
                players[loser].equipment_storage.length-1
            );
            }
            players[loser].current_health = players[loser].max_health;
            super.transferEquipment(
                players,
                loser,
                winner,
                players[loser].equipment_storage[index].id,
                index
            );

            if (players[loser].equipment_storage.length == 0) {
                players[loser].equipment_storage.push(
                    mint_new_sword(players[loser], loser)
                );
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
