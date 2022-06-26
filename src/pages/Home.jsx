import React from "react";
import DrawerMenu from '../common/DrawerMenu'
import { Layout, Breadcrumb } from 'antd';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const UserManagementPage = React.lazy(() =>
  import(/* webpackChunkName: "UserManagementPage", webpackPrefetch: true */ './UserManagement')
);

const DashboardPage = React.lazy(() =>
  import(/* webpackChunkName: "DashboardPage", webpackPrefetch: true */ './Dashboard')
);

const ReadinessPage = React.lazy(() =>
  import(/* webpackChunkName: "ReadinessPage", webpackPrefetch: true */ './Readiness')
);

const PredictPage = React.lazy(() =>
  import(/* webpackChunkName: "PredictPage", webpackPrefetch: true */ './Predict')
);

const Home = () => {
  const location = useLocation()
  const rolee = localStorage.getItem("role")
  if (rolee==="admin") {
    return (
      <Layout className="h-screen">
        <DrawerMenu>
          <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item className="capitalize">{location?.pathname.replace('/', '').replace('-', ' ')}</Breadcrumb.Item>
              </Breadcrumb>
              <Layout.Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Routes>
                  <Route path={`dashboard`} element={<DashboardPage/>} />
                  <Route path={`data-kesiapan`} element={<ReadinessPage/>} />
                  <Route path={`prediksi`} element={<PredictPage/>} />
                  <Route path={`data-pengguna`} element={<UserManagementPage/>} />
                </Routes>
                <Outlet/>
              </Layout.Content>
          </Layout>
        </DrawerMenu>
        <Outlet/>
      </Layout>
    );
  }else{
    return (
      <Layout className="h-screen">
        <DrawerMenu>
          <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item className="capitalize">{location?.pathname.replace('/', '').replace('-', ' ')}</Breadcrumb.Item>
              </Breadcrumb>
              <Layout.Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Routes>
                  <Route path={`dashboard`} element={<DashboardPage/>} />
                  <Route path={`data-kesiapan`} element={<ReadinessPage/>} />
                  <Route path={`prediksi`} element={<PredictPage/>} />
                </Routes>
                <Outlet/>
              </Layout.Content>
          </Layout>
        </DrawerMenu>
        <Outlet/>
      </Layout>
    );
  }
  
};

export default Home;