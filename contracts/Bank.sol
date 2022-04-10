//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "./IBank.sol";

import "./GameMaster.sol";
/**
 * @title Bank contract
 */
contract Bank is IBank{
     uint256 public index_admin_value;
     address public admin;
     GameMaster gameMaster;
     constructor (uint256 initial_index, GameMaster tokenAddress) {
        admin = msg.sender;
        index_admin_value = initial_index;
        gameMaster = tokenAddress;
     }

    /**
     * @notice Player use silver coins to get gold coins.
     * @param silver_number: the number of silver coins player would like to use for buying gold coins.
     * @notice in this function, player can get gold coins and reduce the number of silver coins.
     */
     function buy_gold(uint256 silver_number) public override returns (uint256 gold_number){
          require(gameMaster.balanceOf(msg.sender, 1) > silver_number, "silver coins are not enough");
          gameMaster.burn_money_silver(msg.sender, silver_number);
          gold_number = silver_number/index_admin_value;
          gameMaster.mint_money_gold(msg.sender, gold_number); 
     }

    /**
     * @notice People exchange money based on present equation and index.
     * @param gold_number: the number of gold coins players want to use for exchanging more silver coins
     * equation: value = equipment value / index; index = (1 + x)^n; (1 + x)^365 = APY; default APY is 130%
     * @notice in this function, player can get silver coins and reduce the number of gold coins.
     */
     function exchange_silver(uint256 gold_number) public override returns (uint256 silver_number){
          require(gameMaster.balanceOf(msg.sender, 0) > gold_number, "gold coins are not enough");
          gameMaster.burn_money_gold(msg.sender, gold_number);
          silver_number = gold_number * index_admin_value;
          super.mint_money_silver(msg.sender, silver_number);
     }

    /**
     * @notice People estimate how many silver coins to put and can get how many gold coins.
     * @param silver_number: the number of silver coins that players want to use for gold coins' estimation.
     * @notice in this function, player just make estimation and the number of money keeps the same.
     */
     function estimate_buy_gold(uint256 silver_number) public override view returns (uint256 gold_number){
          gold_number = silver_number/index_admin_value;
     }

    /**
     * @notice People estimate how many gold coins to put and can get how many silver coins.
     * @param gold_number: the number of gold coins that players want to use for silver coins' exchange estimation.
     * @notice in this function, player just make estimation and the number of money keeps the same.
     */
     function estimate_exchange_silver(uint256 gold_number) public override view returns (uint256 silver_number){
          silver_number = gold_number * index_admin_value;
     }

    /**
     * @notice Only admin can update the index for getting the accurate compound everyday.
     * @param index: the value for index(the ratio between silver coin and gold coin) update everyday by admin.
     * @notice in this function only the index has updated.
     */
     function update_index_admin(uint256 index) override public{
          require(msg.sender == admin, "Only admin can use this function for updating the index value");
          index_admin_value = index;

     }

    /**
     * @notice Players can view the index value for thinking the exchange factor between Gold and Silver Coins.
     */
     function view_index() public override view returns (uint256 index){
          index = index_admin_value;
     }

    /**
     * @notice Everyone can view the number of his own gold coins.
     */
     function view_gold_number(address player_address) public override view returns (uint256 gold_number){
          gold_number = super.balanceOf(player_address, 0);
     }

    /**
     * @notice Everyone can view the number of his own silver coins.
     */
     function view_silver_number(address player_address) public override view returns (uint256 silver_number){
          silver_number =super.balanceOf(player_address, 1);
     }

     /**
     * @notice This function is only for test use. And only admin can run it.
     * @param _to: _to means the targeted player's address.
     * @notice Players can get initial gold coins and silver coins.
     */
     function test_mint_initial(address _to) public {
          require(msg.sender == admin);
          super.mint_money_silver(_to, 130000000);
          super.mint_money_gold(_to, 130000000);
     }

}