import { Card, Row, Col, Typography } from "antd";
import React from "react";
import {
  UserOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;
const BASE_URL = process.env.REACT_APP_BASE_URL

const Dashboard = () => {
  const [users, setUsers] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const { data: users } = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const { data } = await axios.get(`${BASE_URL}/readiness`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUsers(users);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  
  return (
    <Row justify="space-around" align="middle" className="h-full">
      <Col>
        <Card loading={!users?.length} bordered={false} className="text-center" style={{ width: 300 }} >
          <Meta
            title={<Typography.Paragraph className="text-2xl"><DatabaseOutlined/> Data Kesiapan</Typography.Paragraph>}
            description={<Typography.Paragraph className="text-2xl">{data?.length}</Typography.Paragraph>}
          />
        </Card>
      </Col>
      <Col>
      <Card loading={!users?.length} bordered={false} className="text-center" style={{ width: 300 }} >
          <Meta
            title={<Typography.Paragraph className="text-2xl"><UserOutlined/> Data Pengguna</Typography.Paragraph>}
            description={<Typography.Paragraph className="text-2xl">{users?.length}</Typography.Paragraph>}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
