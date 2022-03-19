//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IGame.sol";
import "./IPlayer.sol";
import "./GameMaster.sol";
import "./GameItems.sol";

/**
 * @title Duel contract
 */

contract Duel {
    // modifier check_isinitialized() {
    //     require(
    //         players[msg.sender].is_initialized == true,
    //         "Haven't initialized the player yet."
    //     );
    //     _;
    // }
    // function invite_duel(address invitee)
    //     external
    //     override
    //     check_isinitialized
    // {
    //     require(
    //         players[msg.sender].is_pending == false &&
    //             players[invitee].is_pending == false
    //     );
    //     players[msg.sender].is_pending = true;
    //     players[invitee].is_pending = true;
    //     duel_match[msg.sender] = invitee;
    // }

    // /*
    //  * @notice accepts another player to duel. Depends if you receive an invite
    //  * Modifies: duel_match, current_health, max_health, opponent_life
    //  * return means if the invitee wins
    //  */
    // function accept_duel(address inviter)
    //     external
    //     override
    //     check_isinitialized
    //     returns (bool result)
    // {
    //     //received the invitation
    //     require(duel_match[inviter] == msg.sender);
    //     uint256 opponent_freq = players[msg.sender].current_health /
    //         players[inviter].attack;
    //     uint256 player_freq = players[inviter].current_health /
    //         players[msg.sender].attack;
    //     if (player_freq <= opponent_freq) {
    //         players[inviter].current_health -=
    //             (player_freq - 1) *
    //             players[msg.sender].attack;
    //         uint256 index = get_random(
    //             players[msg.sender].equipment_storage.length
    //         );
    //         transferEquipment(
    //             players,
    //             msg.sender,
    //             inviter,
    //             players[msg.sender].equipment_storage[index].id,
    //             index
    //         );

    //         if (players[msg.sender].equipment_storage.length == 0) {
    //             players[msg.sender].equipment_storage.push(
    //                 mint_new_sword(players[msg.sender], msg.sender)
    //             );
    //         }
    //         result = false;
    //     } else {
    //         uint256 index = get_random(
    //             players[inviter].equipment_storage.length
    //         );
    //         transferEquipment(
    //             players,
    //             inviter,
    //             msg.sender,
    //             players[inviter].equipment_storage[index].id,
    //             index
    //         );
    //         if (players[inviter].equipment_storage.length == 0) {
    //             players[inviter].equipment_storage.push(
    //                 mint_new_sword(players[inviter], inviter)
    //             );
    //         }
    //         result = true;
    //     }
    //     players[msg.sender].is_pending = false;
    //     players[inviter].is_pending = false;
    //     delete duel_match[inviter];
    //     return result;
    // }

    // /*
    //  * @notice rejects another player to duel. Depends if you receive an invite
    //  */
    // function reject_duel(address inviter) external override {
    //     //received the invitation
    //     require(duel_match[inviter] == msg.sender);
    //     players[msg.sender].is_pending = false;
    //     players[inviter].is_pending = false;
    //     delete duel_match[inviter];
    // }
}