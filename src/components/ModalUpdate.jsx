import React from "react";
import { Select, Modal } from "antd";
import axios from "axios";
import { Typography, Card, Space } from "antd";
// import { AuthContext } from "./modeule/AuthContext";
import { AuthContext } from "../module/AuthContext";
import { LockOutlined, MailOutlined,UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { SubmitButton, Input, Form, FormItem } from "formik-antd";
const BASE_URL = process.env.REACT_APP_BASE_URL

const ModalPredict = ({isModalVisible, setIsModalVisible, data}) => {
  const handleOk = React.useCallback()

  const { update } = React.useContext(AuthContext);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
    title="Update User"
    visible={isModalVisible}
    onOk={() => setIsModalVisible(false)}
    onCancel={() => setIsModalVisible(false)}
    width="70vw"
    maskClosable={false}
  >
    <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            try {const { name, password } = values;
              await update(name, password);
            } catch (error) {
              console.error(error)              
            }
          }}
          validate={(values) => {}}
        >
           {(formik) => (
            <Form>
              <FormItem
                name="nama"
                required={true}
                validate={(value) => {
                  if (value.length === 0) return "nama cannot be empty";
                  return undefined;
                }}
              >
                <Input
                  name="nama"
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
  );
};

export default ModalPredict;
