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
const { confirm } = Modal;

// import Card from "react-bootstrap/Card";

const { Content } = Layout;

export default function Equipment(props) {
  //State variables
  const player_address = props.accountAddress;

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("sword1");
  const [presentEquipment, setEquipment] = useState("");
  const [walletAddress, setwalletAddress] = useState(player_address);

  // this function is for getting present equipments for this player
  // the return variable will be used in allEquipment
  // const onUpdateEquipment = async () => {
  //   const { presentEquipment } = await getEquipment(walletAddress);
  //   setEquipment(presentEquipment);
  // };

  // this function is for Equip
  const equipThisEquipment = async (equipment_id) => {
    await Equip(walletAddress, equipment_id);
  };

  // this function is for unequip
  const unequipPresentEquipment = async () => {
    await unEquip(walletAddress);
  };

  // this function is for making a trade
  const makeTrade = async (inviteeAddress, equipment_id, silver_number) => {
    await createTrade(
      walletAddress,
      inviteeAddress,
      equipment_id,
      silver_number
    );
  };

  // this function is for accepting a trade
  const acceptATrade = async (inviterAddress) => {
    await acceptTrade(walletAddress, inviterAddress);
  };

  // this function is for declining a trade
  const declineATrade = async (inviterAddress) => {
    await declineTrade(walletAddress, inviterAddress);
  };

  useEffect(() => {
    //TODO: implement
    async function fetchData() {
      if (walletAddress !== "") {
        const presentEquipment = await getEquipment(walletAddress);
        setEquipment(presentEquipment);
        console.log(presentEquipment);
        console.log(presentEquipment[0]);
      }
    }
    fetchData();
  }, [walletAddress]);

  function showConfirm(input) {
    confirm({
      title: "Do you want to equip this equipment?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        // unequipPresentEquipment();
        // equipThisEquipment(input);
        console.log("OK");
        console.log(input);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <>
      <Layout>
        <Content>
          <div className="content">
            <div></div>
            <div>
              <h1 className="headerPretty" id="storage">
                Storage
              </h1>
            </div>
            <div>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={presentEquipment}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      actions={[
                        <Button
                          shape="round"
                          className="redButton"
                          type="default"
                          onClick={() => {
                            setName(item.id);
                            showConfirm(item.id);
                            // console.log("testing equipment getting");
                            // console.log(presentEquipment);
                            // console.log("testing equipment getting");
                          }}
                        >
                          Equip
                        </Button>,
                        <Button
                          shape="round"
                          className="whiteButton"
                          type="primary"
                          onClick={() => {
                            setVisible(true);
                            //console.log("james");
                            setName(item.id);
                          }}
                        >
                          Sale
                        </Button>,
                      ]}
                    >
                      <p className="titleName">
                        Name: {item.equipment_name} <br /> ID: {item.id} <br />{" "}
                        Sword-strength: {item.sword_strength}
                      </p>
                      <Divider plain></Divider>
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="this is a picture"
                        width="200px"
                      />
                      <br />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Content>
      </Layout>
      <SaleModal
        setIsModalVisible={setVisible}
        isModalVisible={visible}
        id={name}
      />
    </>
  );
}
