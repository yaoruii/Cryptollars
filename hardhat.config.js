require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    }
  },
  
settings: {
  optimizer: {
  enabled: true,
  runs: 200
  }
  }
};
