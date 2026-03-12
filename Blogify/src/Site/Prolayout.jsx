import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, ConfigProvider } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "about",
    icon: <InfoCircleOutlined />,
    label: <Link to="/about">About</Link>,
  },
  {
    key: "contact",
    icon: <MailOutlined />,
    label: <Link to="/contact">Contact</Link>,
  },
  {
    key: "blog",
    icon: <MailOutlined />,
    label: <Link to="/blog">Blog</Link>,
  },
];

const ProLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
    
  } = theme.useToken();

  const getSelectedKey = () => {
    const path = location.pathname.substring(1);
    return path || "dashboard";
  };

  const getHeaderTitle = () => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return "Dashboard";
    }
    const path = location.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#f0f2f5",
            headerBg: colorBgContainer,
            headerHeight: 64,
            siderBg: "#001529",
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          maxWidth: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          width={200}
          collapsedWidth={80}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "auto",
            zIndex: 100,
            boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          }}
          theme="dark"
        >
          <div
            style={{
              height: 64,
              margin: 0,
              padding: collapsed ? "0 16px" : "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              background: "#002140",
              color: "#fff",
              fontSize: collapsed ? 16 : 18,
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {collapsed ? "B" : "Blogify"}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={items}
            style={{
              borderRight: 0,
              height: "calc(100% - 64px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            minHeight: "100vh",
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)",
            transition: "all 0.2s",
            background: "#f0f2f5",
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 99,
              width: "100%",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              height: 64,
              lineHeight: "64px",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "18px",
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <h2
              style={{
                margin: 0,
                marginLeft: 16,
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              {getHeaderTitle()}
            </h2>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 24,
                flex: 1,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                width: "100%",
                height: "100%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              padding: "12px 24px",
              background: "#f0f2f5",
              color: "rgba(0,0,0,0.45)",
              fontSize: 14,
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ProLayout;
