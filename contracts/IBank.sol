//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/**
 * @title Bank contract interface
 * @notice only two types of coins are used in this sol file.
 */
interface IBank {

    /**
     * @notice Player use silver coins to get gold coins.
     * @param silver_number: the number of silver coins.
     * @notice in this function, player can get gold coins and reduce the number of silver coins.
     */
    function buy_gold(uint256 silver_number) external returns(uint256 gold_number);

    /**
     * @notice People exchange money based on present equation and index.
     * @param gold_number: the number of gold coins that wish to exchange for silver coins.
     * return is silver_number: the number of silver coins based on the equation. 
     * equation: value = equipment value / index; index = (1 + x)^n; (1 + x)^365 = APY; default APY is 130%
     * @notice in this function, player can get silver coins and reduce the number of gold coins.
     */
    function exchange_silver(uint256 gold_number) external returns(uint256 silver_number);

    /**
     * @notice People estimate how many silver coins to put and can get how many gold coins
     * @param silver_number: the number of silver coins
     * return is the number of gold coins based on current index.
     * @notice in this function, player just make estimation and the number of money keeps the same.
     */
    function estimate_buy_gold(uint256 silver_number) external view returns(uint256 gold_number);

    /**
     * @notice People estimate how many gold coins to put and can get how many silver coins
     * @param gold_number: the number of gold coins.
     * return is the number of silver coins based on current index.
     * @notice in this function, player just make estimation and the number of money keeps the same.
     */
    function estimate_exchange_silver(uint256 gold_number) external view returns(uint256 silver_number);


    /**
     * @notice Only admin can update the index for getting the accurate compound everyday.
     * @param index:input is the index value, which means the exchange factor between Gold and Silver Coins.
     * no output
     * require(msg.sender == admin);
     * @notice in this function only the index has updated.
     */
    function update_index_admin(uint256 index) external ;

    /**
     * @notice Players can view the index value for thinking the exchange factor between Gold and Silver Coins
     * return is the real-time index of the exchange between Gold and Silver Coins.
     */
    function view_index() external view returns(uint256 index);

    /**
     * @notice Everyone can view the number of his own gold coins.
     * return is the number of gold coins a player had.
     */
    function view_gold_number() external view returns(uint256 gold_number);

    /**
     * @notice Everyone can view the number of his own silver coins.
     * return is the number of silver coins a player had.
     */
    function view_silver_number() external view returns(uint256 silver_number);
}
