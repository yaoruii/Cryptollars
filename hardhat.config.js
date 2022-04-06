require("@nomiclabs/hardhat-waffle");
// import "@nomiclabs/hardhat-waffle"

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "n419E-mUUzxZM4zv2m6OdBoQyDBu9N-E";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "11be5d676f0e579f2010f899c6fa76cddcd9e5872386c2c10695b1aba6b3ef68";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      blockGasLimit: 200000000,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true
    }

  },
  // namedAccounts: {
   

  //   admin1: {
  //     default: ADMIN1,
  //   },

  //   admin2: {
  //     default: ADMIN2,
  //   },

  //   admin3: {
  //     default: ADMIN3,
  //   }
  // },

  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
