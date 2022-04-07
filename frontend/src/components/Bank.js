import { Link, Route, Switch } from "react-router-dom";
import { List, Card } from "antd";
import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Space } from 'antd';
import { Alert } from 'antd';
import App from "../css/App.css";
import{
    loadCurrentAllAccounts,
    loadCurrentPlayer,
    inviteAPlayer,
    currentSilverBalance,
    currentGoldBalance,
    updatedIndex,
    index,
    estimatedGold,
    estimatedSilver,
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

    // const [allPlayers, setAllPlayers] = useState([]);

    const [silverBalance, setSilverBalance] = useState(100);
    const [goldBalance, setGoldBalance] = useState(0);
    const [index, setIndex] = useState(1);

    const purchaseGoldPressed = async (silvercoins) => {
        const { goldResponse } = await buyGold(walletAddress, silvercoins);
    }

    const exchangeSilverPressed = async (goldcoins) => {
        const { silverResponse } = await exchangeSilver(walletAddress, goldcoins);
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
                    span: 14,
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
            <div>
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
                    <Card style={{ width: 300 }}>
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
                                            <Input placeholder="The number of silver coins" />
                                        </div>
                                    </Space>
                                </div>
                                <div class="info">
                                    <Space>
                                        <div id="third">
                                            <Alert message="Estimated gold" type="warning" />
                                        </div>
                                        <div id="fourth">
                                            <Input placeholder="input placeholder" />
                                        </div>
                                    </Space>
                                </div>
                            </div>

                            <div class="button">
                                <Form.Item {...buttonItemLayout}>
                                    <Button type="primary"
                                            onClick={purchaseGoldPressed()}
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
                                            <Input placeholder="The number of gold coins" />
                                        </div>
                                    </Space>
                                </div>
                                <div class="info">
                                    <Space>
                                        <div id="seventh">
                                            <Alert message="Estimated silver" type="warning" />
                                        </div>
                                        <div id="eighth">
                                            <Input placeholder="input placeholder" />
                                        </div>
                                    </Space>
                                </div>
                            </div>

                            <div class="button">
                                <Form.Item {...buttonItemLayout}>
                                    <Button type="primary"
                                            onClick={() => exchangeSilverPressed()}
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