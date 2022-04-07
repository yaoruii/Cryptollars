import React, { useEffect, useState, useCallback } from "react";
import { List, Card, Image, Space, Divider, Layout, Modal, Button } from "antd";
import SaleModal from "./SaleModal";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getEquipment,
  unEquip,
  Equip,
  createTrade,
  acceptTrade,
  declineTrade,
} from "../../util/interact.js";

export default function Equipment(props) {
  //State variables
  const player_address = props.accountAddress;

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("sword1");
  const [presentEquipment, setEquipment] = useState("");
  const [walletAddress, setwalletAddress] = useState(player_address);

  // this function is for getting present equipments for this player
  // the return variable will be used in allEquipment
  const onUpdateEquipment = async () => {
    const presentEquipment = await getEquipment(walletAddress);
    setEquipment(presentEquipment);
    console.log("testing");
    console.log(presentEquipment[0]);
    console.log("allEquipment");
  };
  // const datalalala = {};
  // function data() {
  //   for (let i = 0; i < presentEquipment.length; i++) {
  //     datalalala += presentEquipment[i] + "<br>";
  //   }
  // }

  useEffect(() => {
    //TODO: implement
    async function fetchData() {
      if (walletAddress !== "") {
        const presentEquipment = await getEquipment(walletAddress);
        setEquipment(presentEquipment);
        console.log("this is the useeffect");
        console.log(presentEquipment);
        //console.log(presentEquipment[0]);
        // console.log(presentEquipment.length);
        console.log("the end of useeffect");
        // data();
        // const currentPlayer = await loadCurrentPlayer(walletAddress);
        // setCurrentPlayer(currentPlayer);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <p> storage </p>
      <button onClick={onUpdateEquipment}> hhhh</button> <div>this is </div>
    </>
  );
}
