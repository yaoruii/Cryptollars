require("dotenv").config();
//imported the Alchemy key from our .env file
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
//passed our alchemyKey to createAlchemyWeb3 to establish our Alchemy Web3 endpoint.
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

//export our contracts:(replace the values when we deploy them)
const contractGame = require("../contract-abi.json");
const contractGameAddress = "0x2BC730C746A56B5BcF1BBeF2bD7f7B60b228B576";

// for trade testing
const contractTrade = require("../contract-abitrade.json");
const contractTradeAddress = "0x55653ee9849557A66cD10eCe83285d1Cea49bAa6";

export const game = new web3.eth.Contract(contractGame, contractGameAddress);
export const trade = new web3.eth.Contract(contractTrade, contractTradeAddress);
// const contractBank = require("../contract-abi.json");
// const contractBankAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A";

// export const bank = new web3.eth.Contract(
//   contractBank,
//   contractBankAddress
// );
//Now that we have our contract loaded

//A function to call to your smart contract function
//a simple async web3 call to read from our contracts
export const loadCurrentAllAccounts = async () => {
  const allPlayers = await game.methods.get_all_players().call();

  return allPlayers;
};

export const loadCurrentPlayer = async (account) => {
  console.log("beforeeeeee single!");
  console.log(game);
  console.log(account);
  const currentPlayer = await game.methods.get_player(account).call();
  console.log(currentPlayer);
  console.log(typeof currentPlayer);
  return currentPlayer;
};

//this function will connect the user's Metamask to our dApp.
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const initialize = async (name, address) => {
  console.log("interact : " + address);
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.initialize(name).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

// this function will check if an Ethereum account is already connected to our dApp on page load and update our UI accordingly.
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
//this function will update the message stored in the smart contract.
//It will make a write call to the Hello World smart contract, so the user's Metamask wallet will have to sign an Ethereum transaction to update the message.
export const inviteAPlayer = async (fromaddress, address) => {
  console.log("interact : " + address);
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: fromaddress, // must match user's active address.
    data: game.methods.invite_duel(address).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

//here are the async functions for equipment:
//For equipment
//need to get the current total equipment of player and show them on the interface
export const getEquipment = async (address) => {
  //address is the address of the player
  //const address = [];
  const allEquipment = await game.methods.get_storage(address).call();
  return allEquipment;
};

// export const unEquip
// enquip function
export const unEquip = async (address) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.unequip().encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

// for equip function
export const Equip = async (address, equipment_id) => {
  // input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  // set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.equip(equipment_id).encodeABI(),
  };

  // sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

// for trade
// create trade function
export const createTrade = async (
  address,
  inviteeAddress,
  equipment_id,
  silver_number
) => {
  // input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: trade.methods
      .invite_trade(inviteeAddress, equipment_id, silver_number)
      .encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

// for trade inviter show
export const getInviter = async () => {
  //address is the address of the player
  //const address = [];
  const allInviter = await trade.methods.get_inviter().call();
  return allInviter;
};

// only testing purposes!
// for testing and giving the player more equipments
export const giveMoreEquip = async (address) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.test_mint_equipment(address).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

//
//accept_trade
export const acceptTrade = async (address, inviterAddress) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.accept_trade(inviterAddress).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

//decline_trade
export const declineTrade = async (address, inviterAddress) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractGameAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: game.methods.decline_trade(inviterAddress).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
//above are functions for equipments :)
