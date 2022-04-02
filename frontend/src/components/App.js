import '../css/App.css';
import Game from './Game'
import HuntMonsters from './HuntMonster'
import Duel from './Duel'
import { Layout, Menu, Row, Col } from 'antd';
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../util/interact.js";


const { Header, Content, Footer } = Layout;
/**
 * This component is responsinle for:
 *  1, connect, listen and listen the wallet
 *  2, display and control the nav bar
 *  3, lastly pass the wallet address to other components
 */
function App() {
  const [selectedMenuItem, setSelectedMenuItem]= useState('1');
  //state variables
  // const [walletAddress, setWalletAddress] = useState("dd");
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  //called only once
  useEffect(() => {
    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
    }
    fetchWallet();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);//successfully
  };

  //implementing the wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
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
  function componentsSwtich(key){
    switch (key) {
      case '1':
        return (<Game/>);
      // eslint-disable-next-line no-duplicate-case
      case '2':
        return (<HuntMonsters/>);
      case '3':
        return (<Duel accountAddress={walletAddress} status={status}/>);
      default:
        break;
     }
    };
   
  return (
    <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'1'} onClick={(e) => 
        setSelectedMenuItem(e.key)} >
            <Menu.Item key="1" >Home</Menu.Item>
            <Menu.Item key="2">Hunt Monsters </Menu.Item>
            <Menu.Item key="3">Duel </Menu.Item>
            <Menu.Item key="4">Trade </Menu.Item>
            <Menu.Item key="5">Bank </Menu.Item>
          </Menu>
        </Header>
    <Content style={{margin: 0,
   padding: 0,
   background: '#fff',
   minHeight:600,
   maxHeight:900
  }}>
    <div>
    
      {/* <Row>
      <Col span={12}> */}
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

      {/* </Col> */}
     {componentsSwtich(selectedMenuItem)}
    {/* </Row> */}
   </div>
    </Content>
      <Footer style={{ textAlign: 'center' }}>Cryptollsrs ©2022 Created by Group8</Footer>
      </Layout>
  );
}

export default App;
