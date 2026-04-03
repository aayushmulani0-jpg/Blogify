import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import BlogCard from "./BlogCard";

const { Title, Paragraph, Text } = Typography;

const blogs = [
  { id: 1, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", category: "Artificial Intelligence", title: "The Rise of Agentic AI in 2026", description: "How autonomous AI agents are transforming the way we work, create, and build the future.", author: "Akshay Patel", authorInitials: "AP", avatarColor: "#6366f1", readTime: "9 min read" },
  { id: 2, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", category: "Web Design", title: "Modern Web Design Trends 2026", description: "Calm interfaces, AI personalization, and the new era of thoughtful digital experiences.", author: "Priya Sharma", authorInitials: "PS", avatarColor: "#14b8a6", readTime: "12 min read" },
  { id: 3, image: "https://images.unsplash.com/photo-1504384764586-2d5c2b4f6f0d", category: "Entrepreneurship", title: "Building Scalable SaaS in 2026", description: "Practical lessons from founders who successfully scaled from zero to millions.", author: "Rahul Verma", authorInitials: "RV", avatarColor: "#f59e0b", readTime: "7 min read" },
  { id: 4, image: "https://images.unsplash.com/photo-1481627834876-b7833a8f5a0c", category: "Personal Growth", title: "The Power of Daily Writing", description: "How showing up every day with the pen transformed my clarity and career.", author: "Neha Gupta", authorInitials: "NG", avatarColor: "#e11d48", readTime: "6 min read" }
];

const TrendingSection = () => {
  const [exploreHover, setExploreHover] = useState(false);

  return (
    <div id="trending" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
      <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 60 }}>
        <Col>
          <Title style={{ fontSize: "2.8rem", fontWeight: 700, margin: 0 }}>Trending Now</Title>
          <Paragraph style={{ color: "#64748b", marginTop: 8, marginBottom: 0 }}>Stories that are making an impact this week</Paragraph>
        </Col>
        <Col>
          <Text onMouseEnter={() => setExploreHover(true)} onMouseLeave={() => setExploreHover(false)} style={{ color: "#2563eb", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease", opacity: exploreHover ? 0.8 : 1 }}>
            Explore all →
          </Text>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        {blogs.map((blog) => (
          <Col xs={24} md={12} key={blog.id}>
            <BlogCard blog={blog} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TrendingSection;