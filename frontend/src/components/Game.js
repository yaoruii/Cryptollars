import React from "react";
import 'antd/dist/antd.css';
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "../util/interact.js";

import alchemylogo from "../alchemylogo.svg";

const Game = () => {
  //state variables
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  //called only once
  useEffect(() => {

    async function fetchWallet() {
      const {walletAddress, status} = await getCurrentWalletConnected();
      setWalletAddress(walletAddress);
      setStatus(status); 
    }
    fetchWallet();
    addWalletListener();
  }, []);



  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  // const onUpdatePressed = async () => {
  //   const { status } = await updateMessage(walletAddress, newMessage);
  //   setStatus(status);
  // };

  const hhh = () =>{
    alert("Hello! I am an alert box!");
  }

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <div id="container_functions">
      <button id="function_module" onClick={hhh}>
          <span>Hunt Monsters</span>
      </button>

      <button id="function_module" onClick={hhh}>
        
          <span>Duel</span>
      </button>

       <button id="function_module" onClick={hhh}>
          <span>Trade</span>
      </button>
      <button id="function_module" onClick={hhh}>
          <span>Bank</span>
      </button>
      </div>

      {/* <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
      <p>{message}</p>

      <h2 style={{ paddingTop: "18px" }}>New Message:</h2> */}

      {/* <div>
        <input
          type="text"
          placeholder="Update the message in your smart contract."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id="status">{status}</p>

        <button id="publish" onClick={onUpdatePressed}>
          Update
        </button>
      </div> */}
    </div>
  );
};

export default Game;