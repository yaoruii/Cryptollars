import { Link, Route, Switch } from "react-router-dom";
import { List, Card } from "antd";
import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Space } from 'antd';
import { Alert } from 'antd';
import App from "../css/App.css";
import{
    currentSilverBalance,
    currentGoldBalance,
    updatedIndex,
    getIndex,
    initSilver,
    buyGold,
    exchangeSilver
} from "../util/interact.js";

const data = [
    {}
];


export default function Bank(props) {

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');

    const player_address = props.accountAddress;
    const [walletAddress, setwalletAddress] = useState(player_address);

    const [visible, setVisible] = useState(false);
    const [silverBalance, setSilverBalance] = useState(100);
    const [goldBalance, setGoldBalance] = useState(0);
    const [index, setIndex] = useState("");
    const [estimatedGold, setEstimatedGold] = useState("0");
    const [estimatedSilver, setEstimatedSilver] = useState("0");
    const [temp, setTemp] = useState(0);

    useEffect(() => { //TODO: implement
        async function fetchData() {
                if (walletAddress !== "") {
                    setVisible(true);
                    //await initSilver(walletAddress);
                    const silver = await currentSilverBalance(player_address);
                    console.log("silver");
                    console.log(silver);
                    console.log("silver");
                    setSilverBalance(silver);
                    const gold = await currentGoldBalance(player_address);
                    console.log("gold");
                    console.log(gold);
                    console.log("gold");
                    setGoldBalance(gold);
                    const idx = await getIndex();
                    setIndex(idx);
                }
            }
            fetchData();
      }, [silverBalance, goldBalance, index]);

    const handleInput = event => {
        setEstimatedGold(event.target.value);
    };
    const handleInput2 = event => {
        setEstimatedSilver(event.target.value);
    };
    const handleInput3 = event => {
        setTemp(event.target.value);
    };

    const changeIndexPressed = async (newIndex) => {
        await updatedIndex(walletAddress, newIndex);
        setIndex(temp);
    }
   
    const purchaseGoldPressed = async (silvercoins) => {
        await buyGold(walletAddress, silvercoins);
    }

    const exchangeSilverPressed = async (goldcoins) => {
        await exchangeSilver(walletAddress, goldcoins);
    }

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 14,
                },
            }
            : null;

    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 16,
                    offset: 4,
                },
            }
            : null;


    return (
        <>
            <div></div>
            <div id="Title">
                <h2 id="Bank">Bank</h2>
            </div>
            <div className={visible? '':'hidden'}>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                        </List.Item>
                    )}
                />
                <div class="card">
                    <Card style={{ width: 250 }}>
                        <p>Current Balance</p>
                        <Space>
                            <div id="currentSilver">
                                <Alert message="Current Silver Coins:" type="info" />
                            </div>
                            <span>{silverBalance}</span>
                        </Space>
                        <Space>
                            <div id="currentGold">
                                <Alert message="Current Gold Coins:" type="warning" />
                            </div>
                            <span>{goldBalance}</span>
                        </Space>
                    </Card>
                </div>
                
                <div id="indexCard">
    <Card style={{ width: 250, height: 180 }}>
        <p>Edit Index</p>
        <Space>
            <div id="ninth">
                <Alert message="New Index:" type="error" />
            </div>
            <div id="tenth">
                <Input placeholder="" onChange={handleInput3} />
            </div>
        </Space>
        <div class="button">
            <Form.Item {...buttonItemLayout} style={{ width: 100 }}>
                <Button type="primary"
                        onClick={() => {changeIndexPressed(temp);}}
                >Change</Button>
            </Form.Item>   
        </div>
    </Card>
</div>

                <div class="Form">
                    <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{
                            layout: formLayout,
                        }}
                        onValuesChange={onFormLayoutChange}
                        onFinish={(user) => {
                            console.log(user);
                        }}
                    >
                        <div class="rateInfo">
                            <Space>
                                <div>
                                    Current interest rate:
                                </div>
                                <div id="rate">
                                    1 Gold = {index} Silver
                                </div>
                            </Space>
                        </div>

                        <div>
                            <div>
                                Input the amount of silver for buying gold
                            </div>
                            <div>
                                <div class="info">
                                    <Space>
                                        <div id="first">
                                            <Alert message="Silver" type="info" />
                                        </div>
                                        <div id="second">
                                            <Input placeholder="0" onChange={handleInput} />
                                        </div>
                                    </Space>
                                </div>
                                <div class="info">
                                    <Space>
                                        <div id="third">
                                            <Alert message="Estimated gold" type="warning" />
                                        </div>
                                        <div id="fourth">
                                            <Input placeholder={estimatedGold / index} />
                                        </div>
                                    </Space>
                                </div>
                            </div>
                            
                            <div class="button">
                            
                                <Form.Item {...buttonItemLayout}>
                                
                                    
                
                                    <Button type="primary"
                                            onClick={()=>{purchaseGoldPressed(estimatedGold);}}
                                            >Purchase</Button>
                                           
                                </Form.Item>
                                
                            </div>
                            
                            <div>
                                Input the amount of gold for exchanging silver
                            </div>
                            <div>
                                <div class="info">
                                    <Space>
                                        <div id="fifth">
                                            <Alert message="Gold" type="info" />
                                        </div>
                                        <div id="sixth">
                                            <Input placeholder="0" onChange={handleInput2}/>
                                        </div>
                                    </Space>
                                </div>
                                <div class="info">
                                    <Space>
                                        <div id="seventh">
                                            <Alert message="Estimated silver" type="warning" />
                                        </div>
                                        <div id="eighth">
                                            <Input placeholder={estimatedSilver * index} />
                                        </div>
                                    </Space>
                                </div>
                            </div>

                            <div class="button">
                            
                                <Form.Item {...buttonItemLayout}>
                                
                
                                    <Button type="primary"
                                            onClick={()=>{exchangeSilverPressed(estimatedSilver);}}
                                            >Exchange</Button>
                                            
                                </Form.Item>
                                
                            </div>

                        </div>

                    </Form>
                </div>


            </div>
        </>

    );
}


//ReactDOM.render(<FormLayoutDemo />, mountNode);
