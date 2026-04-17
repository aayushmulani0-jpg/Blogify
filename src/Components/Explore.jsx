import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Layout,
  Pagination,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../utils/axiosInstance";

const { Content } = Layout;
const filters = ["All Posts", "Design", "Technology", "Business", "Culture"];


const Explore = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  console.log("Blogs state updated:", blogs);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);

  const getWordCount = (text = "") =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const getExcerpt = (text = "", limit = 30) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= limit) {
      return text;
    }
    return `${words.slice(0, limit).join(" ")}...`;
  };

  const exploreBlogs = async () => {
    const payload = {
      limit: pageSize,
      page: page,
    };
    try {
      const res = await axiosInstance.post("/getAllUsersBlog", payload);
      console.log("Blogs fetched successfully:", res.data);
      setBlogs(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    setBlogs([]); // Clear blogs before fetching new ones
    exploreBlogs();
  }, [page, pageSize]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0058be",
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <div
        style={{ minHeight: "100vh", background: "#faf8ff", color: "#131b2e" }}
      >
        <Navbar activeKey="blogs" showSearchBar />

        <Content>
          <div
            style={{
              maxWidth: 1240,
              margin: "0 auto",
              padding: "44px 24px 32px",
            }}
          >
            <Row gutter={[32, 32]} align="bottom" justify="space-between">
              <Col xs={24} lg={12}>
                <Space direction="vertical" size={20} style={{ width: "100%" }}>
                  <Typography.Text
                    style={{
                      letterSpacing: 2.2,
                      textTransform: "uppercase",
                      color: "#0058be",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Archive
                  </Typography.Text>

                  <Typography.Title
                    level={1}
                    style={{
                      margin: 0,
                      color: "#131b2e",
                      lineHeight: 1.03,
                      fontWeight: 800,
                      fontSize: 58,
                      letterSpacing: -1.6,
                    }}
                  >
                    Explore Our
                    <br />
                    <span style={{ color: "#0058be" }}>Full Collection.</span>
                  </Typography.Title>

                  <Typography.Paragraph
                    style={{
                      fontSize: 16,
                      color: "#51607a",
                      maxWidth: 430,
                      marginBottom: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    Curated insights on design, technology, and the future of
                    digital experiences. Deep dives into the craft of digital
                    creation.
                  </Typography.Paragraph>
                </Space>
              </Col>

              <Col xs={24} lg={12}>
                <Flex
                  justify="flex-end"
                  wrap
                  gap={10}
                  style={{ paddingBottom: 4 }}
                >
                  {filters.map((filter) => (
                    <Button
                      key={filter}
                      type={filter === "All Posts" ? "primary" : "default"}
                      style={{ borderRadius: 999, minWidth: 94 }}
                    >
                      {filter}
                    </Button>
                  ))}
                </Flex>
              </Col>
            </Row>

            <Row gutter={[24, 28]} style={{ marginTop: 28 }}>
              {blogs?.map((blog) => (
                <Col xs={24} sm={12} lg={8} key={blog.title}>
                  <Card
                    hoverable
                    styles={{ body: { padding: 0 } }}
                    style={{
                      height: "100%",
                      overflow: "hidden",
                      border: "1px solid rgba(118,119,125,0.12)",
                      boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
                      borderRadius: 22,
                    }}
                    cover={
                      <div
                        style={{
                          position: "relative",
                          height: 158,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt={blog?.title}
                          src={blog?.coverImage}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        {/* <Tag
                          style={{
                            position: "absolute",
                            left: 16,
                            bottom: 16,
                            margin: 0,
                            borderRadius: 999,
                            padding: "4px 12px",
                            backdropFilter: "blur(10px)",
                            background: "rgba(255,255,255,0.2)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        >
                          {blog?.category}
                        </Tag> */}
                      </div>
                    }
                  >
                    <div
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      <Typography.Title
                        level={4}
                        style={{
                          margin: 0,
                          lineHeight: 1.35,
                          color: "#131b2e",
                          fontSize: 18,
                        }}
                      >
                        {blog?.title}
                      </Typography.Title>

                      <Typography.Paragraph
                        style={{
                          margin: 0,
                          color: "#64748b",
                          minHeight: 72,
                          lineHeight: 1.62,
                          fontSize: 14,
                        }}
                      >
                        {getExcerpt(blog?.content, 30)}
                      </Typography.Paragraph>

                      {getWordCount(blog?.content) > 30 && (
                        <Button
                          type="primary"
                          style={{
                            width: "fit-content",
                            background: "#4f46e5",
                            borderColor: "#4f46e5",
                          }}
                          onClick={() =>
                            navigate(
                              `/explore/${
                                blog?._id ||
                                String(blog?.title || "blog")
                                  .toLowerCase()
                                  .trim()
                                  .replace(/\s+/g, "-")
                              }`,
                              { state: { blog } },
                            )
                          }
                        >
                          Read more
                        </Button>
                      )}

                      {/* <Divider style={{ margin: "8px 0 0" }} /> */}

                      <Flex align="center" justify="space-between" gap={12}>
                        <Space size={12} align="center">
                          {/* <Avatar
                            style={{ background: blog.accent, fontWeight: 700 }}
                            size={34}
                          >
                            {blog?.initials}
                          </Avatar> */}
                          <Flex wrap gap={6}>
                            {blog?.hashTag?.map((tag, index) => (
                              <Tag color="blue" key={index}>
                                #{tag}
                              </Tag>
                            ))}
                          </Flex>
                          <Typography.Text style={{ color: "#475569" }}>
                            {blog?.author}
                          </Typography.Text>
                        </Space>

                        {/* <Typography.Text style={{ color: "#64748b" }}>
                          {blog?.readTime}
                        </Typography.Text> */}
                      </Flex>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Flex justify="center" style={{ marginTop: 48 }}>
              <Pagination
                current={page}
                total={total}
                pageSize={pageSize}
                showSizeChanger={false}
                // onChange={(newPage, newPageSize) => {
                //   setPage(newPage);
                //   setPageSize(newPageSize);
                // }}
                 onChange={(p) => setPage(p)}
                itemRender={(page, type, originalElement) => {
                  if (type === "prev") {
                    return (
                      <Button shape="circle" icon={<ArrowLeftOutlined />} />
                    );
                  }
                  if (type === "next") {
                    return (
                      <Button shape="circle" icon={<ArrowRightOutlined />} />
                    );
                  }
                  return originalElement;
                }}
              />
            </Flex>
          </div>
        </Content>

        <Footer description="Curating the finest digital experiences and design insights since 2024." />
      </div>
    </ConfigProvider>
  );
};

export default Explore;
