import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Navbar from "./Navbar";
import Footer from "./Footer";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const contactDetails = [
  {
    icon: <MailOutlined />,
    label: "Email us",
    value: "hello@blogify.com",
    hint: "Replies within one business day",
  },
  {
    icon: <EnvironmentOutlined />,
    label: "Visit us",
    value: "123 Creator Blvd, Austin TX",
    hint: "Visits by appointment only",
  },
];

const officeImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD9xduHAYOZ1Q-cQOIWUR5hB4MynafUewNaOH0gNTvx8sI2b_CRPcVMZwtiRwATTAk2NxlSQ9SFrICs1GX7B9IBxNxDZGRA6IUY3DIqE4lPdbzLwybxy0ckyLewcXw9Y6NtZPibuB3ZttvtCDnrJy6zTtbcZcv_VucrxXibZ5sZg900mNEkNuAu82uiG-HqX0RDKMNxD03b4lLjFtga6IqZPPnISWafI0Jxwp8mHi3704kACbTrZ-jaBjP1lHLIM7FjTxHTpT2YC1hd";

const ContactHome = () => {
  const handleSubmit = (values) => {
    console.log("Contact Home Submission:", values);
  };

  return (
    <Layout>
      <Navbar activeKey="contact" showAuthButtons />

      <Content>
        <Row justify="center">
          <Col xs={24} xl={18}>
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%", padding: "48px 0 24px" }}
            >
              <Space
                direction="vertical"
                size={10}
                align="center"
                style={{ width: "100%" }}
              >
                <Tag color="blue">Contact Blogify</Tag>
                <Title level={1} style={{ marginBottom: 0 }}>
                  Get in Touch
                </Title>
                <Paragraph
                  style={{
                    maxWidth: 700,
                    textAlign: "center",
                    marginBottom: 0,
                  }}
                >
                  Have a question or a story to share? We&apos;re here to
                  listen. Reach out and let&apos;s start a conversation that
                  matters.
                </Paragraph>
              </Space>

              <Row gutter={[32, 32]} align="top">
                <Col xs={24} lg={11}>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Card
                      bordered={false}
                      styles={{ body: { padding: 0 } }}
                      cover={<img src={officeImage} alt="Office context" />}
                    >
                      <Card
                        bordered={false}
                        styles={{
                          body: {
                            background: "#111827",
                            color: "#ffffff",
                            borderRadius: 8,
                          },
                        }}
                      >
                        <Title
                          level={4}
                          style={{ color: "#ffffff", marginTop: 0 }}
                        >
                          "Communication is the heart of every great community."
                        </Title>
                        <Text style={{ color: "#d1d5db" }}>
                          We read every message and route it to the right team.
                        </Text>
                      </Card>
                    </Card>

                    <List
                      itemLayout="horizontal"
                      dataSource={contactDetails}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar shape="square" icon={item.icon} />}
                            title={item.label}
                            description={
                              <Space direction="vertical" size={0}>
                                <Text strong>{item.value}</Text>
                                <Text type="secondary">{item.hint}</Text>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Space>
                </Col>

                <Col xs={24} lg={13}>
                  <Card
                    bordered={false}
                    title="Send us a message"
                    extra={
                      <Tag color="green">
                        Typical reply within one business day
                      </Tag>
                    }
                  >
                    <Form
                      layout="vertical"
                      onFinish={handleSubmit}
                      requiredMark={false}
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="NAME"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your name",
                              },
                            ]}
                          >
                            <Input placeholder="Jane Doe" size="large" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="EMAIL"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email",
                              },
                              {
                                type: "email",
                                message: "Enter a valid email address",
                              },
                            ]}
                          >
                            <Input
                              placeholder="jane@example.com"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label="SEND MESSAGE"
                        name="message"
                        rules={[
                          {
                            required: true,
                            message: "Please write your message",
                          },
                        ]}
                      >
                        <TextArea
                          rows={8}
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </Form.Item>

                      <Divider />

                      <Space direction="vertical" size="middle">
                        <Text type="secondary">
                          Typical response time is within one business day.
                        </Text>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          icon={<SendOutlined />}
                        >
                          Send Message
                        </Button>
                      </Space>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default ContactHome;
