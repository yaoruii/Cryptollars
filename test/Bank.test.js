// Here is the test for banking

const { expect } = require("chai");
const BigNumber = require("big-number");

describe("Bank Contract Test", function () {
  it("1. A player(not admin) cannot change the index value.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    // owners[0] is the admin
    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");
    // decimal: 10^6

    // owner[0] is the admin, and owners[1] is the player, so player cannot run this function.
    await expect(hardhatBank.connect(owners[1]).update_index_admin("3000000"))
      .to.be.reverted;
  });

  it("2. An admin can change the index value every day.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");

    await hardhatBank.connect(owners[0]).update_index_admin("1400000");
    const presentIndex = await hardhatBank.connect(owners[0]).view_index();
    // console.log("index" + presentIndex);
    // For admin, he/she can change the index value and the view index value should be equal to the value just set.
    expect(presentIndex).to.equal("1400000");
  });

  it("3. If everything goes well, a player can successfully buy some gold coins. The number of gold coins should increase and the number of silver coins should decrease.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");
    // Here we use the test function for giving the owners[1](player) enough silver coins.
    await hardhatBank.connect(owners[0]).test_mint_initial(owners[1].address);

    const beforeBuySilver = await hardhatBank
      .connect(owners[1])
      .view_silver_number();
    const beforeBuyGold = await hardhatBank
      .connect(owners[1])
      .view_gold_number();

    await hardhatBank.connect(owners[1]).buy_gold("13000000");
    const afterBuySilver = await hardhatBank
      .connect(owners[1])
      .view_silver_number();
    const afterBuyGold = await hardhatBank
      .connect(owners[1])
      .view_gold_number();
    // Here the number of silver coins should be reduced, and the number of gold coins should be increased.
    expect(afterBuySilver).to.equal(await beforeBuySilver.sub("13000000"));
    expect(afterBuyGold).to.equal(await beforeBuyGold.add("10"));
  });

  it("4. If a player does not have enough silver coins, he cannot buy gold coins.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");
    // Here we do not run the test_mint_initial function means that player does not have silver coins.
    await expect(hardhatBank.connect(owners[1]).buy_gold("13000000")).to.be
      .reverted;
  });

  it("5. If everything goes well, a player can successfully exchange some gold coins to some silver coins. The number of silver coins should increase and the number of gold coins should decrease.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");

    await hardhatBank.connect(owners[0]).test_mint_initial(owners[1].address);

    const beforeExchangeSilver = await hardhatBank
      .connect(owners[1])
      .view_silver_number();
    const beforeExchangeGold = await hardhatBank
      .connect(owners[1])
      .view_gold_number();

    await hardhatBank.connect(owners[1]).exchange_silver("10");
    const afterExchangeSilver = await hardhatBank
      .connect(owners[1])
      .view_silver_number();
    const afterExchangeGold = await hardhatBank
      .connect(owners[1])
      .view_gold_number();

    // Here the number of gold coins should be reduced, and the number of silver coins should be increased.
    expect(afterExchangeSilver).to.equal(
      await beforeExchangeSilver.add("13000000")
    );
    expect(afterExchangeGold).to.equal(await beforeExchangeGold.sub("10"));
  });

  it("6. If a player does not have enough gold coins, he/she cannot buy silver coins.", async function () {
    const owners = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");

    const hardhatBank = await Bank.connect(owners[0]).deploy("1300000");

    // Here we do not run the test_mint_initial function means that player does not have gold coins.
    await expect(hardhatBank.connect(owners[1]).exchange_silver("100")).to.be
      .reverted;
  });
});
