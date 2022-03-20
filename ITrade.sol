//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IPlayer.sol";
/**
 * @title Trade interface
 * @notice For making transactions between equipment and coins for different players.
 */
interface ITrade is IPlayer{

    struct Trade {
        uint256 equipment_id;
        uint256 silver_coin;
        address to_player;
        bool is_valid_trade;
    }

    //mapping(address => Trade) trades;

    /**
     * @notice Player start a trade for selling equipment with a certain number of silver coins
     * @param invitee_address: the address of the player and the equipment wanted to sell as well as the silver number with that.
     * @notice in this function, player can make a trade.
     */
    function invite_trade(address invitee_address, uint256 equipment_id, uint256 silver_number) external;

    /**
     * @notice Player agree to have the trade with another player.
     * @param inviter_address: the address of the player who created the trade.
     * @notice inviter reduce an equipement and invitee reduce the silver coins and increase one equipment.
     */
    function accept_trade(address inviter_address) external;

     /**
     * @notice Player disagree to have the trade with another player.
     * @param inviter_address: the address of the player who created the trade.
     */
    function decline_trade(address inviter_address) external;

}

