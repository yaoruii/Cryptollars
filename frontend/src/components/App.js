import "../css/App.css";
import Game from "./Game";
import HuntMonsters from "./HuntMonster";
import Duel from "./Duel";
import Equipment from "./Equipments/Equipment";
import Bank from "./Bank";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
const { Header, Content, Footer } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("item1");

  //called only once
  useEffect(() => {
    setSelectedMenuItem("1");
  }, []);
  function componentsSwitch(key) {
    switch (key) {
      case "1":
        return <Game />;
      // eslint-disable-next-line no-duplicate-case
      case "2":
        return <HuntMonsters />;
      case "3":
        return <Duel />;
      case "4":
        return <Equipment />;
      case "5":
        return <Bank />;
      default:
        break;
    }
  }

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={"1"}
          onClick={(e) => setSelectedMenuItem(e.key)}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Hunt Monsters </Menu.Item>
          <Menu.Item key="3">Duel </Menu.Item>
          <Menu.Item key="4">Equipment </Menu.Item>
          <Menu.Item key="5">Bank </Menu.Item>
        </Menu>
      </Header>
      {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      
    {/* <Game></Game>
    <HuntMonsters></HuntMonsters> */}

      {/* <Game></Game>    */}
      <Content
        style={{
          margin: 0,
          padding: 0,
          background: "#fff",
          minHeight: 600,
          maxHeight: 10000,
        }}
      >
        <div>{componentsSwitch(selectedMenuItem)}</div>
      </Content>

      {/* <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          content */}
      {/* <Routes> */}
      {/* <Route path="/"><Game></Game></Route> */}
      {/* <Route path='/' element={<Game/>} /> */}
      {/* <Route path="/HuntMonsters"><HuntMonsters></HuntMonsters></Route> */}
      {/* <Route path='/HuntMonsters' element={<HuntMonsters/>} /> */}
      {/* <Route path="/Duel" ><HuntMonsters></HuntMonsters></Route>
          <Route path="/Trade" ><Game /></Route>
          <Route path="/Bank"><Game /></Route> */}
      {/* </Routes>    
        </Content> */}
      <Footer style={{ textAlign: "center" }}>
        Cryptollars ©2022 Created by Group 8
      </Footer>
    </Layout>
  );
}

export default App;
