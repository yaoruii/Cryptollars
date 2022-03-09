//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

interface GameItems is ERC1155 {
    // uint256 public constant GOLD = 0;
    // uint256 public constant SILVER = 1;
    

    // constructor() public ERC1155("https://game.example/api/item/{id}.json") {
    //     _mint(msg.sender, GOLD, 10**18, "");
    //     _mint(msg.sender, SILVER, 10**27, "");
    //     _mint(msg.sender, THORS_HAMMER, 1, "");
    //     _mint(msg.sender, SWORD, 10**9, "");
    //     _mint(msg.sender, SHIELD, 10**9, "");
    // }
    function balanceOf(address account, uint256 id) external returns (uint256);


    /*
    * Creates `amount` tokens of token type `id`, and assigns them to `to`.
    */
    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external ;

    /*
    * Destroys `amount` tokens of token type `id` from `from`
    */
    function _burn(
        address from,
        uint256 id,
        uint256 amount
    );

    /*
    Transfers `amount` tokens of token type `id` from `from` to `to`.
    */
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
    
}