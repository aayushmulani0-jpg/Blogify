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

import { useNavigate } from "react-router";
import { getMediaPath } from "../Utils/getMediaPath.jsx";
import { setUserDetails } from "../Redux/reducer.user.jsx";
import axiosInstance from "../Utils/axiosInstance.jsx";
// import { setUserDetails } from "../../redux/reducers/reducer.user.jsx";
// import { setTheme } from "../../redux/reducers/reducer.app.jsx";

const { Text } = Typography;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const app = useSelector((state) => state?.app);
  const theme = useSelector((state) => state?.app?.theme);
  const logo = app?.panel?.telecaller?.logo;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Signup details: ", { userName, email, password });

      const { data } = await axiosInstance.post("/user/signup", {
        userName: userName,
        email: email,
        password: password,
      });
      console.log("Signup response: ", data);
      if (data.status) {
        message.success("Signup Successfully");
        // dispatch(setUserDetails(...data, { data: data.data }));
        dispatch(setUserDetails({ ...data, data: data.data }));
        navigate("/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🌙 Theme toggle
  const toggleTheme = () => {
    dispatch(setTheme(!theme));
  };

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
                icon={<SunOutlined onClick={toggleTheme} />}
              />
            )}
          </Form>
        </ConfigProvider>
      </Flex>

      {/* 📝 Signup Form */}
      <Flex align="middle" justify="center" style={{ margin: "auto" }}>
        <Row>
          <Col xs={24} sm={24} md={12} xl={10}>
            <Form onFinish={onSignup} layout="vertical" style={{ width: 380 }}>
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

                {/* Username */}
                <Form.Item
                  label="Username"
                  name="userName"
                  rules={[{ required: true, message: "Please enter username" }]}
                >
                  <Input
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Item>

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
                  rules={[
                    { required: true, message: "Please enter password" },
                    { min: 4, message: "Minimum 4 characters" },
                  ]}
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
                    Signup
                  </Button>
                </Form.Item>

                {/* Redirect */}
                <Text type="secondary">
                  Already have an account?{" "}
                  <a onClick={() => navigate("/login")}>Login</a>
                </Text>
              </Card>
            </Form>
          </Col>
        </Row>
      </Flex>
    </Layout>
  );
};

export default Signup;
