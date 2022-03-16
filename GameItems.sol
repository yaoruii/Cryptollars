//SPDX-License-Identifier: MIT;
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IGameItems.sol";
import "./IPlayer.sol";
import "./Random.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title GameItems contract
 * @notice manage all tokens
 */
contract GameItems is IGameItems, ERC1155, Random {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant NEW_SWORD = 2; //

    uint256 public equipment_counter = 3;

    uint256 public equipment_maximum_attack = 12;
    uint256 public equipment_minimum_attack = 8;

    uint256 public new_sword_attack = 8;

    Random public random;

    string prefix_equipment = "equipment";

    // mapping(uint256 => Equipment) allEquipments;

    constructor() ERC1155("") Random(equipment_minimum_attack) {
        // mint_money(msg.sender, GOLD, 10**18, "");
        // mint_money(msg.sender, SILVER, 10**27, "");
        // mint_equipment(msg.sender, "");
    }

    // function get_random_attack() internal returns(uint256){
    //     return
    // }

    /**
    This function is used to initialzie every player's initial equipment: NEW_SWORD.
    player: the address of this player
    */
    //!!!!!!!!!!!!!!!! this is deleted !!!!!!!!!!!!!!!!!!!
    // function mint_initialize(address player) internal returns(Equipment memory){
    //     // mint_money(player, GOLD, 10**18, "");
    //     // mint_money(player, SILVER, 10**27, "");
    //     return mint_new_sword(player);
    // }

    /**
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_new_sword(Player storage player, address to)
        internal
        returns (Equipment memory)
    {
        _mint(to, NEW_SWORD, 1, "");
        Equipment memory new_equipment = Equipment(
            new_sword_attack,
            NEW_SWORD,
            "new_sword"
        );
        player.equipment_storage.push(new_equipment);
        return new_equipment;
    }

    /**
    player: the player object
    to: equipment owner's address
    randomly mint a new equipment and give it to to address
     */
    function mint_equipment(Player storage player, address to)
        internal
        returns (Equipment memory)
    {
        _mint(to, equipment_counter, 1, "");
        uint256 attack_value = get_random(equipment_maximum_attack);
        Equipment memory new_equipment = Equipment(
            attack_value,
            equipment_counter,
            string(
                abi.encodePacked(
                    prefix_equipment,
                    Strings.toString(equipment_counter)
                )
            )
        );
        //add this equipment to 'to' address:
        player.equipment_storage.push(new_equipment);
        equipment_counter++;
        return new_equipment;
    }

    /**
    to: money owner's address
    money: gold :0
    amount: the amount of money
     */
    function mint_money_gold(address to, uint256 amount) internal {
        _mint(to, 0, amount, "");
    }

    /**
    to: money owner's address
    money: SILVER:1
    amount: the amount of money
     */
    function mint_money_silver(address to, uint256 amount) internal {
        _mint(to, 1, amount, "");
    }

    /*
     * Destroys `amount` tokens of gold from `from`
     */
    function burn_money_gold(address from, uint256 amount) internal {
        _burn(from, 0, amount);
    }

    /*
     * Destroys `amount` tokens of silver from `from`
     */
    function burn_money_silver(address from, uint256 amount) internal {
        _burn(from, 1, amount);
    }

    /*
     * Destroys the equipment of token type `id` from `from`
     */
    function burn_equipment(
        Player storage player,
        address from,
        uint256 id,
        uint256 index_in_storage
    ) internal {
        _burn(from, id, 1);
        //delete this equipment from 'from' address:
        delete player.equipment_storage[index_in_storage];
    }

    /*
    Transfers the equipment of token type `id` from `from` to 'to'
    */
    function transferEquipment(
        mapping(address => Player) storage players,
        address from,
        address to,
        uint256 equipmentId,
        uint256 index_in_storage
    ) internal {
        safeTransferFrom(from, to, equipmentId, 1, "");
        //add this equipment to 'to' address:
        players[to].equipment_storage.push(
            players[from].equipment_storage[index_in_storage]
        );
        //delete this equipment from 'from' address:
        delete players[from].equipment_storage[index_in_storage];
    }
}
