//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./GameMaster.sol";
contract Duel is GameMaster{
    modifier check_isinitialized() {
        require(
            players[msg.sender].is_initialized == true,
            "Haven't initialized the player yet."
        );
        _;
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