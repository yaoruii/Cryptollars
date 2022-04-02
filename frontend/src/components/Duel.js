import { useEffect, useState } from "react";
import { Table, Tag, Space, Button,Divider } from 'antd';

import{
  loadCurrentAllAccounts,
  loadCurrentPlayer,
  inviteAPlayer
} from "../util/interact.js";


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Pending',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color =  'green';
          if (tag === 'Pending') {//it has a pending invitation, other people can not invite them for now!
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a>
        <a>Get Details</a> */}
        <Button type="primary"
                    style={{
                      margin: "4px 8px",
                      padding: "2px 15px",
                      fontSize: "13px",
                      color: "#fff",
                      backgroundColor: "#FF5733",
                      borderRadius: "5px",
                      borderColor:"white"
                    }}
                    onClick={() =>Rerun() }
            >Invite {record.name}</Button>
      </Space>
    ),
  },
];
function Rerun(){

}
const columns1 = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
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
                    onClick={() =>AcceptADuel() }
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
                    onClick={() =>DeclineADuel() }
            >Decline </Button>
      </Space>
    ),
  },
];
function AcceptADuel(){

}
function DeclineADuel(){

}
const data1 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function Duel(props){
  //State variables
  const player_address = props.accountAddress; 
  //a string that stores the user's wallet address
  const [walletAddress, setwalletAddress] = useState(player_address);
  //a string that stores a helpful message that guides the user on how to interact with the dApp
  const [status, setStatus] = useState(props.status);
  const [allPlayers, setAllPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  //is called after your component is rendered.
  useEffect(() => { //TODO: implement
    async function fetchData() {
      
			// if (walletAddress !== "") {
			// 	const allPlayers = await loadCurrentAllAccounts();
			// 	setAllPlayers(allPlayers);
			// }
			const currentPlayer = await loadCurrentPlayer(walletAddress);
			setCurrentPlayer(currentPlayer);

			addSmartContractListener();			
		}
		fetchData();


  }, [walletAddress, allPlayers, status]);

  function addSmartContractListener() { //TODO: implement

  }

  

  //this function will be called when the user wants to update the message stored in the smart contract.
  const onUpdatePressed = async (invitee) => {
		const { status } = await inviteAPlayer(invitee);
		setStatus(status);
	};

  // //get table case list
  // let cases = [];
  // if (data == null || Object.keys(data).length === 0) {
  //   console.log(`test data is empty, ${currentTitle}, ${testCaseCategory}`);
  // } 



  return (
    
      <>
      <h1>{player_address}</h1>
      <h1>{status}</h1>
      <h1>{currentPlayer}</h1>
      <Divider orientation="left">ACCOUNT TABLES</Divider>
      <Table columns={columns} dataSource={data} />
      <Divider orientation="left">RECEIVED INVITATION</Divider>
      <Table columns={columns1} dataSource={data1} /></>
  );
}
export default Duel;