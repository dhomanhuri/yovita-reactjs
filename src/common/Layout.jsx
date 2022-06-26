import React from 'react'
import { Layout, Menu, Avatar, Dropdown, Typography } from 'antd'
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const CenteredLayout = (props) => {
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center container mx-auto">
        {props.children}
      </div>
    </Layout>
  )
};

const WithHeaderLayout = (props) => {
  return (
    <Layout className="h-screen">
      <Header className="fixed z-10 w-full">
        <div className="container mx-auto">
        <div className="flex items-center">
          <Typography.Title className="text-white mb-0 mr-8" level={4}>One CMS</Typography.Title>
          <Dropdown
            placement="bottomRight"
            overlay={(
              <Menu>
                <Menu.Item>
                  <Link to="/login" className="text-red-500">Logout</Link>
                </Menu.Item>
              </Menu>
            )}
          >
            <Avatar src="https://i.pravatar.cc/300" className="ml-auto"/>
          </Dropdown>
        </div>
        </div>
      </Header>
      <Content className="pt-16 overflow-auto">
        <div className="p-12 container mx-auto">
          {props.children}
        </div>
      </Content>
    </Layout>
  )
}

export { CenteredLayout, WithHeaderLayout }
