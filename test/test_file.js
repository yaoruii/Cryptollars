const { expect } = require("chai");

let deployer;
let player;
let opponent;
let game;
let instance;

const no_monster = "0";
const yes_monster = "1";
const attack = "100";
const health = "100";
const name = "monster name";
const silver_id = "1";
const equipment_id = "2";
beforeEach(async function () {
  game = await ethers.getContractFactory("Game");
  [deployer, player, opponent] = await ethers.getSigners();
  instance = await game.deploy();
});

it("function attack_monster", async function () {});

it("1. Function fails if the monster does not exist.", async function () {
  await expect(instance.attack_monster(no_monster, { from: deployer.address }))
    .to.be.reverted;
});

it("2. Function succeeds if player kills monster, modifies player’s equipment number will increase by one, money will increase and health will decrease.", async function () {
  await instance.push_monster(attack, health, name, { from: deployer.address });

  let equipment_number_before = await instance.players[deployer.address]
    .equipment_storage.length;

  let health_before = await instance.players[deployer.address].current_health;

  let money_before = await instance.balanceOf(deployer.address, silver_id);

  await instance.attack_monster(yes_monster, { from: deployer.address });

  let equipment_number_after = await instance.players[deployer.address]
    .equipment_storage.length;

  let health_after = await instance.players[deployer.address].current_health;

  let momey_after = await instance.balanceOf(deployer.address, silver_id);

  expect(Number(equipment_number_before + 1)).to.equal(
    Number(equipment_number_after)
  );

  expect(Number(money_after)).to.greater(Number(money_before));

  expect(Number(health_before)).to.greater(Number(health_after));
});

it("3. Function succeeds if monster kills player, play’s health will equal to max health, and player’s equipment number will decrease by one. If player has one equipment, no equipment number decrease.", async function () {
  await instance.push_monster(attack, health, name, { from: deployer.address });

  let equipment_number_before = await instance.players[deployer.address]
    .equipment_storage.length;

  let health_before = await instance.players[deployer.address].current_health;

  let money_before = await instance.balanceOf(deployer.address, silver_id);

  await instance.attack_monster(yes_monster, { from: deployer.address });

  let equipment_number_after = await instance.players[deployer.address]
    .equipment_storage.length;

  let health_after = await instance.players[deployer.address].current_health;

  let money_after = await instance.balanceOf(deployer.address, silver_id);

  if (equipment_number_before > 1) {
    expect(Number(equipment_number_before - 1)).to.equal(
      Number(equipment_number_after)
    );
  } else {
    expect(Number(equipment_number_before)).to.equal(
      Number(equipment_number_after)
    );
  }
  expect(Number(money_after)).to.equal(Number(money_before));

  let full_health = await instance.players[deployer.address].max_health;

  expect(Number(health_after)).to.equal(Number(full_health));
});

it("function invite_duel", async function () {});

it("1. Function fails if the opponent does not exist.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address })).to.be
    .reverted;
});

it("2. Function fails if already sent out a pending invite.", async function () {
  await instance.invite_duel(opponent, { from: deployer.address });

  await expect(instance.invite_duel(deployer.address, { from: player.address }))
    .to.be.reverted;
});

it("3. Function succeeds, changes invite status.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address }));

  await (instance.players[deployer.address].is_pending = true);
});

it("function accept_duel", async function () {});

it("1. Function fails if player does not receive invitation.", async function () {
  await expect(instance.accept_duel(deployer, { from: opponent.address })).to.be
    .reverted;

it("2. Function succeeds, inviter wins, inviter’s equipment number will increase by one, and invitee’s equipment number will decrease by one. Invitee will reborn with max health. Duel status will become proceed.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address }));

  await expect(instance.players[deployer.address].is_pending.to.equal(true));

  let inviter_before = await instance.players[deployer.address]
    .equipment_storage.length;
  let invitee_before = await instance.players[opponent.address]
    .equipment_storage.length;

  /*cannot guarantee inviter wins */
  await expect(instance.accept_duel(deployer, { from: opponent.address }));

  let inviter_after = await instance.players[deployer.address].equipment_storage
    .length;
  let invitee_after = await instance.players[opponent.address].equipment_storage
    .length;

  if (invitee_before > 1) {
    expect(Number(invitee_before - 1)).to.equal(Number(invitee_after));
    expect(Number(inviter_before + 1)).to.equal(Number(inviter_after));
  } else {
    expect(Number(inviter_before + 1)).to.equal(Number(inviter_after));
    expect(Number(invitee_before)).to.equal(Number(invitee_after));
  }
});

it("3. Function succeeds, invitee wins, invitee’s equipment number will increase by one, and inviter’s equipment number will decrease by one. Inviter will reborn with max health. Duel status will become proceed.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address }));

  await (instance.players[deployer.address].is_pending = true);

  let inviter_before = await instance.players[deployer.address]
    .equipment_storage.length;
  let invitee_before = await instance.players[opponent.address]
    .equipment_storage.length;
  /*cannot guarantee invitee wins */
  await expect(
    instance.accept_duel(deployer, { from: opponent.address }).to.equal(false)
  );

  let inviter_after = await instance.players[deployer.address].equipment_storage
    .length;
  let invitee_after = await instance.players[opponent.address].equipment_storage
    .length;

  if (inviter_before > 1) {
    expect(Number(inviter_before - 1)).to.equal(Number(inviter_after));
    expect(Number(invitee_before + 1)).to.equal(Number(invitee_after));
  } else {
    expect(Number(invitee_before + 1)).to.equal(Number(invitee_after));
    expect(Number(inviter_before)).to.equal(Number(inviter_after));
  }
});

it("4. Function succeeds, after duel, the player’s status becomes open.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address }));

  await (instance.players[deployer.address].is_pending = true);
  await expect(instance.accept_duel(deployer, { from: opponent.address }));

  await (instance.players[deployer.address].is_pending = false);
});

it("function reject_duel", async function () {});

it("1. Function fails if player does not receive invitation. ", async function () {
  await expect(
    instance.reject_duel(deployer, { from: opponent.address })
  ).to.be.reverted();
});

it("2. Function succeeds then duel status changed to open.", async function () {
  await expect(instance.invite_duel(opponent, { from: deployer.address }));

  await (instance.players[deployer.address].is_pending = true);
  await expect(instance.reject_duel(deployer, { from: opponent.address }));

  await (instance.players[deployer.address].is_pending = false);
});

it("function equip", async function () {});

it("1. Function fails if player already has equipment on them.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await expect(instance.players[deployer.address].equipment.id).not.toEqual(0);
  await instance.equip(2, { from: deployer.address }).to.be.reverted;
});

it("2. Function fails if desired equipment is not there.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await instance.equip(1000, { from: deployer.address }).to.be.reverted;
});

it("3. Function succeeds, player’s attack strength will increase by equipment strength.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await instance.unequip(equipment_id, { from: deployer.address });
  let sword_attack = await instance.players[deployer.address].equipment
    .sword_strength;
  let attack_before = await instance.players[deployer.address].attack;
  await instance.equip(equipment_id, { from: deployer.address });
  let attack_after = await instance.players[deployer.address].attack;
  expect(Number(attack_before + sword_attack)).to.equal(Number(attack_after));
});

it("4. Function succeeds, player’s equipment slot will be occupied.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await instance.unequip(equipment_id, { from: deployer.address });
  await expect(instance.players[deployer.address].equipment).to.equal(0);
  await instance.equip(equipment_id, { from: deployer.address });
  await expect(instance.players[deployer.address].equipment).not.toEqual(0);
});

it("function unequip", async function () {});

it("1. Function fails if player is not equipped with equipment.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await instance.unequip(equipment_id, { from: deployer.address });
  await instance.unequip(equipment_id, { from: deployer.address }).to.be
    .reverted;
});

it("2. Function succeeds, player’s attack strength will decrease, minus equipment strength.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });

  let sword_attack = await instance.players[deployer.address].equipment
    .sword_strength;
  let attack_before = await instance.players[deployer.address].attack;
  await instance.unequip(equipment_id, { from: deployer.address });
  let attack_after = await instance.players[deployer.address].attack;
  expect(Number(attack_before - sword_attack)).to.equal(Number(attack_after));
});

it("3. Function succeeds, player’s equipment slot becomes unoccupied.", async function () {
  await instance.attack_monster(no_monster, { from: deployer.address });
  await instance.unequip(equipment_id, { from: deployer.address });
  await expect(instance.players[deployer.address].equipment).to.equal(0);
});
