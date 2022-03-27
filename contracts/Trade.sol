//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./ITrade.sol";
import "./GameItems.sol";


/**
 * @title Trade
 * @notice For making transactions between equipment and coins for two players.
 */
contract Trade is ITrade, GameItems {
     
     mapping(address => Trade) trades;
     mapping(address => Player) players;

     constructor(){
     }

     /**
     * @notice Player start a trade for selling equipment with a certain number of silver coins
     * @param invitee_address: the address of the player and the equipment wanted to sell as well as the silver number with that.
     * @notice in this function, player can make a trade.
     */
     function invite_trade(address invitee_address, uint256 equipment_id, uint256 silver_number) public override {
          bool flag = false;
          for (uint256 i = 0; i < players[msg.sender].equipment_storage.length; i++) {
               if (players[msg.sender].equipment_storage[i].id == equipment_id) {
                    flag = true;
                    break;
               }
          }
          require(trades[msg.sender].is_valid_trade == false, "There exists trade that should be accepted or declined first");
          require(flag, "invalid equipment id" );
          require(players[msg.sender].equipment_storage.length > 1, "Insufficient equipment storage" );

          trades[msg.sender].equipment_id = equipment_id;
          trades[msg.sender].silver_coin = silver_number;
          trades[msg.sender].to_player = invitee_address;
          trades[msg.sender].is_valid_trade = true;
          
          // seller gives authorization to buyer and thus equipment can be transferred
          super.setApprovalForAll(invitee_address, true);
          
     }

     /**
     * @notice Player agree to have the trade with another player.
     * @param inviter_address: the address of the player who created the trade.
     * @notice Player 1 reduce an equipement and player 2 reduce the silver coins and increase one equipment.
     */
     function accept_trade(address inviter_address) external override { 
          require(trades[inviter_address].is_valid_trade, "The trade is not valid");
          require(super.balanceOf(msg.sender, 1) > trades[inviter_address].silver_coin, "player silver coins are not enough");

          uint256 eq_id = trades[inviter_address].equipment_id;
          uint256 index = 0;
          for (uint256 i = 0; i < players[inviter_address].equipment_storage.length; i++) {
               if (players[inviter_address].equipment_storage[i].id == eq_id) {
                    index = i;
                    break;
               }
          }

          //for buyer
          super.burn_money_silver(msg.sender, trades[inviter_address].silver_coin);

          //for seller
          super.transferEquipment(players, inviter_address, msg.sender, trades[inviter_address].equipment_id, index);
          super.mint_money_silver(inviter_address, trades[inviter_address].silver_coin);
     
          trades[inviter_address].is_valid_trade = false;

     }

     /**
     * @notice Player agree to have the trade with another player.
     * @param inviter_address: the address of the player who created the trade.
     * @notice Player 1 reduce an equipement and player 2 reduce the silver coins and increase one equipment.
     */
     function decline_trade(address inviter_address) external override {
          require(trades[inviter_address].is_valid_trade, "The trade is not valid");
          trades[inviter_address].is_valid_trade = false;
     }

     /**
     * @notice Give the player new equipment.
     * @param _to: the address of the player who is given equipment.
     */
     function test_mint_equipment(address _to) external {
          super.mint_equipment(players[_to], _to);
     }

     /**
     * @notice Give the player some silver coins.
     * @param _to: the address of the player who receives silver coins.
     */
     function test_mint_money_silver(address _to, uint256 silver_coins) external {
          super.mint_money_silver(_to, silver_coins);
     }

     /**
     * @notice Return the corresponding object Player of an address.
     * @param player_address: the address of whose Player will be returned.
     */
     function test_players(address player_address) external view returns(Player memory player) {
          return players[player_address];
     }

     /**
     * @notice Return the id of the first equipment given an address.
     * @param player_address: the address of the player.
     */
     function get_specific_equip_id(address player_address, uint256 index) external view returns(uint256 id) {
          return players[player_address].equipment_storage[index].id;
          
     }


     /**
     * @notice Return whether the player's trade is valid.
     * @param player_address: the address of the player.
     */
     function test_trades(address player_address) external view returns(bool is_valid) {
          return trades[player_address].is_valid_trade;
     }

}