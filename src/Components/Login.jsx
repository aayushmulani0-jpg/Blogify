import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  Row,
  Image,
  Typography,
  message,
  Input,
  Flex,
  Card,
  Layout,
  Avatar,
  ConfigProvider,
  theme as antdTheme,
} from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import axiosInstance from "../Utils/axiosInstance.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { getMediaPath } from "../Utils/getMediaPath.jsx";
import { setUserDetails } from "../Redux/reducer.user.jsx";
// import { setTheme } from "../../redux/reducers/reducer.app.jsx";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const app = useSelector((state) => state?.app);
  const theme = useSelector((state) => state?.app?.theme);
  const logo = app?.panel?.telecaller?.logo;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN API
  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/user/login", {
        email: email,
        password: password,
      });
      console.log("Login response: ", data);
      if (data.status) {
        message.success("Login Successfully");
        dispatch(setUserDetails(data));
        const redirectTo = new URLSearchParams(location.search).get("redirect");
        navigate(redirectTo || "/dashboard");
        console.log(
          "Login successful, navigating to",
          redirectTo || "/dashboard",
        );
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // // 🌙 Theme toggle
  // const toggleTheme = () => {
  //   dispatch(setTheme(!theme));
  // };

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${getMediaPath(
          "/media/background/login-bg.svg",
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🌙 Theme Toggle */}
      <Flex align="end" justify="end">
        <ConfigProvider
          theme={{
            algorithm: antdTheme.defaultAlgorithm,
          }}
        >
          <Form style={{ padding: "10px" }}>
            {theme ? (
              <Avatar
                style={{
                  backgroundColor: antdTheme.useToken().token.colorPrimary,
                }}
                icon={<MoonOutlined onClick={toggleTheme} />}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: antdTheme.useToken().token.colorPrimary,
                }}
                // icon={<SunOutlined onClick={toggleTheme} />}
              />
            )}
          </Form>
        </ConfigProvider>
      </Flex>

      {/* 🔐 Login Form */}
      <Flex align="middle" justify="center" style={{ margin: "auto" }}>
        <Row>
          <Col xs={24} sm={24} md={12} xl={10}>
            <Form onFinish={onLogin} layout="vertical" style={{ width: 380 }}>
              <Card>
                {/* Logo */}
                <Flex justify="center">
                  <Image
                    preview={false}
                    src={
                      logo == ""
                        ? getMediaPath("/media/panel/logo-long.png")
                        : getMediaPath(logo)
                    }
                    alt="logo"
                    height={100}
                  />
                </Flex>

                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                {/* Button */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ width: "100%" }}
                  >
                    Login
                  </Button>
                </Form.Item>

                {/* Optional text */}
                <Text type="secondary">
                  Don't have an account? (Add signup later)
                </Text>
              </Card>
            </Form>
          </Col>
        </Row>
      </Flex>
    </Layout>
  );
};

export default Login;
