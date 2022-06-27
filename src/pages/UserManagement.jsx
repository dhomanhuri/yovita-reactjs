import React from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL

const UserManagement = () => {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUsers(data.map((_,idx) => ({..._, key: idx})));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Level",
      key: "level",
      dataIndex: "level",
      render: (tag) => (
        <Tag color={tag === "admin" ? "green" : "geekblue"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <EditOutlined className="cursor-pointer"/>
          <DeleteOutlined className="text-red-500 cursor-pointer" onClick={deleteTodo}/>
        </Space>
      ),
    },
  ];
  const deleteTodo = () => {
    console.log("deletetodo"+users.title)
  };
  return (
    <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} loading={!users?.length}/>
  );
};

export default UserManagement;
