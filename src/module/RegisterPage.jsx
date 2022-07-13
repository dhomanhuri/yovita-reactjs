import React from "react";
import { CenteredLayout } from "../common/Layout";
import { Typography, Card, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { SubmitButton, Input, Form, FormItem } from "formik-antd";
import { AuthContext } from "./AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = React.useContext(AuthContext);

  const Login = () => {
    return (
      <Typography.Text onClick={() => navigate("/login")} className="text-center text-blue-600 cursor-pointer">Login</Typography.Text>
    )
  };
  return (
    <CenteredLayout>
      <Typography.Title>Combat Aircraft Operational Readiness</Typography.Title>
      <Card
        className="my-8 xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/3"
        title="Register Account"
        style={{textAlign: 'center'}}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            const { email, password, name } = values;
            await register(name, email, password);
            // await register(name, email + "@student.polinema.ac.id", password);
            navigate("/login");
          }}
          validate={(values) => {}}
        >
          {(formik) => (
            <Form>
              <FormItem
                name="name"
                required={true}
                validate={(value) => {
                  if (value.length === 0) return "Name cannot be empty";
                  return undefined;
                }}
              >
                <Input
                  name="name"
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  disabled={formik.isSubmitting}
                />
              </FormItem>
              <FormItem
                name="email"
                required={true}
                validate={(value) => {
                  const email = value ;
                  if (email.length === 0) return "Email cannot be empty";
                  // if(!email.includes("@student.polinema.ac.id") &&!email.includes("@idu.ac.id")) return "Invalid email"
                  // if(!email.includes("@idu.ac.id") ) return "Invalid email"
                  // if(!email.includes("@kemham.go.id") ) return "Invalid email"
                  // if(!email.includes("@tni-au-mil.id") ) return "Invalid email"
                  if(!email.includes("student.polinema.ac.id")&&!email.includes("@tni-au-mil.id")&&!email.includes("@kemham.go.id")&&!email.includes("@idu.ac.id")) return "Invalid email";
                  // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return "Invalid email"
                  return undefined;
                }}
              >
                <Input
                  // addonAfter="@student.polinema.ac.id"
                  name="email"
                  prefix={<MailOutlined />}
                  placeholder="Email"
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
                  Register
                </SubmitButton>
              </Space>
              <Space direction="vertical" className="w-full text-center mt-2">
                <Typography.Text className="text-center">Already have an account? {Login()}</Typography.Text>
              </Space>
            </Form>
          )}
        </Formik>
      </Card>
    </CenteredLayout>
  );
};

export default RegisterPage;
