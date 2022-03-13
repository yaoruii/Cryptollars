//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IGameItems.sol";
import "./IPlayer.sol";
import "./Random.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItems is IGameItems, ERC1155, IPlayer{

    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    // uint256 public constant sword = 2;//id = 2
    // uint256 public constant e1 = 3;//id = 3 =>

    uint256 public equipment_counter = 3;

    uint256 public maximum_attack = 12345;

    Random public random;

    string  prefix_equipment = "equipment";

   

    mapping(uint256 => Equipment) allEquipments;


    constructor() ERC1155(""){
        // random = _random;
        mint_money(msg.sender, GOLD, 10**18, "");
        mint_money(msg.sender, SILVER, 10**27, "");
        mint_equipment(msg.sender, "");
    }


    /**
    This function is used to initialzie every player's initial money and equipment.
    player: the address of this player
    */
    function mint_initialize(address player) public override{
        mint_money(player, GOLD, 10**18, "");
        mint_money(player, SILVER, 10**27, "");
        mint_equipment(player, "");
    }

    /**
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_equipment(
        address to,
        bytes memory data) public override{
            _mint(to,equipment_counter , 1, data);
            uint256 attack_value = random.get_random(maximum_attack);
            Equipment memory new_equipment = Equipment(attack_value, equipment_counter , string(abi.encodePacked(prefix_equipment,Strings.toString(equipment_counter))));
            allEquipments[equipment_counter] = new_equipment;
            equipment_counter++;
    }

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
    ) public override{
        _mint(to, money_id, amount, data);
    }

    /*
    * Destroys `amount` tokens of token type `id` from `from`
    */
    function burn_money (
        address from,
        uint256 id,
        uint256 amount
    ) public override{
        _burn(from, id, amount);

    }
     /*
    * Destroys the equipment of token type `id` from `from`
    */
    function burn_equipment(
        address from,
        uint256 id
    ) public override{
        _burn(from, id,1);
        delete allEquipments[id];

    }s


    /*
    Transfers the equipment of token type `id` from `from` to 'to'
    */
    function transfer(
        address from,
        address to,
        uint256 equipmentId,
        bytes memory data
    ) public override{
        safeTransferFrom(from, to, equipmentId, 1, data);
    }

}