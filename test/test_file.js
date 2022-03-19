const { expect } = require("chai");

let deployer;
let player;
let opponent;
let game;
let instance;

const no_monster = "3";
const yes_monster = "1";
const attack = "100";
const health = "100";
const name = "monster name";
const silver_id = "1";
const equipment_id = "2";
const attack_id="0";
const max_health_id = "1";
const current_health_id="2";
const name_id = "3";
const equipment_Id="4";
const is_pen_id="5";
const is_ini_id  =  "6";
describe("Game Contract Test", function () {
  

  it("1. Function fails if the monster does not exist.", async function () {
   
    await expect(
      instance.attack_monster(no_monster, { from: deployer.address })
    ).to.be.reverted;
  });

  it("2. Function succeeds if player kills monster, modifies player’s equipment number will increase by one, money will increase and health will decrease.", async function () {
    
    const game = await ethers.getContractFactory("Game");
    const [admin, player1, player2] = await ethers.getSigners();
    const gameTest = await game.connect(admin).deploy();
    await gameTest.connect(admin).create_monster();
    await gameTest.connect(player1).initialize("Jack");
    const health_before =await gameTest.connect(admin).get_current_health();
    const storage_before = await gameTest.connect(admin).get_storage_len(player1.address);
    console.log("health"+health_before);
    // //let money_before = await instance.balanceOf(deployer.address, silver_id);

     await instance.attack_monster(yes_monster, { from: deployer.address });
     let player_after = await instance.players(deployer.address);
     let storage_after = await instance.get_storage_len(deployer.address, { from: deployer.address });
    
     let health_after = await player_after[current_health_id];

    // let momey_after = await instance.balanceOf(deployer.address, silver_id);

     expect(storage_after).to.equal(1);

    //expect(Number(money_after)).to.greater(Number(money_before));

    expect(health_before).to.greater(health_after);
  });

  it("3. Function succeeds if monster kills player, play’s health will equal to max health, and player’s equipment number will decrease by one. If player has one equipment, no equipment number decrease.", async function () {
    await instance.create_monster({
      from: deployer.address,
    });

    let player_before = await instance.players(deployer.address);
    let health_before = player_before[current_health_id];
    let equipment_number_before = await instance.get_storage().length;

     await instance.attack_monster(yes_monster, { from: deployer.address });
     let player_after = await instance.players(deployer.address);
     let equipment_number_after = await instance.get_storage().length;
     let health_after = await player_after[current_health_id];
    //let money_after = await instance.balanceOf(deployer.address, silver_id);

    if (equipment_number_before > 1) {
      expect(Number(equipment_number_before - 1)).to.equal(
        Number(equipment_number_after)
      );
    } else {
      expect(Number(equipment_number_before)).to.equal(
        Number(equipment_number_after)
      );
    }
    //expect(Number(money_after)).to.equal(Number(money_before));

    let full_health = await player_after[max_health_id];

    expect(Number(health_after)).to.equal(Number(full_health));
  });

//   it("1. Function fails if the opponent does not exist.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address })).to
//       .be.reverted;
//   });

//   it("2. Function fails if already sent out a pending invite.", async function () {
//     await instance.invite_duel(opponent, { from: deployer.address });

//     await expect(
//       instance.invite_duel(deployer.address, { from: player.address })
//     ).to.be.reverted;
//   });

//   it("3. Function succeeds, changes invite status.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address }));

//     await expect(instance.players[deployer.address].is_pending).to.equal(true);
//   });

//   it("1. Function fails if player does not receive invitation.", async function () {
//     await expect(instance.accept_duel(deployer, { from: opponent.address })).to.be.reverted;
//   });

//   it("2. Function succeeds, inviter wins, inviter’s equipment number will increase by one, and invitee’s equipment number will decrease by one. Invitee will reborn with max health. Duel status will become proceed.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address }));

//     await expect(instance.players[deployer.address].is_pending.to.equal(true));

//     let inviter_before = await instance.players[deployer.address]
//       .equipment_storage.length;
//     let invitee_before = await instance.players[opponent.address]
//       .equipment_storage.length;

//     await expect(instance.accept_duel(deployer, { from: opponent.address }));

//     let inviter_after = await instance.players[deployer.address]
//       .equipment_storage.length;
//     let invitee_after = await instance.players[opponent.address]
//       .equipment_storage.length;

//     if (invitee_before > 1) {
//       expect(Number(invitee_before - 1)).to.equal(Number(invitee_after));
//       expect(Number(inviter_before + 1)).to.equal(Number(inviter_after));
//     } else {
//       expect(Number(inviter_before + 1)).to.equal(Number(inviter_after));
//       expect(Number(invitee_before)).to.equal(Number(invitee_after));
//     }
//   });

//   it("3. Function succeeds, invitee wins, invitee’s equipment number will increase by one, and inviter’s equipment number will decrease by one. Inviter will reborn with max health. Duel status will become proceed.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address }));

//     await (instance.players[deployer.address].is_pending = true);

//     let inviter_before = await instance.players[deployer.address]
//       .equipment_storage.length;
//     let invitee_before = await instance.players[opponent.address]
//       .equipment_storage.length;

//     await expect(
//       instance.accept_duel(deployer, { from: opponent.address }).to.equal(false)
//     );

//     let inviter_after = await instance.players[deployer.address]
//       .equipment_storage.length;
//     let invitee_after = await instance.players[opponent.address]
//       .equipment_storage.length;

//     if (inviter_before > 1) {
//       expect(Number(inviter_before - 1)).to.equal(Number(inviter_after));
//       expect(Number(invitee_before + 1)).to.equal(Number(invitee_after));
//     } else {
//       expect(Number(invitee_before + 1)).to.equal(Number(invitee_after));
//       expect(Number(inviter_before)).to.equal(Number(inviter_after));
//     }
//   });

//   it("4. Function succeeds, after duel, the player’s status becomes open.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address }));

//     await (instance.players[deployer.address].is_pending = true);
//     await expect(instance.accept_duel(deployer, { from: opponent.address }));

//     await (instance.players[deployer.address].is_pending = false);
//   });

//   it("1. Function fails if player does not receive invitation. ", async function () {
//     await expect(
//       instance.reject_duel(deployer, { from: opponent.address })
//     ).to.be.reverted;
//   });

//   it("2. Function succeeds then duel status changed to open.", async function () {
//     await expect(instance.invite_duel(opponent, { from: deployer.address }));

//     await (instance.players[deployer.address].is_pending = true);
//     await expect(instance.reject_duel(deployer, { from: opponent.address }));

//     await (instance.players[deployer.address].is_pending = false);
//   });

//   it("1. Function fails if player already has equipment on them.", async function () {
//     await instance.attack_monster(no_monster, { from: deployer.address });
//     await expect(instance.players[deployer.address].equipment.id).not.toEqual(
//       0
//     );
//     await instance.equip(2, { from: deployer.address }).to.be.reverted;
//   });

//   it("2. Function fails if desired equipment is not there.", async function () {
//     await instance.attack_monster(no_monster, { from: deployer.address });
//     await instance.equip(1000, { from: deployer.address }).to.be.reverted;
//   });

//   it("3. Function succeeds, player’s attack strength will increase by equipment strength.", async function () {
    
//     await instance.unequip({ from: deployer.address });
//     let sword_attack = await instance.players[deployer.address].equipment
//       .sword_strength;
//     let attack_before = await instance.players[deployer.address].attack;
//     await instance.equip(equipment_id, { from: deployer.address });
//     let attack_after = await instance.players[deployer.address].attack;
//     expect(Number(attack_before + sword_attack)).to.equal(Number(attack_after));
//   });

//   it("4. Function succeeds, player’s equipment slot will be occupied.", async function () {
//     await instance.attack_monster(no_monster, { from: deployer.address });
//     await instance.unequip({ from: deployer.address });
//     await expect(instance.players[deployer.address].equipment).to.equal(0);
//     await instance.equip(equipment_id, { from: deployer.address });
//     await expect(instance.players[deployer.address].equipment).not.toEqual(0);
//   });

//     it("function unequip", async function () {});

//     it("1. Function fails if player is not equipped with equipment.", async function () {
//       await instance.attack_monster(no_monster, { from: deployer.address });
//       await instance.unequip({ from: deployer.address });
//       await instance.unequip({ from: deployer.address }).to.be.reverted;
//     });

//     it("2. Function succeeds, player’s attack strength will decrease, minus equipment strength.", async function () {
//       await instance.attack_monster(no_monster, { from: deployer.address });

//       let sword_attack = await instance.players[deployer.address].equipment
//         .sword_strength;
//       let attack_before = await instance.players[deployer.address].attack;
//       await instance.unequip({ from: deployer.address });
//       let attack_after = await instance.players[deployer.address].attack;
//       expect(Number(attack_before - sword_attack)).to.equal(Number(attack_after));
//     });

//   it("3. Function succeeds, player’s equipment slot becomes unoccupied.", async function () {
//     await instance.attack_monster(no_monster, { from: deployer.address });
//     await instance.unequip(equipment_id, { from: deployer.address });
//     await expect(instance.players[deployer.address].equipment).to.equal(0);
//   });
 });
