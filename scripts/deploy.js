// import { ethers } from 'hardhat';
// // import hre from "hardhat";
// // const { ethers} = hre;
// import hre from 'hardhat';

// import { ethers } from "hardhat";

require("ethers");
// const { ethers, getChainId, waffle, getNamedAccounts} = hre;
// const { getSigner, getContractFactory } = ethers;

async function main(){
    const [deployer] = await ethers.getSigners();

    console.log("deploying contracts with the account: ", deployer.address);

    //console.log("account balance: " (await  deployer.getBalance()).toString());

    const Game = await ethers.getContractFactory("Game");
    const game = await Game.deploy();

    console.log("game address: ", game.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  })