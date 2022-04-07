import "../css/App.css";
import Game from "./Game";
import HuntMonsters from "./HuntMonster/HuntMonster.js";
import Duel from "./Duel";
import Equipment from "./Equipments/Equipment";
import Bank from "./Bank";
import Guide from "./Guide";
import { Layout, Menu,Card } from 'antd';
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../util/interact.js";
import{
  
  loadCurrentPlayer
} from "../util/interact.js";


const { Header, Content, Footer,Sider } = Layout;
/**
 * This component is responsinle for:
 *  1, connect, listen and listen the wallet
 *  2, display and control the nav bar
 *  3, lastly pass the wallet address to other components
 */
function App() {
  const [selectedMenuItem, setSelectedMenuItem]= useState('1');
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [isInitialized, setIsInitialize] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({
    "player_name": "not initialized",
    "attack": 0,
    "current_health":0,
    "equipment":[0, 8, "no equipment"]
  });

  //called only once
  useEffect(() => {
    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
      if (walletAddress !== "") {
        const player = await loadCurrentPlayer(walletAddress);
			  setCurrentPlayer(player);
        setIsInitialize(player['is_initialized'])
			}
    }
    fetchWallet();
    addWalletListener();
    componentsSwitch(selectedMenuItem);
  }, [walletAddress, selectedMenuItem,isInitialized ]);

  const connectWalletPressed = async (name) => {
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
          setSelectedMenuItem('1');
          


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
  function componentsSwitch(key){
    
    console.log("player");
    console.log(currentPlayer);
    console.log(currentPlayer['is_initialized']);
    switch (key) {
      case '1':
        return currentPlayer['is_initialized']? (<Guide />): (<Game accountAddress={walletAddress}/>);
      // eslint-disable-next-line no-duplicate-case
      case '2':
        return (<HuntMonsters accountAddress={walletAddress} status={status} currentPlayer={currentPlayer}/>);
      case '3':
        return (<Duel accountAddress={walletAddress} status={status} currentPlayer={currentPlayer}/>);
      case "4":
        return <Equipment />;
      case "5":
        return <Bank />;
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
        <Layout>
      <Sider width={200} className="site-layout-background">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected"
          // String(walletAddress).substring(0, 6) +
          // "..." +
          // String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <>
    <Card title="Wallet Address"  style={{ width: 200 }}>
      <p>{walletAddress.substring(0, 14)}</p>
      {/* <p>{walletAddress.substring(14, 28)}</p> */}
      <p>{"..." }</p>
      <p>{walletAddress.substring(38)}</p>

     
    </Card>
    <Card  title="Player Propertyies" style={{ width: 200 }}>
      <p> {"Name: " + currentPlayer['player_name']}</p>
      <p>{"Attack: " + currentPlayer['attack']}</p>
      <p>{"Current Health: " + currentPlayer['current_health']}</p>
      <p>{"Current Equipment: " + currentPlayer['equipment'][2]}</p>
    </Card>
  </>
        
      
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content style={{margin: 0,
   padding: 0,
   background: '#fff',
   minHeight:600,
   maxHeight:900
  }}>
    <div>
    
      {/* <Row>
      <Col span={12}> */}
    

     {componentsSwitch(selectedMenuItem)}
   
   </div>
    </Content>
        </Layout>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>Cryptollars ©2022 Created by Group 8</Footer>
  </Layout>
    
  );
};

export default App;
