import React from "react";
import { Layout, Menu, Typography, Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  DotChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Header, Sider } = Layout;

const DrawerMenu = (props) => {
  const location = useNavigate();
  const [selectedKeys, setSelectedKeys] = React.useState("");
  const [menuProps, setMenuProps] = React.useState({
    defaultSelectedKeys: [`/overview`],
    selectedKeys: [selectedKeys],
    className: "h-full bg-blue-100",
    style: { height: "100%", borderRight: 0, paddingTop: 16 },
    onClick: (e) => {
      setSelectedKeys(e.key);
    },
  });
  React.useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);
  React.useEffect(() => {
    setMenuProps((prev) => ({ ...prev, selectedKeys: [selectedKeys] }));
  }, [selectedKeys]);

  const rolee = localStorage.getItem("role")
  const [menusadmin] = React.useState(
    [{
      identifier: "dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
      roles: ["*"],
      visible: true,
    },
    {
      identifier: "data-kesiapan",
      label: "Data Kesiapan",
      icon: <DatabaseOutlined />,
      roles: ["*"],
      visible: true,
    },
    {
      identifier: "prediksi",
      label: "Prediksi",
      icon: <DotChartOutlined />,
      roles: ["*"],
      visible: true,
    },
    {
      identifier: "data-pengguna",
      label: "Data Pengguna",
      icon: <UserOutlined />,
      roles: ["*"],
      visible: true,
    },
  ]);
  const [menususer] = React.useState(
    [{
      identifier: "dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
      roles: ["*"],
      visible: true,
    },
    {
      identifier: "data-kesiapan",
      label: "Data Kesiapan",
      icon: <DatabaseOutlined />,
      roles: ["*"],
      visible: true,
    },
    {
      identifier: "prediksi",
      label: "Prediksi",
      icon: <DotChartOutlined />,
      roles: ["*"],
      visible: true,
    },
  ]);
  if (rolee==="admin") {
    return (
      <Layout>
        <Header className="header">
          <div className="flex items-center">
            <Typography.Title className="text-white mt-2">
              Sistem Prediksi
            </Typography.Title>
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item key="logout" >
                    <Link onClick={() => localStorage.clear()} to="/login" className="text-red-500" replace>
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar src="https://i.pravatar.cc/300" className="ml-auto" />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu {...menuProps}>
              {menusadmin.map((menu) => (
                <Menu.Item
                  className="mt-4"
                  icon={menu.icon}
                  key={`${menu.identifier}`}
                >
                  <Link to={`${menu.identifier}`}>{menu.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          {props.children}
        </Layout>
      </Layout>
    );
  }
  else{
    return (
      <Layout>
        <Header className="header">
          <div className="flex items-center">
            <Typography.Title className="text-white mt-2">
              Sistem Prediksi
            </Typography.Title>
            <Dropdown
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item key="logout" >
                    <Link onClick={() => localStorage.clear()} to="/login" className="text-red-500" replace>
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar src="https://i.pravatar.cc/300" className="ml-auto" />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu {...menuProps}>
              {menususer.map((menu) => (
                <Menu.Item
                  className="mt-4"
                  icon={menu.icon}
                  key={`${menu.identifier}`}
                >
                  <Link to={`${menu.identifier}`}>{menu.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          {props.children}
        </Layout>
      </Layout>
    );
  }
  
};

export default DrawerMenu;
