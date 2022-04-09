const { expect } = require("chai");

describe("Integration contract", function () {
  // player1 is the seller and player2 buyer. the price of the equipment is 1000000 and we first give player1 two pieces of equip player2 2000000.

  it("If everything goes well, a player can use trade to transfer an equipment to another player and the other player can use this equipment for game.", async () => {
    //const Trade = await ethers.getContractFactory("Trade");
    const Game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();

    const gameTest = await Game.connect(admin).deploy();

    await gameTest.connect(player1).initialize("Jack");
    await gameTest.connect(player2).initialize("Jane");

    await gameTest.connect(admin).test_mint_equipment(player1.address);
    await gameTest.connect(admin).test_mint_equipment(player1.address);

    const numPlayer1EquipBefore = (
      await gameTest.connect(player1).test_players(player1.address)
    ).equipment_storage.length;

    const equipment_id = await gameTest
      .connect(player1)
      .get_specific_equip_id(player1.address, numPlayer1EquipBefore - 1);

    await gameTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    await gameTest
      .connect(admin)
      .test_mint_money_silver(player2.address, 2000000);

    const numPlayer2EquipBefore = (
      await gameTest.connect(player2).test_players(player2.address)
    ).equipment_storage.length;

    // after transaction, player1 and player2 should both have one piece of equipment
    await gameTest.connect(player2).accept_trade(player1.address);

    const numPlayer2EquipAfter = (
      await gameTest.connect(player2).test_players(player2.address)
    ).equipment_storage.length;

    expect(numPlayer2EquipAfter).to.equal(numPlayer2EquipBefore + 1);
    // expect(numPlayer1EquipAfter).to.equal(numPlayer1EquipBefore - 1);

    //player 2 equip the new equipment
    await gameTest.connect(player1).unequip();
    await gameTest.connect(player2).unequip();
    await expect(gameTest.connect(player1).equip(equipment_id)).to.be.reverted;
    await expect(gameTest.connect(player2).equip(equipment_id)).not.to.be
      .reverted;
  });
});
