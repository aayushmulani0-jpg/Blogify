import React, { useState } from "react";
import { Card, Typography, Avatar, Tag, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card bordered={false} styles={{ body: { padding: 0 } }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ borderRadius: 24, overflow: "hidden", boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)", transform: isHovered ? "translateY(-15px)" : "translateY(0px)", transition: "all 0.4s ease" }}>
      <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
        <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.7s ease" }} />
        <Tag style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", color: "#ffffff", padding: "6px 16px", borderRadius: 9999, fontSize: "0.85rem", border: "1px solid rgba(255,255,255,0.3)", margin: 0 }}>
          {blog.category}
        </Tag>
      </div>

      <div style={{ padding: 32 }}>
        <Title level={3} style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>{blog.title}</Title>
        <Paragraph style={{ color: "#64748b", marginBottom: 32, fontSize: "1rem", lineHeight: 1.6 }}>{blog.description}</Paragraph>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Space size={12} align="center">
            <Avatar style={{ width: 32, height: 32, background: blog.avatarColor, color: "#ffffff", fontSize: "0.9rem", fontWeight: 700 }}>{blog.authorInitials}</Avatar>
            <Text style={{ color: "#64748b", fontSize: "0.95rem" }}>{blog.author}</Text>
          </Space>
          <Text style={{ color: "#64748b", fontSize: "0.95rem" }}>{blog.readTime}</Text>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;