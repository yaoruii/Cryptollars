import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input } from "antd";
// import styles from "../../css/App.css";

export default function SaleModal(props) {
  const [form] = Form.useForm();
  // const onFinish = (values) => {
  //   console.log(values);
  // };

  return (
    <>
      <Modal
        visible={props.isModalVisible}
        footer={null}
        onCancel={() => {
          props.setIsModalVisible(false);
        }}
      >
        <p>Please input the player's id and expected price</p>
        <p>Equipment Name: {props.name}</p>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={(james) => {
            // #####  important  axios to call be.
            console.log(james);
            console.log(james.username);
            console.log(james.password);
          }}
          onFinishFailed={() => {
            console.log("finished failed");
          }}
          autoComplete="off"
        >
          <Form.Item
            label="id"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input the equipment id that for trading",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="price"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your ideal price for that",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <span>
              <Button
                className="redButton"
                shape="round"
                type="primary"
                htmlType="submit"
              >
                Confirm
              </Button>
              <Button
                shape="round"
                type="Default"
                onClick={() => {
                  props.setIsModalVisible(false);
                }}
              >
                Cancel
              </Button>
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
