import React, { useEffect, useState } from "react";
import { List, Card, Image, Space, Divider, Layout } from "antd";
import SaleModal from "./SaleModal";

// import Card from "react-bootstrap/Card";

import { Button, Radio } from "antd";

const { Content } = Layout;
const data = [
  {
    title: "Equipment 1",
    name: "sword1",
    harm: 81,
  },
  {
    title: "Equipment 2",
    name: "sword2",
    harm: 92,
  },
  {
    title: "Equipment 3",
    name: "sword3",
    harm: 93,
  },
  {
    title: "Title 4",
    name: "sword4",
    harm: 94,
  },
  {
    title: "Title 5",
    name: "sword5",
    harm: 95,
  },
  {
    title: "Title 6",
    name: "sword6",
    harm: 96,
  },
];

export default function Equipment() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("sword1");

  return (
    <>
      <Layout>
        <Content>
          <div className="content">
            <div></div>
            <div>
              <h1 id="storage">Storage</h1>
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
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      actions={[
                        <Button
                          shape="round"
                          className="redButton"
                          type="default"
                        >
                          Equip
                        </Button>,
                        <Button
                          shape="round"
                          className="whiteButton"
                          type="primary"
                          onClick={() => {
                            setVisible(true);
                            console.log("james");
                            setName(item.name);
                          }}
                        >
                          Sale
                        </Button>,
                      ]}
                    >
                      <p className="titleName">Equipment X</p>
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
        name={name}
      />
    </>
  );
}
