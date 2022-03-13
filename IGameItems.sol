//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;


interface IGameItems{

    /**
    This function is used to initialzie every player's initial money and equipment.
    player: the address of this player
    */
    function mint_initialize(address player) external;

    /**
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_equipment(
        address to,
        bytes memory data) external;

    /**
    to: money owner's address
    money: gold or silver,0 or 1
    amount: the amount of money
     */
    function mint_money(
        address to,
        uint256 money_id,
        uint256 amount,
        bytes memory data
    )external;

    /*
    * Destroys `amount` tokens of token type `id` from `from`
    */
    function burn_money(
        address from,
        uint256 id,
        uint256 amount
    ) external ;
     /*
    * Destroys the equipment of token type `id` from `from`
    */
    function burn_equipment(
        address from,
        uint256 id
    ) external ;


    /*
    Transfers the equipment of token type `id` from `from` to 'to'
    */
    function transfer(
        address from,
        address to,
        uint256 equipmentId,
        bytes memory data
    ) external ;
    
}