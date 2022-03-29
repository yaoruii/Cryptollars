import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { List, Card } from "antd";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
);

const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);

export default function Equipment() {
  return (
    <>
      <div></div>
      <div>
        <h2>Storage</h2>
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
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
        , mountNode,
      </div>
    </>
  );
}
