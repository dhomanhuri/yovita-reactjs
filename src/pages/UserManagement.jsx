import React, {useState} from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { AuthContext } from "../module/AuthContext";
import { LockOutlined, MailOutlined,UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { SubmitButton, Input, Form, FormItem } from "formik-antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Navigate } from "react-router";
// import ModalTable from "../components/ModalTable";
const BASE_URL = process.env.REACT_APP_BASE_URL
const UserManagement = () => {
  const [visibleTable, setVisibleTable] = React.useState(false);
  const [users, setUsers] = React.useState();
  const [editingStudent, setEditigStudent] = useState(null);
  const { update } = React.useContext(AuthContext);
  // const [data] = React.useState();
  
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
      render: (record) => (
        <Space size="middle">
          <EditOutlined className="cursor-pointer" onClick={() => {onEditUser(record)}} />
          <DeleteOutlined className="text-red-500 cursor-pointer" onClick={()=>{deleteTodo(record)}}/>
        </Space>
      ),
    },
  ];
  const onEditUser = (record) =>{
    setVisibleTable(true)
    setEditigStudent({...record});
    // data=record;
  };
  // console.log(visibleTable)
  const deleteTodo = (record) => {
    axios('https://promaydo.net/delete.php?name='+record.name, { mode: 'no-cors'})
    console.log("deletetodo"+record.name)
  };
  function fetchData(record){
    // string url = 'https://promaydo.net/delete.php?name='+record.name
    fetch('https://promaydo.net/delete.php?name='+record.name, { mode: 'no-cors'})
    .then((response) =>{})
    .catch((error) => {})
}
  return (
    <>
    <Modal
    title="Edit User"
    visible={visibleTable}
    setIsModalVisible={setVisibleTable}

    // data={data}
    onOk={()=>{setVisibleTable(false)}}
    onCancel={()=>{setVisibleTable(false)}}
    >
    {/* <Input name="name" value={editingStudent?.name} onChange={(e)=>{
      // nama=e;

    
          
            
    

          
    
    
  
    }}></Input>
    <Input name="password" value={editingStudent?.password}></Input> */}
    <Formik
          initialValues={{
            name: "",
            password: "",
            email: editingStudent?.email
          }}
          onSubmit={async (values, actions) => {
            console.log(values);
            try {const { name, password,email } = values;
              await update(name, password,email);
            } catch (error) {
              console.error(error)              
            }
          }}
          validate={(values) => {
            // email:values.email
            // name:values.name,
          }}
        >
           {(formik) => (
            <Form>
              <FormItem
                name="name"
                required={true}
                validate={(value) => {
                  if (value.length === 0) return "nama cannot be empty";
                  return undefined;
                }}
              >
                <Input
                  name="name"
                  validate={(value) => {
                    if (value.length === 0) return "Name cannot be empty";
                    return undefined;
                  }}
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  disabled={formik.isSubmitting}
                />
              </FormItem>
              <FormItem
                name="password"
                validate={(value) => {
                  if (value.length === 0) return "Password cannot be empty";
                  return undefined;
                }}
              >
                <Input.Password
                  name="password"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  disabled={formik.isSubmitting}
                />
              </FormItem>
              <Space direction="vertical" className="w-full text-center">
                <SubmitButton block type="primary" size="large">
                  Update
                </SubmitButton>
              </Space>
            </Form>
          )}
        </Formik>
    </Modal>
    <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} loading={!users?.length}/>
    </>
    );
  
};
export default UserManagement;