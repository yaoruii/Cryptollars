import React,{ useState }  from "react";
import { Link, Route, Switch } from "react-router-dom";
import { List, Card, Image } from "antd";
import {Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PopUp from "./PopUp";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../../css/HuntMonster.css";
import { getMonsters,attack } from "../../util/interact";
const { Header, Content, Footer } = Layout;
const gridStyle = {
  width: '50%',
  textAlign:'center',
  
  
};


 
  //monsters
const data = [
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  },
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  },
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  },
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  },
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  },
  {
    name:"monster1",
    attack:"800",
    health:"2000"
  }
  
];
// state = {
//   size: "large",
// };

// const { size } = this.state;

export default function Equipment() {
  const [visible, setVisible] = useState(false);
  const [result,setResult] = useState("");



  //functions
  const attack_monster = async (monster_id) => {
    const {result} = await attack(monster_id);
    setResult(result);
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
            gutter: 80,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card className="cardsize" hoverable="true">
              <div className="div-left"><img src="https://assets.pinshape.com/uploads/image/file/33239/container_squirtle-pocket-monsters-3d-printing-33239.jpg"
              width = "160px"></img>
               </div>
              
              <div className="div-right">
              <p>Name:{item.name}</p>
              <p>Attack:{item.attack}</p>
              <p>Health:{item.health}</p>
              <button className="bttn-simple bttn-md bttn-danger" 
              on onClick={()=>{
                setVisible(true);
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
        
      />
    </>
  );
}