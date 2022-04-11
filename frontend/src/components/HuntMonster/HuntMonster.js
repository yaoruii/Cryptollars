import React,{ useState ,useEffect}  from "react";
import { Link, Route, Switch } from "react-router-dom";
import { List, Card, Image } from "antd";
import {Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PopUp from "./PopUp";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../../css/HuntMonster.css";
import { getMonsters,attack } from "../../util/interact.js";

const { Header, Content, Footer } = Layout;

const gridStyle = {
  width: '50%',
  textAlign:'center',
  
  
};


 
  
    
// state = {
//   size: "large",
// };

// const { size } = this.state;

export default function HuntMonster(props) {
  //State variables
  const player_address = props.accountAddress; 
  //a string that stores the user's wallet address
  const [walletAddress, setwalletAddress] = useState(player_address);
  const [visible, setVisible] = useState(false);
  const [result,setResult] = useState(1);
  const [allMonsters,setAllMonsters] = useState([]);
  const [currentItem,setCurrentItem] = useState([]);
  const [att_or_confirm, set_aoc] = useState("confirm");
  //is called after your component is rendered.
  useEffect(() => { //TODO: implement
    async function fetchData() {
      
			if (walletAddress !== "") {
				const allmonsters = await getMonsters();
        setAllMonsters(allmonsters);
        console.log(allMonsters);
        // const currentPlayer = await loadCurrentPlayer(walletAddress);
			  // setCurrentPlayer(currentPlayer);
       
			}
			
			addSmartContractListener();			
		}
		fetchData();
  }, [allMonsters]);
  function addSmartContractListener() { //TODO: implement

  }
  //functions
  const attack_monster = async (address,monster_id) => {
    const result = await attack(address,monster_id);
    console.log("HuntMonster");
    console.log(result);
    console.log("HuntMonster");
    set_aoc("attack");
    
    
    setVisible(true);
  }
  
  const onOk = () => {
    if(att_or_confirm == "confirm"){
    
    attack_monster(player_address,currentItem.monster_name?currentItem.monster_name.slice(-1):0);
    
    }else{
      set_aoc("confirm");
    }
    setVisible(false);
}
  return (
    <>
      <Layout>
      <Content>
      
      
      <div className="content">
        <h2>Choose a monster to hunt!</h2>
        <h2>Click the monster to begin a new battle!</h2>
     
      <div>
        <List
          grid={{
            gutter: 60,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={allMonsters}
          renderItem={(item) => (
            <List.Item>
              <Card className="cardsize" hoverable="true">
              <div className="div-left"><img src="https://assets.pinshape.com/uploads/image/file/33239/container_squirtle-pocket-monsters-3d-printing-33239.jpg"
              width = "160px"></img>
               </div>
              
              
              <div className="div-right">
              <p>Name:{item.monster_name}</p>
              <p>Attack:{item.attack}</p>
              <p>Health:{item.monster_current_health}</p>
              
                
                </div>
                <div className="div-bottom"> 
                <button className="bttn-simple bttn-md bttn-danger" 
               onClick={()=>{
                setVisible(true);
                setCurrentItem(item);
                console.log("ITTTTTTTTTWEEEEEMMMM");
                console.log(item);
                console.log("ITTTTTTTTTWEEEEEMMMM");
              }}>Hunt</button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
     
      </div>
      </Content>
      </Layout>
      <PopUp
        setIsModalVisible={setVisible}
        isModalVisible={visible}
        result = {result}
        att_or_confirm = {att_or_confirm}
        onOk = {onOk}
      />
      
    </>
  );
}