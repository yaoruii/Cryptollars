import React from "react";
import 'antd/dist/antd.css';
import {  useState } from "react";
import { Input,Form ,Button} from 'antd';

import "../css/App.css";

import{
  initialize
} from "../util/interact.js";

const Game = (props) => {
  // const callback = props.connect;
  // const walletAddress = props.walletAddress;
  const [status, setStatus] = useState("");

  const onFinish = async (value) => {
    console.log(value['username']);
    const {status} = await initialize(value['username'], props.accountAddress);
    setStatus(status);
  };
  
  return (
    <div className="outer-wrap">
      <div  className="login-panel">
      <Form className="realinput"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      initialValues={{
        size: "small",
      }}
     
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input className="inputname"/>
      </Form.Item>

     

   

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          initialize the game!
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
    
    
  );
};

export default Game;