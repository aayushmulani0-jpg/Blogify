import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Space,
  Divider,
  message,
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axiosInstance from "../Utils/axiosInstance";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Contact Form Data:", values);
    try {
      await axiosInstance.post("/contact", values);
      message.success("Message sent successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to send message. Please try again later.");
    }
  }
  
  return (
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "auto" }}>
      <Row gutter={[32, 32]}>
        {/* Contact Info Section */}
        <Col xs={24} lg={10}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={2}>Contact Us</Title>
              <Text type="secondary">
                Have questions or need support? Our team is ready to help you.
              </Text>
            </div>

            <Card bordered>
              <Space align="center">
                <PhoneOutlined style={{ fontSize: 20 }} />
                <div>
                  <Text strong>Phone</Text>
                  <br />
                  <Text type="secondary">+91 6359717897</Text>
                </div>
              </Space>
            </Card>

            <Card bordered>
              <Space align="center">
                <MailOutlined style={{ fontSize: 20 }} />
                <div>
                  <Text strong>Email</Text>
                  <br />
                  <Text type="secondary">parthkoshti3183@gmail.com</Text>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>

        {/* Contact Form Section */}
        <Col xs={24} lg={14}>
          <Card bordered>
            <Title level={4}>Send us a message</Title>
            <Divider />

            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Enter valid email" },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Please enter subject" }]}
              >
                <Input placeholder="Subject" />
              </Form.Item> */}

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter message" }]}
              >
                <TextArea rows={5} placeholder="Write your message..." />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Map Section */}
        <Col span={24}>
          <Card bordered>
            <Title level={4}>Our Location</Title>
            <Divider />
            <iframe
              title="location"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
