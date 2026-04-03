import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Button, Space, Drawer } from "antd";
import {
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title, Text } = Typography;

const navItems = ["Home", "Blogs", "Categories", "About", "Contact"];

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [loginHover, setLoginHover] = useState(false);
  const [startedHover, setStartedHover] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    let grow = true;
    const interval = setInterval(() => {
      setLogoScale(grow ? 1.08 : 1);
      grow = !grow;
    }, 1500);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 992;

  const themeColors = {
    background: isDarkMode ? "#0f172a" : "#ffffff",
    border: isDarkMode ? "#1e293b" : "#e5e7eb",
    text: isDarkMode ? "#f8fafc" : "#111827",
    subText: isDarkMode ? "#cbd5e1" : "#374151",
    buttonBg: isDarkMode ? "#1e293b" : "#ffffff",
    buttonHover: isDarkMode ? "#334155" : "#f3f4f6",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    drawerBg: isDarkMode ? "#0f172a" : "#ffffff",
  };

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: themeColors.background,
          borderBottom: `1px solid ${themeColors.border}`,
          height: "auto",
          lineHeight: "normal",
          padding: 0,
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px" }}>
          <Row
            justify="space-between"
            align="middle"
            gutter={[16, 16]}
            wrap={false}
          >
            <Col>
              <Space size={12} align="center">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background:
                      "linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 28,
                    fontWeight: 700,
                    transform: `scale(${logoScale})`,
                    transition: "transform 1.5s ease-in-out",
                  }}
                >
                  B
                </div>
                <Title
                  level={3}
                  style={{ margin: 0, fontSize: 28, fontWeight: 700, color: themeColors.text }}
                >
                  Blogify
                </Title>
              </Space>
            </Col>

            {!isMobile ? (
              <>
                <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
                  <Space size={28} wrap>
                    {navItems.map((item) => (
                      <div
                        key={item}
                        onMouseEnter={() => setHoveredLink(item)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          color: themeColors.subText,
                          fontWeight: 500,
                          fontSize: 16,
                          paddingBottom: 4,
                        }}
                      >
                        <Text style={{ color: themeColors.subText, fontWeight: 500 }}>
                          {item}
                        </Text>
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: -2,
                            height: 2,
                            width: hoveredLink === item ? "100%" : 0,
                            backgroundColor: themeColors.primary,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                    ))}
                  </Space>
                </Col>

                <Col>
                  <Space size={12} wrap>
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      icon={
                        isDarkMode ? (
                          <SunOutlined style={{ fontSize: 18, color: themeColors.text }} />
                        ) : (
                          <MoonOutlined style={{ fontSize: 18, color: themeColors.text }} />
                        )
                      }
                    />

                    <Button
                      shape="round"
                      onMouseEnter={() => setLoginHover(true)}
                      onMouseLeave={() => setLoginHover(false)}
                      style={{
                        padding: "10px 24px",
                        height: "auto",
                        borderRadius: 9999,
                        fontWeight: 500,
                        border: `1px solid ${themeColors.border}`,
                        background: loginHover ? themeColors.buttonHover : themeColors.buttonBg,
                        color: themeColors.text,
                        transition: "all 0.3s ease",
                      }}
                    >
                      Log in
                    </Button>

                    <Button
                      type="primary"
                      shape="round"
                      onMouseEnter={() => setStartedHover(true)}
                      onMouseLeave={() => setStartedHover(false)}
                      style={{
                        padding: "10px 24px",
                        height: "auto",
                        borderRadius: 9999,
                        fontWeight: 500,
                        background: startedHover
                          ? themeColors.primaryHover
                          : themeColors.primary,
                        borderColor: startedHover
                          ? themeColors.primaryHover
                          : themeColors.primary,
                        transition: "all 0.3s ease",
                      }}
                    >
                      Get started
                    </Button>
                  </Space>
                </Col>
              </>
            ) : (
              <Col>
                <Space>
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    icon={
                      isDarkMode ? (
                        <SunOutlined style={{ fontSize: 18, color: themeColors.text }} />
                      ) : (
                        <MoonOutlined style={{ fontSize: 18, color: themeColors.text }} />
                      )
                    }
                  />

                  <Button
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: 24, color: themeColors.text }} />}
                    onClick={() => setMobileOpen(true)}
                    style={{ padding: 0, height: "auto" }}
                  />
                </Space>
              </Col>
            )}
          </Row>
        </div>
      </Header>

      <Drawer
        title={
          <Space size={12} align="center">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              B
            </div>
            <Text style={{ fontSize: 22, fontWeight: 700, color: themeColors.text }}>
              Blogify
            </Text>
          </Space>
        }
        placement="right"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={300}
        styles={{
          header: {
            background: themeColors.drawerBg,
            borderBottom: `1px solid ${themeColors.border}`,
          },
          body: {
            paddingTop: 12,
            background: themeColors.drawerBg,
          },
        }}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          {navItems.map((item) => (
            <Text
              key={item}
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: themeColors.subText,
                cursor: "pointer",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Text>
          ))}

          <div style={{ marginTop: 12 }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Button
                onClick={() => navigate("/login")}
                shape="round"
                style={{
                  width: "100%",
                  padding: "10px 24px",
                  height: "auto",
                  borderRadius: 9999,
                  fontWeight: 500,
                  border: `1px solid ${themeColors.border}`,
                  background: themeColors.buttonBg,
                  color: themeColors.text,
                }}
              >
                Log in
              </Button>

              <Button
                type="primary"
                shape="round"
                style={{
                  width: "100%",
                  padding: "10px 24px",
                  height: "auto",
                  borderRadius: 9999,
                  fontWeight: 500,
                  background: themeColors.primary,
                  borderColor: themeColors.primary,
                }}
              >
                Get started
              </Button>
            </Space>
          </div>
        </Space>
      </Drawer>
    </>
  );
};

export default Navbar;