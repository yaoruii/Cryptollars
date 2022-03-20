const { expect } = require("chai");

describe("Trade contract", function () {
  // player1 is the seller and player2 buyer. the price of the equipment is 1000000 and we first give player1 two pieces of equip player2 2000000.

  it("1. A player cannot create a new trade to invite somebody if he/she has already created a trade without another player's accept or decline.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    // player1 cannot send more than one invitations if there's a pending one
    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);
    await expect(
      tradeTest
        .connect(player1)
        .invite_trade(player2.address, equipment_id, 1000000)
    ).to.be.reverted;
  });

  it("2. A player cannot create a new trade to invite somebody if the equipment id provided is not valid.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    // mint another to player2. since all equipment_ids differ player2_equipment_id must be invalid for player1
    await tradeTest.connect(admin).test_mint_equipment(player2.address);

    const player2_equipment_id = await tradeTest
      .connect(player2)
      .test_first_equip_id(player2.address);

    // console.log(await tradeTest.connect(player1).test_first_equip_id(player1.address));
    // console.log(player2_equipment_id);

    await expect(
      tradeTest
        .connect(player1)
        .invite_trade(player2.address, player2_equipment_id, 1000000)
    ).to.be.reverted;
  });

  it("3. A player cannot create a new trade if he/she has only one equipment.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    // const equipment_id = await tradeTest.connect(player1).players(player1.address).equipment_storage[0].id;
    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await expect(
      tradeTest
        .connect(player1)
        .invite_trade(player2.address, equipment_id, 1000000)
    ).to.be.reverted;
  });

  it("4. If everything goes well, a player can successfully make an invitation to someone for starting a trade.(is_valid_trade = true)", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    let flag = await tradeTest.connect(player1).test_trades(player1.address);
    expect(flag).to.equal(true);
  });

  it("5. A player cannot accept a new trade if the trade is not valid.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    // player1 sends an invitation to player2
    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    await tradeTest
      .connect(admin)
      .test_mint_money_silver(player2.address, 2000000);

    // a player cannot accept the same invitation twice
    await tradeTest.connect(player2).accept_trade(player1.address);
    await expect(tradeTest.connect(player2).accept_trade(player1.address)).to.be
      .reverted;
  });

  it("6. A player cannot accept a new trade if lacking sufficient silver coins.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    // player1 sends an invitation to player2
    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    // player2 has no silver coins
    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    await expect(tradeTest.connect(player2).accept_trade(player1.address)).to.be
      .reverted;
  });

  it("7. If everything goes well, a player can successfully accept another player's trade.(5 changes: inviter: the number of silver coins will increase, he/she loses one equipment, invitee: the number of silver coins will decrease, he/she gets one equipment, is_valid_trade = false)", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    await tradeTest
      .connect(admin)
      .test_mint_money_silver(player2.address, 2000000);

    const beforePlayer1Silver = await tradeTest
      .connect(player1)
      .balanceOf(player1.address, 1);
    const beforePlayer2Silver = await tradeTest
      .connect(player2)
      .balanceOf(player2.address, 1);

    // after transaction, player1 and player2 should both have one piece of equipment
    await tradeTest.connect(player2).accept_trade(player1.address);

    const afterPlayer1Silver = await tradeTest
      .connect(player1)
      .balanceOf(player1.address, 1);
    const afterPlayer2Silver = await tradeTest
      .connect(player2)
      .balanceOf(player2.address, 1);

    // the money's alright
    expect(afterPlayer1Silver - beforePlayer1Silver).to.equal(1000000);
    expect(beforePlayer2Silver - afterPlayer2Silver).to.equal(1000000);

    const numPlayer2Equip = (
      await tradeTest.connect(player2).test_players(player2.address)
    ).equipment_storage.length;

    let player1Equipped = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);
    let player2Equipped = await tradeTest
      .connect(player1)
      .test_first_equip_id(player2.address);

    // console.log(player2Equipped);
    // console.log(equipment_id);
    // console.log(await tradeTest.connect(player1).test_first_equip_id(player2.address));

    // now player2 has one piece of equipment, and its id is equipment_id. player1 has only one piece of equipment, and it's a different one.
    expect(numPlayer2Equip).to.equal(1);
    expect(player1Equipped).to.not.equal(equipment_id);
    expect(player2Equipped).to.equal(equipment_id);

    let flag = await tradeTest.connect(player1).test_trades(player1.address);
    expect(flag).to.equal(false);
  });

  it("8. A player cannot decline a new trade if the trade is not valid.", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    // a player cannot decline the same invitation twice
    await tradeTest.connect(player2).decline_trade(player1.address);
    await expect(tradeTest.connect(player2).decline_trade(player1.address)).to
      .be.reverted;
  });

  it("9. If everything goes well, a player can successfully decline another player's trade.(is_valid_trade = false)", async () => {
    const Trade = await ethers.getContractFactory("Trade");
    const [admin, player1, player2] = await ethers.getSigners();

    const tradeTest = await Trade.connect(admin).deploy();

    await tradeTest.connect(admin).test_mint_equipment(player1.address);
    await tradeTest.connect(admin).test_mint_equipment(player1.address);

    const equipment_id = await tradeTest
      .connect(player1)
      .test_first_equip_id(player1.address);

    await tradeTest
      .connect(player1)
      .invite_trade(player2.address, equipment_id, 1000000);

    await tradeTest.connect(player2).decline_trade(player1.address);

    let flag = await tradeTest.connect(player1).test_trades(player1.address);
    expect(flag).to.equal(false);
  });
});
