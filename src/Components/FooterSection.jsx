import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Space, Flex } from "antd";
import {
  YoutubeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerLinks = {
  Platform: ["Browse Blogs", "Write a Post", "Categories"],
  Company: ["About Us", "Contact", "Blogify for Teams"],
};

const socialLinks = [
  { icon: <YoutubeOutlined />, key: "youtube" },
  { icon: <InstagramOutlined />, key: "instagram" },
  { icon: <LinkedinOutlined />, key: "linkedin" },
  { icon: <TwitterOutlined />, key: "twitter" },
];

const FooterSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [logoScale, setLogoScale] = useState(1);

  useEffect(() => {
    let grow = true;
    const interval = setInterval(() => {
      setLogoScale(grow ? 1.08 : 1);
      grow = !grow;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Footer style={{ background: "#020617", padding: "80px 24px 40px" }}>
      <Row
        gutter={[48, 40]}
        justify="space-between"
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        {/* Brand Section */}
        <Col xs={24} md={12} lg={9}>
          <Space direction="vertical" size="middle">
            <Flex align="center" gap={12}>
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                  transform: `scale(${logoScale})`,
                  transition: "transform 1.5s ease-in-out",
                }}
              >
                B
              </Flex>

              <Title level={3} style={{ margin: 0, color: "#fff" }}>
                Blogify
              </Title>
            </Flex>

            <Text style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              A clean space for writers and thinkers to share meaningful ideas
              with the world.
            </Text>
          </Space>
        </Col>

        {/* Footer Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <Col xs={24} sm={12} md={6} lg={5} key={section}>
            <Space direction="vertical" size="middle">
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                {section}
              </Title>

              <Space direction="vertical" size="small">
                {links.map((link) => (
                  <Link key={link} href="#" style={{ color: "#94a3b8" }}>
                    {link}
                  </Link>
                ))}
              </Space>
            </Space>
          </Col>
        ))}

        {/* Social Section */}
        <Col xs={24} sm={12} md={6} lg={5}>
          <Space direction="vertical" size="middle">
            <Title level={5} style={{ margin: 0, color: "#fff" }}>
              Follow Us
            </Title>

            <Flex gap={20} wrap="wrap">
              {socialLinks.map((social) => (
                <Text
                  key={social.key}
                  onMouseEnter={() => setHoveredSocial(social.key)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    fontSize: 24,
                    color:
                      hoveredSocial === social.key ? "#ffffff" : "#94a3b8",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </Text>
              ))}
            </Flex>
          </Space>
        </Col>
      </Row>

      {/* Bottom Copyright */}
      <Row
        justify="center"
        style={{
          maxWidth: 1280,
          margin: "50px auto 0",
          borderTop: "1px solid #334155",
          paddingTop: 24,
        }}
      >
        <Col>
          <Text style={{ color: "#94a3b8" }}>
            © 2026 Blogify • All rights reserved | Made with passion for better
            writing
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterSection;