const { expect } = require("chai");

describe("testing for return value", function () {
  // player1 is the seller and player2 buyer. the price of the equipment is 1000000 and we first give player1 two pieces of equip player2 2000000.

  it("1. get the return value.", async () => {
    const Game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();

    const GameTest = await Game.connect(admin).deploy();

    await GameTest.connect(admin).test_mint_equipment(player1.address);
    await GameTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await GameTest.connect(player1).get_specific_equip_id(
      player1.address,
      1
    );

    await GameTest.connect(player1).invite_trade(
      player2.address,
      equipment_id,
      1000000
    );
    let address = await GameTest.connect(player2).get_inviter();
    console.log(address[0]);
    console.log(player1.address);
    await expect(address.length).to.equal(1);
  });
});
