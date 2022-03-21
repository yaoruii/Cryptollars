const { expect } = require("chai");

let deployer;
let player;
let opponent;
let game;
let instance;

const no_monster = "3";
const yes_monster = "1";
const name = "monster name";
const silver_id = "1";
const equipment_id = "2";

describe("Game Contract Test", function () {
  

  it("1. Function fails if the monster does not exist.", async function () {
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    await expect(
      gameTest.connect(player1).attack_monster(no_monster)
    ).to.be.reverted;
  });

  it("2. Function succeeds if player kills monster, modifies player’s equipment number will increase by one, money will increase and health will decrease.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    await gameTest.connect(admin).create_monster();

    // init p1
    await gameTest.connect(player1).initialize("Jack");

    //check health/storage before
    const health_before =await gameTest.connect(admin).get_current_health(player1.address);
    const storage_before = await gameTest.connect(admin).get_storage_len(player1.address);
    const money_before = await gameTest
      .connect(player1)
      .balanceOf(player1.address, 1);
    
    // execute test object
     await gameTest.connect(player1).attack_monster(yes_monster);

    //check after
     const health_after =await gameTest.connect(admin).get_current_health(player1.address);
     let storage_after = await gameTest.connect(admin).get_storage_len(player1.address);
     const money_after = await gameTest
     .connect(player1)
     .balanceOf(player1.address, 1);
    // assertion
    expect(storage_after - storage_before).to.equal(1); 
    expect(health_before).to.equal(500);
    
    expect(Number(health_before)).to.greaterThan(Number(health_after));
    expect(Number(money_after)).to.greaterThan(Number(money_before));
  });

   it("3. Function succeeds if monster kills player, play’s health will equal to max health, and player’s equipment number will decrease by one. If player has one equipment, no equipment number decrease.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    await gameTest.connect(admin).mock_monster(500,1000,"strong");

    // init p1
    await gameTest.connect(player1).initialize("Jack");

    //check health/storage before
    const health_before =await gameTest.connect(admin).get_current_health(player1.address);
    const storage_before = await gameTest.connect(admin).get_storage_len(player1.address);
    const money_before = await gameTest
     .connect(player1)
     .balanceOf(player1.address, 1);
    // execute test object
     await gameTest.connect(player1).attack_monster(1);

    //check after
     const health_after =await gameTest.connect(admin).get_current_health(player1.address);
     let storage_after = await gameTest.connect(admin).get_storage_len(player1.address);
     const money_after = await gameTest
     .connect(player1)
     .balanceOf(player1.address, 1);
    if (storage_before > 1) {
      expect(Number(storage_before - 1)).to.equal(
        Number(storage_after)
      );
    } else {
      expect(Number(storage_before)).to.equal(
        Number(storage_after) 
      );
    }
    expect(Number(money_after)).to.equal(Number(money_before));
    const full_health =await gameTest.connect(admin).get_max_health(player1.address);
    
    expect(Number(health_after
      )).to.equal(Number(full_health));
  });

  it("1. Function fails if the opponent does not exist.", async function () {
     // deploy
     const game = await ethers.getContractFactory("Game");
     const [admin, player1, player2] = await ethers.getSigners();
     const gameTest = await game.connect(admin).deploy();
     await gameTest.connect(player1).initialize("Jack");
     await expect(gameTest.connect(player1).invite_duel(player2.address)).to.be.reverted;
  });

  it("2. Function fails if already sent out a pending invite.", async function () {
     // deploy
     const game = await ethers.getContractFactory("Game");
     const [admin, player1, player2] = await ethers.getSigners();
     const gameTest = await game.connect(admin).deploy();
     
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     await gameTest.connect(player2).initialize("Rose");
     //invite
     await gameTest.connect(player1).invite_duel(player2.address);
     await expect(gameTest.connect(admin).invite_duel(player1.address)).to
     .be.reverted;
  });

  it("3. Function succeeds, changes invite status.", async function () {
    const game = await ethers.getContractFactory("Game");
     const [admin, player1, player2] = await ethers.getSigners();
     const gameTest = await game.connect(admin).deploy();
     
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     await gameTest.connect(player2).initialize("Rose");
     //invite
     await gameTest.connect(player1).invite_duel(player2.address);

     let is_pen =await gameTest.connect(player1).get_is_pending(player1.address);
     await expect(is_pen).to.equal(true);
  });

  it("1. Function fails if player does not receive invitation.", async function () {
     const game = await ethers.getContractFactory("Game");
     const [admin, player1, player2] = await ethers.getSigners();
     const gameTest = await game.connect(admin).deploy();
     
     // init p1
    await gameTest.connect(player1).initialize("Jack");
    await gameTest.connect(player2).initialize("Rose");
    await expect(gameTest.connect(player1).accept_duel(player2.address)).to.be.reverted;
  });

  it("2. Function succeeds, inviter wins, inviter’s equipment number will increase by one, and invitee’s equipment number will decrease by one. Invitee will reborn with max health. Duel status will become proceed.", async function () {
     const game = await ethers.getContractFactory("Game");
     const [admin, player1, player2] = await ethers.getSigners();
     const gameTest = await game.connect(admin).deploy();
     
     // init p1
    await gameTest.connect(player1).initialize("Jack");
    await gameTest.connect(admin).initialize("Rose");
    //mock inviter win, so decrease the invitee's life
    await gameTest.connect(admin).set_health(admin.address,200);

    // //invite
    await gameTest.connect(player1).invite_duel(admin.address);

    let inviter_before = await gameTest.connect(admin).get_storage_len(player1.address);
    let invitee_before = await gameTest.connect(admin).get_storage_len(admin.address);
    //accept
    await gameTest.connect(admin).accept_duel(player1.address);

    let inviter_after = await gameTest.connect(admin).get_storage_len(player1.address);
    let invitee_after = await gameTest.connect(admin).get_storage_len(admin.address);
    const health_after =await gameTest.connect(admin).get_current_health(admin.address);
    const full_health =await gameTest.connect(admin).get_max_health(admin.address);
    expect(Number(health_after
      )).to.equal(Number(full_health));
    if (invitee_before > 1) {
      expect(Number(invitee_before)-1).to.equal(Number(invitee_after));
      expect(Number(inviter_before) + 1).to.equal(Number(inviter_after));
    } else {
      expect(Number(inviter_before)+1).to.equal(Number(inviter_after));
      expect(Number(invitee_before)).to.equal(Number(invitee_after));
    }
  });

  it("3. Function succeeds, invitee wins, invitee’s equipment number will increase by one, and inviter’s equipment number will decrease by one. Inviter will reborn with max health. Duel status will become proceed.", async function () {
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
    // init p1
   await gameTest.connect(player1).initialize("Jack");
   await gameTest.connect(player2).initialize("Rose");
   //mock inviter win, so decrease the inviter's life
   await gameTest.connect(admin).set_health(player1.address,200);

   // //invite
    await gameTest.connect(player1).invite_duel(player2.address);

   let inviter_before = await gameTest.connect(admin).get_storage_len(player1.address);
   let invitee_before = await gameTest.connect(admin).get_storage_len(player2.address);
   //accept
   await gameTest.connect(player2).accept_duel(player1.address);

   let inviter_after = await gameTest.connect(admin).get_storage_len(player1.address);
   let invitee_after = await gameTest.connect(admin).get_storage_len(player2.address);

   const full_health =await gameTest.connect(admin).get_max_health(player1.address);
   const health_after =await gameTest.connect(admin).get_current_health(player1.address);
   expect(Number(health_after
     )).to.equal(Number(full_health));
   if (inviter_before > 1) {
     expect(Number(inviter_before )- 1).to.equal(Number(inviter_after));
     expect(Number(invitee_before )+ 1).to.equal(Number(invitee_after));
   } else {
     expect(Number(invitee_before )+ 1).to.equal(Number(invitee_after));
     expect(Number(inviter_before)).to.equal(Number(inviter_after));}
  });

  it("4. Function succeeds, after duel, the player’s status becomes open.", async function () {
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
    // init p1
   await gameTest.connect(player1).initialize("Jack");
   await gameTest.connect(player2).initialize("Rose");
   
    await gameTest.connect(player1).invite_duel(player2.address);
   //accept
   await gameTest.connect(player2).accept_duel(player1.address);

    let is_pen = await gameTest.connect(player2).get_is_pending(player2.address);
    await expect(is_pen).to.equal(false);
  });

  it("1. Function fails if player does not receive invitation. ", async function () {
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    await gameTest.connect(player1).initialize("Jack");
    await expect(
      gameTest.connect(player1).reject_duel(player2)).to.be.reverted;
  });

  it("2. Function succeeds then duel status changed to open.", async function () {
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
    // init p1
   await gameTest.connect(player1).initialize("Jack");
   await gameTest.connect(player2).initialize("Rose");
   
    await gameTest.connect(player1).invite_duel(player2.address);
   //accept
   await gameTest.connect(player2).reject_duel(player1.address);

    let is_pen = await gameTest.connect(player2).get_is_pending(player2.address);
    await expect(is_pen).to.equal(false);
  });

  it("1. Function fails if player already has equipment on them.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
    
     await expect(gameTest.connect(player1).equip(2)).to.be.reverted;
   });

  it("2. Function fails if desired equipment is not there.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
    
     await expect(gameTest.connect(player1).equip(3)).to.be.reverted;
  });

  it("3. Function succeeds, player’s attack strength will increase by equipment strength.", async function () {
    
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     //unequip new sword
     await gameTest.connect(player1).unequip();
     const attack_before = await gameTest.connect(admin).get_attack(player1.address);
     //equip new sowrd
     await gameTest.connect(player1).equip(2);
     const attack_after = await gameTest.connect(admin).get_attack(player1.address);

     expect(Number(attack_before)+8).to.equal(Number(attack_after));
  });

  it("4. Function succeeds, player’s equipment slot will be occupied.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     //unequip new sword
     await gameTest.connect(player1).unequip();
     
     await gameTest.connect(player1).equip(2);
     const equip_id = await gameTest.connect(admin).get_equip_id(player1.address);
    
     await expect(equip_id).not.to.equal(0);
  });

//     it("function unequip", async function () {});

    it("1. Function fails if player is not equipped with equipment.", async function () {
      // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     //unequip new sword
     await gameTest.connect(player1).unequip();
     await expect(gameTest.connect(player1).unequip()).to.be.reverted;
      
    });

    it("2. Function succeeds, player’s attack strength will decrease, minus equipment strength.", async function () {
       // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     
     const attack_before = await gameTest.connect(admin).get_attack(player1.address);
     //unequip new sword
     await gameTest.connect(player1).unequip();
     const attack_after = await gameTest.connect(admin).get_attack(player1.address);

     expect(Number(attack_before)-8).to.equal(Number(attack_after));
    });

  it("3. Function succeeds, player’s equipment slot becomes unoccupied.", async function () {
    // deploy
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    
     // init p1
     await gameTest.connect(player1).initialize("Jack");
     //unequip new sword
     await gameTest.connect(player1).unequip();
     const equip_id =await gameTest.connect(admin).get_equip_id(player1.address);
    
     await expect(Number(equip_id)).to.equal(0);
  });
 });
