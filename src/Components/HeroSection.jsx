import React, { useState } from "react";
import { Row, Col, Typography, Button, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const HeroSection = () => {
  const [exploreHover, setExploreHover] = useState(false);
  const [writeHover, setWriteHover] = useState(false);

  const handleExplore = () => {
    const section = document.getElementById("trending");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)", color: "#ffffff", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <Row gutter={[80, 40]} align="middle">
          <Col xs={24} md={12}>
            <Title style={{ fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.1, marginBottom: 24, color: "#ffffff" }}>
              Tune in to <span style={{ color: "#93c5fd" }}>Blogify</span>
            </Title>
            <Paragraph style={{ fontSize: "1.25rem", color: "#bfdbfe", marginBottom: 40 }}>
              Join us for fresh ideas, deep dives, and stories that matter.
            </Paragraph>
            <Space size={16} wrap>
              <Button onClick={handleExplore} onMouseEnter={() => setExploreHover(true)} onMouseLeave={() => setExploreHover(false)} style={{ padding: "16px 32px", height: "auto", fontSize: "1.1rem", fontWeight: 600, borderRadius: 16, background: exploreHover ? "#fde047" : "#ffffff", color: exploreHover ? "#1e3a8a" : "#1e40af", border: "none", transition: "all 0.3s ease" }}>
                Explore Latest
              </Button>
              <Button onClick={() => alert("Writing feature coming soon!")} onMouseEnter={() => setWriteHover(true)} onMouseLeave={() => setWriteHover(false)} style={{ padding: "16px 32px", height: "auto", fontSize: "1.1rem", fontWeight: 600, borderRadius: 16, background: writeHover ? "rgba(255,255,255,0.1)" : "transparent", color: "#ffffff", border: "2px solid rgba(255,255,255,0.7)", transition: "all 0.3s ease" }}>
                Start Writing →
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <div style={{ background: "rgba(0,0,0,0.9)", borderRadius: 24, padding: "60px 40px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "4rem", display: "flex", gap: 30, justifyContent: "center", marginBottom: 30, flexWrap: "wrap" }}>
                <span>📝</span><span>🌐</span><span>✨</span><span>🚀</span>
              </div>
              <Text style={{ color: "#cbd5e1", fontSize: 14, letterSpacing: 3 }}>WHERE IDEAS COME TO LIFE</Text>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection;