// // We import Chai to use its asserting functions here.
// const { expect } = require("chai");

// describe("GameMater contract", function () {
//   // Mocha has four functions that let you hook into the the test runner's
//   // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

//   // They're very useful to setup the environment for tests, and to clean it
//   // up after they run.

//   // A common pattern is to declare some variables, and assign them in the
//   // `before` and `beforeEach` callbacks.

//   let GameMasterFactory;
//   let GameMaster;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;

//   // `beforeEach` will run before each test, re-deploying the contract every
//   // time. It receives a callback, which can be async.
//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     GameMasterFactory = await ethers.getContractFactory("GameMaster");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

//     // To deploy our contract, we just have to call Token.deploy() and await
//     // for it to be deployed(), which happens once its transaction has been
//     // mined.
//     GameMaster = await GameMasterFactory.deploy();
//   });

//   // You can nest describe calls to create subsections.
//   describe("Deployment", function () {
//     // `it` is another Mocha function. This is the one you use to define your
//     // tests. It receives the test name, and a callback function.

//     // If the callback function is async, Mocha will `await` it.
//     it("Should set the right owner", async function () {
//       expect(await GameMaster.get_admin()).to.equal(owner.address);
//     });
//   });

//   describe("Monsters operations", function () {
//     it("Should create monsters successfully", async function () {
//       //create a monster firstly:
//       await GameMaster.create_monster();
//       allMonsters = await GameMaster.get_all_monster();
//       expect(allMonsters.length).to.equal(2);

//       //create the second monster :
//       await GameMaster.create_monster();
//       allMonsters = await GameMaster.get_all_monster();
//       expect(allMonsters.length).to.equal(3);
//     });
//   });

//   describe("Pause and unpause the game", function () {
//     it("Only admin can pause the game", async function () {
//       await expect(await GameMaster.get_game_status()).to.equal(true);
//       await expect(GameMaster.connect(addr1).pause()).to.be.reverted;
//       await expect(GameMaster.connect(owner).pause()).not.to.be.reverted;
//     });

//     it("Only admin can unpause the game", async function () {
//       await expect(await GameMaster.get_game_status()).to.equal(true);
//       await GameMaster.pause();
//       await expect(await GameMaster.get_game_status()).to.equal(false);
//       await expect(GameMaster.connect(addr1).unpause()).to.be.reverted;
//       await expect(GameMaster.connect(owner).unpause()).not.to.be.reverted;
//     });

//     it("Only paused game can be unpaused", async function () {
//       await expect(await GameMaster.get_game_status()).to.equal(true);
//       await expect(GameMaster.unpause()).to.be.reverted;
//       await GameMaster.pause();
//       await expect(GameMaster.unpause()).not.to.be.reverted;
//     });

//     it("Only unpaused game can be paused", async function () {
//       await expect(await GameMaster.get_game_status()).to.equal(true);
//       await GameMaster.pause();
//       await expect(GameMaster.pause()).to.be.reverted;
//       await GameMaster.unpause();
//       await expect(await GameMaster.get_game_status()).to.equal(true);
//       await expect(GameMaster.pause()).not.to.be.reverted;
//     });
//   });
// });
