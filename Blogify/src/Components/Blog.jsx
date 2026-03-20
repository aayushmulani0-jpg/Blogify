import React from "react";
import { Card, Typography, Button, Row, Col, Flex, Image } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Grow with Google Play Games Level Up",
      desc: "Optimize your game’s reach, Sidekick testing, and a checklist to secure your benefits.",
      img: "https://picsum.photos/600/350?random=1",
    },
    {
      id: 2,
      title: "Nano Banana 2: high fidelity at low latency",
      desc: "Power the next generation of visual apps with the best price-performance image model from Google.",
      img: "https://picsum.photos/600/350?random=2",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
    {
      id: 3,
      title: "Build with Gemini 3.1 Pro",
      desc: "Optimized for complex instruction-following and efficient multi-step workflows.",
      img: "https://picsum.photos/600/350?random=3",
    },
  ];

  return (
    <Flex vertical gap={40} style={{ padding: 40 }}>
      <Title style={{ textAlign: "center", margin: 0 }}>Trending news</Title>

      <Row gutter={[24, 24]} justify="center">
        {blogs.map((blog) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={8} key={blog.id}>
            <Card
              hoverable
              style={{
                height: 420,
                borderRadius: 12,
                overflow: "hidden",
              }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 200,
              }}
              cover={
                <Image
                  src={blog.img}
                  preview={false}
                  style={{
                    height: 220,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              }
            >
              <Flex vertical gap={12}>
                <Title
                  level={3}
                  style={{
                    margin: 0,
                    color: "#1967d2",
                    fontWeight: 500,
                  }}
                >
                  {blog.title}
                </Title>

                <Paragraph
                  ellipsis={{ rows: 3 }}
                  style={{
                    margin: 0,
                    color: "#444",
                  }}
                >
                  {blog.desc}
                </Paragraph>

                <Button
                  type="primary"
                  style={{
                    width: 120,
                    borderRadius: 6,
                  }}
                >
                  Learn more <ArrowRightOutlined />
                </Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default Blog;
