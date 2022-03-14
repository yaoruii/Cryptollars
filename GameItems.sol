//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IGameItems.sol";
import "./IPlayer.sol";
import "./Random.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItems is IGameItems, ERC1155, Random{

    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant NEW_SWARD = 2;//


    uint256 public equipment_counter = 3;

    uint256 public equipment_maximum_attack = 12;
    uint256 public equipment_minimum_attack = 8;

    uint256 public new_sward_attack = 8;


    Random public random;

    string  prefix_equipment = "equipment";

   

    // mapping(uint256 => Equipment) allEquipments;


    constructor() ERC1155("") Random(equipment_minimum_attack){
        // mint_money(msg.sender, GOLD, 10**18, "");
        // mint_money(msg.sender, SILVER, 10**27, "");
        // mint_equipment(msg.sender, "");
    }

    // function get_random_attack() internal returns(uint256){
    //     return 
    // }


    /**
    This function is used to initialzie every player's initial equipment: NEW_SWARD.
    player: the address of this player
    */
    function mint_initialize(address player) internal returns(Equipment memory){
        // mint_money(player, GOLD, 10**18, "");
        // mint_money(player, SILVER, 10**27, "");
        return mint_new_sward(player);
    }

    /**
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_new_sward(
        address to) internal returns(Equipment memory){
            _mint(to,NEW_SWARD , 1, "");
            Equipment memory new_equipment = Equipment(new_sward_attack, NEW_SWARD , "new_sward");
            return new_equipment;
    }

    /**
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_equipment(
        address to,
        bytes memory data) internal returns(Equipment memory){
            _mint(to,equipment_counter , 1, data);
            uint256 attack_value = get_random(equipment_maximum_attack);
            Equipment memory new_equipment = Equipment(attack_value, equipment_counter , string(abi.encodePacked(prefix_equipment,Strings.toString(equipment_counter))));
            // [equipment_counter] = new_equipallEquipmentsment;
            equipment_counter++;
            return new_equipment;
    }

    /**
    to: money owner's address
    money: gold :0
    amount: the amount of money
     */
    function mint_money_gold(
        address to,
        uint256 amount
    ) internal{
        _mint(to, 0, amount, "");
    }

     /**
    to: money owner's address
    money: SILVER:1
    amount: the amount of money
     */
    function mint_money_silver(
        address to,
        uint256 amount
    ) internal{
        _mint(to, 1, amount, "");
    }

    /*
    * Destroys `amount` tokens of gold from `from`
    */
    function burn_money_gold (
        address from,
        uint256 amount
    ) internal {
        _burn(from, 0, amount);

    }

    /*
    * Destroys `amount` tokens of silver from `from`
    */
    function burn_money_silver(
        address from,
        uint256 amount
    ) internal {
        _burn(from, 1, amount);
    }

     /*
    * Destroys the equipment of token type `id` from `from`
    */
    function burn_equipment(
        address from,
        uint256 id
    ) internal{
        _burn(from, id,1);
        // delete allEquipments[id];
    }


    /*
    Transfers the equipment of token type `id` from `from` to 'to'
    */
    function transferEquipment(
        address from,
        address to,
        uint256 equipmentId
    ) internal{
        safeTransferFrom(from, to, equipmentId, 1, "");
    }

}