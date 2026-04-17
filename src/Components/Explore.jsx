

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Pagination,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../utils/axiosInstance";

const { Content } = Layout;
const filters = ["All Posts", "Design", "Technology", "Business", "Culture"];

// const posts = [
//   {
//     category: "Technology",
//     title: "The Future of Generative AI in Creative Workflows",
//     description:
//       "How artificial intelligence is reshaping the way designers and developers collaborate on complex digital products.",
//     author: "Julian Wright",
//     initials: "JW",
//     accent: "#6366f1",
//     readTime: "8 min read",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk5E5BNWJ00BKK_bX7mhOscQlaxRD9JVa2TN2nddQKE3YuW_PcmI6pAtVD4g3vqByjp7WLAVziORg_uqSzEAaNvnyyLlMQx2kQlmhpODT7CuSDvzcWAYSN8h7cn1VJNDO4dmlvOJhoq1qzIRvQdy3XawBGAVoIJQ8y8-WbjanWSbWq2sDrQxHJ-5i4_3t89xRAgrlUnM6Zenbgy85_3u_OqAD4_DvSMLWt7EGctx6ii8EW5txkqzE1ybMt5xZOH0jD7tIPBOm_Yamv",
//   },
//   {
//     category: "Design",
//     title: "The Resurgence of Skeuomorphism in Web Apps",
//     description:
//       "Why digital interfaces are slowly returning to tactile, realistic textures and spatial depth after a decade of flat design.",
//     author: "Priya Sharma",
//     initials: "PS",
//     accent: "#14b8a6",
//     readTime: "12 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuD3vwlkm_OYmEzfN2GzJe_-8UihQJeX4HHv9MMHaxktj6i3TpY6JM1SFMO5kie6Lg_HbpJNi3Xp7AbfTjkSC7izAneqETeVjq6y4-mT92JkFCLDpKNkrpIJSSgZq3sgQG0-7GKnnuZbqEgXcQUg1qTh_nY7qabCZ0gDXeBCqcYZn2b1wsd8ShQOZyau6bD9ZzhnIlSRTdIWWBgvtYYJL2clSTiW3JqXIvMkryNHBtfpSIg97IyVvmAaFmOq-NrTuE6W3-FvIU7f1Oq-",
//   },
//   {
//     category: "Culture",
//     title: "Remote First: Building Culture in Distributed Teams",
//     description:
//       "Exploring the psychological frameworks that keep modern teams connected and motivated across different timezones.",
//     author: "Marcus Chen",
//     initials: "MC",
//     accent: "#f59e0b",
//     readTime: "6 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA6kdiSA1t2zb1T2mjx40vz3Ws-NhwX9sL4y3RhKkK3-d9P84JXHson0bq2IePfAUjH3vYEwP1bbX3qLrMZx8ycoi_oSCLZLLzLo2sZSjo16UZjQk8u5TSxiJTFUQurMhQlVkbmNl9uV__wjedWbrEzRKUUojJGyby2iNmN8z0OeQOlj0J_vvoFGapPxw9M6aGDZT0T4fuzY4_EhcXigDdi0zvg5cV2C0RIT4mXkSQTkTTxwIAd8Cod_2GDA4CjImCN-O5n3LHXqV8o",
//   },
//   {
//     category: "Business",
//     title: "Data-Driven Storytelling for Digital Brands",
//     description:
//       "Leveraging analytics not just for conversion, but to craft compelling narratives that resonate with human audiences.",
//     author: "Sarah Lee",
//     initials: "SL",
//     accent: "#e11d48",
//     readTime: "15 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA28PsHiu3POhe35a5ga4YEUY06d6Izt_i15Oh37vX0ijytab_y1aH1voUrlMqiG5xAzQ0K_kFobnl766vAOVW-CPtY4kVlsPDqXql4XShkmLSZVsdxpifNt--IYrESNp_bdoz5VYdn8vgnpOGmhHrYGJjNriixopVs5n_X0o5eXvRaIPWoWRiS0YBZwbrcfrZVVzukGYa647hPoa2kGSbRDJgjmOYSuVv513vz3R9HaKLKuzmL-SolfpNP1XAM8JTC52hTQUok23xn",
//   },
//   {
//     category: "Technology",
//     title: "The New Era of Front-end Architecture",
//     description:
//       "How server-side components and edge computing are changing the performance landscape of the modern web.",
//     author: "Daniel Rivera",
//     initials: "DR",
//     accent: "#3b82f6",
//     readTime: "10 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCZTsPGch1Y5IegVUn0VM4kKaL1Skp0UxCX0ctmsuMEKger1XzTRj5vjjKH9NVt-XC3tzRx9AH49kEEHgYzpEjJ3DMaeBebsMdJyLb7VSMM7j_40HXP4PuWfC_ZQin_cxaqTdwMapOozALBaKP3sRMfB_j70wHE35wt1tNSiHrWeFu6RiXcM17Y1o7dvU3_Yt-aStJgkiLEAii2u4zmghsgn8wVe3adB5w6HurvDU9naqz5G8-0TBgkItre7B4xLJMQqMfMVXyF3__B",
//   },
//   {
//     category: "Culture",
//     title: "The Psychology of Modern Minimalism",
//     description:
//       "Why we are collectively moving towards simpler lifestyles and how that aesthetic translates into our digital worlds.",
//     author: "Sienna Williams",
//     initials: "SW",
//     accent: "#8b5cf6",
//     readTime: "7 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBxvc2OVkkw0z5zOLjdo8tVADlijlPR7FJ3wehqeZ0eq-8EHsu_gHhE1vTWLWVvuVwR7F1I5GrVdtaR7PI6VdP1vbt7CCiS0hlS-JYpfWZT04INoZRVkDaeHCWlpd6KHcG5IxZGdLZfmz7Zowxl4RbBDdAWl-7qtYVBNtNu-nOgYKBgbt1MD43WddeXaeSClX8RCIoTwRMInrm1CRuEMajK7-Iw0s_XMb8bCs1UayKhooGEzlrzywUGBXRAs73oF1aIs9WHMCwdmQOV",
//   }, {
//     category: "Technology",
//     title: "The Future of Generative AI in Creative Workflows",
//     description:
//       "How artificial intelligence is reshaping the way designers and developers collaborate on complex digital products.",
//     author: "Julian Wright",
//     initials: "JW",
//     accent: "#6366f1",
//     readTime: "8 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCk5E5BNWJ00BKK_bX7mhOscQlaxRD9JVa2TN2nddQKE3YuW_PcmI6pAtVD4g3vqByjp7WLAVziORg_uqSzEAaNvnyyLlMQx2kQlmhpODT7CuSDvzcWAYSN8h7cn1VJNDO4dmlvOJhoq1qzIRvQdy3XawBGAVoIJQ8y8-WbjanWSbWq2sDrQxHJ-5i4_3t89xRAgrlUnM6Zenbgy85_3u_OqAD4_DvSMLWt7EGctx6ii8EW5txkqzE1ybMt5xZOH0jD7tIPBOm_Yamv",
//   }, {
//     category: "Technology",
//     title: "The Future of Generative AI in Creative Workflows",
//     description:
//       "How artificial intelligence is reshaping the way designers and developers collaborate on complex digital products.",
//     author: "Julian Wright",
//     initials: "JW",
//     accent: "#6366f1",
//     readTime: "8 min read",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCk5E5BNWJ00BKK_bX7mhOscQlaxRD9JVa2TN2nddQKE3YuW_PcmI6pAtVD4g3vqByjp7WLAVziORg_uqSzEAaNvnyyLlMQx2kQlmhpODT7CuSDvzcWAYSN8h7cn1VJNDO4dmlvOJhoq1qzIRvQdy3XawBGAVoIJQ8y8-WbjanWSbWq2sDrQxHJ-5i4_3t89xRAgrlUnM6Zenbgy85_3u_OqAD4_DvSMLWt7EGctx6ii8EW5txkqzE1ybMt5xZOH0jD7tIPBOm_Yamv",
//   },
// ];

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  console.log("Blogs state updated:", blogs);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const exploreBlogs = async () => {
    const payload = {
      limit: pageSize,
      page: page,
    }
    try {
      const res = await axiosInstance.post("/getAllUsersBlog", payload);
      console.log("Blogs fetched successfully:", res.data);
      setBlogs(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    exploreBlogs();
  }, [page, pageSize])

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
                        {blog?.content}
                      </Typography.Paragraph>

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
                onChange={(newPage, newPageSize) => {
                  setPage(newPage);
                  setPageSize(newPageSize);
                }}
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
