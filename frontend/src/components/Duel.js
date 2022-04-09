import { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Divider } from "antd";
import * as CONSTANTS from "../constants.js";
import {
  loadCurrentAllAccounts,
  loadCurrentPlayer,
  inviteAPlayer,
  loadAllInviter,
  AcceptADuel,
  DeclineADuel,
} from "../util/interact.js";





function Duel(props) {
  //State variables
  const player_address = props.accountAddress;
  // const player = props.currentPlayer;
  //a string that stores the user's wallet address
  const [walletAddress, setwalletAddress] = useState(player_address);
  //a string that stores a helpful message that guides the user on how to interact with the dApp
  const [status, setStatus] = useState(props.status);
  const [allPlayers, setAllPlayers] = useState([]);
  const [allInviter, setAllInviter] = useState([]);
  // const [currentPlayer, setCurrentPlayer] = useState(player);

  const columns = [
    {
      title: "Name",
      dataIndex: "player_name",
      key: "player_name",
    },
    {
      title: "Attack",
      dataIndex: "attack",
      key: "attack",
    },
    {
      title: "Equipment",
      dataIndex: "equipment",
      key: "equipment",
      render: (equipment) => {
        return equipment["equipment_name"];
      },
    },
    {
      title: 'Walletaddress',
      dataIndex: 'walletAddress',
      key:'walletAddress',
      
    },

    {
      title: "Availability",
      key: "is_pending",
      dataIndex: "is_pending",
      render: (is_pending) => {
        return (
          <Tag color={CONSTANTS.STATUS_COLOR[is_pending]} key={is_pending}>
            {CONSTANTS.is_pending[is_pending]}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{
              margin: "4px 8px",
              padding: "2px 15px",
              fontSize: "13px",
              color: "#fff",
              backgroundColor: "#FF5733",
              borderRadius: "5px",
              borderColor: "white",
            }}
            onClick={() => onInviteAPlayerPressed(record.walletAddress)}
          >
            Invite {record.player_name}
          </Button>
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: 'All Inviter Address',
      dataIndex: 'name',
      key: 'name',
      render: text => text,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary"
                      style={{
                        // margin: "4px 8px",
                        // padding: "2px 15px",
                        // fontSize: "13px",
                        color: "#fff",
                        border:"black",
                        backgroundColor: "#FF5733",
                        borderRadius: "5px",
                      }}
                      onClick={() =>AcceptADuel(record.name) }
              >Accept </Button>
              <Button type="primary"
                      style={{
                        margin: "4px 8px",
                        padding: "2px 15px",
                        fontSize: "13px",
                        color: "black",
                        borderColor:"black",
                        backgroundColor: "#fff",
                        bordeRradius: "5px",
                      }}
                      onClick={() =>DeclineADuel(record) }
              >Decline </Button>
        </Space>
      ),
    },
  ];

  //is called after your component is rendered.
  useEffect(() => {
    //TODO: implement
    async function fetchData() {
      
			if (walletAddress !== "") {
				const allPlayers = await loadCurrentAllAccounts();
				setAllPlayers(allPlayers);

        const allInviter = await loadAllInviter(walletAddress);
        setAllInviter(allInviter);
        // here is for changing [] into the special structure
        
        // const currentPlayer = await loadCurrentPlayer(walletAddress);
        // setCurrentPlayer(currentPlayer);
      }

      addSmartContractListener();
    }
    fetchData();
  }, []);

  function addSmartContractListener() {
    //TODO: implement
  }
 //this function will be called when the user wants to update the message stored in the smart contract.
 const onInviteAPlayerPressed = async (invitee) => {
   console.log("duel :" + invitee);
  const { status } = await inviteAPlayer(walletAddress,invitee);
};
const AcceptADuelPressed = async(inviter) => {
  console.log("decline duel: " + inviter);
  const {status} = await AcceptADuel(walletAddress, inviter);

}
const DeclineADuelPressed = async(inviter) => {
  console.log("decline duel: " + inviter);
  const {status} = await DeclineADuel(walletAddress, inviter);

}
  

 

  let allOtherPlayers = []
  for(var i = 0; i<Object.keys(allPlayers).length; i++){
    allOtherPlayers = allPlayers.filter((item) => item.walletAddress.toUpperCase() !== walletAddress.toUpperCase());
  }
  let allInviterJsonArray = []
  for (let i = 0; i < allInviter.length; i++) {
    allInviterJsonArray.push({ name: allInviter[i] });
  }

  return (
    <>
      <Divider orientation="left">ACCOUNT TABLES</Divider>
      <Table columns={columns} dataSource={allOtherPlayers} />
      <Divider orientation="left">RECEIVED INVITATION</Divider>
      <Table columns={columns1} dataSource={allInviterJsonArray} /></>
  );
}
export default Duel;
