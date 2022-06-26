import React from "react";
import { CenteredLayout } from "../common/Layout";
import { Typography, Card, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { SubmitButton, Input, Form, FormItem } from "formik-antd";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const Register = () => {
    return (
      <Typography.Text onClick={() => navigate("/register")} className="text-center text-blue-600 cursor-pointer">Register</Typography.Text>
    )
  };
  return (
    <CenteredLayout>
      <Typography.Title>Combat Aircraft Operational Readiness</Typography.Title>
      <Card
        className="my-8 xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        title="Login Account"
        style={{textAlign: 'center'}}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              const { email, password } = values;
              await login(email, password);
              navigate("/dashboard");
            } catch (error) {
              console.error(error)              
            }
          }}
          validate={(values) => {}}
        >
          {(formik) => (
            <Form>
              <FormItem
                name="email"
                required={true}
                validate={(value) => {
                  if (value.length === 0) return "Email cannot be empty";
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return "Invalid email"
                  return undefined;
                }}
              >
                <Input
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
                  Login
                </SubmitButton>
              </Space>
              <Space direction="vertical" className="w-full text-center mt-2">
                <Typography.Text className="text-center">Don't have an account yet? {Register()}</Typography.Text>
              </Space>
            </Form>
          )}
        </Formik>
      </Card>
    </CenteredLayout>
  );
};

export default LoginPage;
