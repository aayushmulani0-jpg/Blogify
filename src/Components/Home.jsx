
import { Layout, Typography, Button, Space } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#FAF9F6",width:"100%" }}>
      <Header
        style={{
          background: "#FAF9F6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          borderBottom: "1px solid #e2e2e2",
          width:"100%"
        }}
      >
        <Title level={3} style={{ margin: 0, fontWeight: "700", color: "#242424" }}>
          Medium
        </Title>

        <Space size="middle" style={{ fontSize: 14, color: "#8E8E8E" }}>
          <Link href="#our-story" style={{ color: "#8E8E8E" }}>Our story</Link>
          <Link href="#membership" style={{ color: "#8E8E8E" }}>Membership</Link>
          <Link href="#write" style={{ color: "#8E8E8E" }}>Write</Link>
          <Link href="/signup" style={{ color: "#8E8E8E" }}>Sign up</Link>
          <Button
            type="primary"
            style={{
              borderRadius: 20,
              backgroundColor: "#121212",
              borderColor: "#121212",
              fontWeight: 600,
              padding: "0 20px",
              height: 32,
            }}
          >
            Get started
          </Button>
        </Space>
      </Header>

      <Content
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "80px 80px",
          gap: 50,
          width:"100%"
        }}
      >
        {/* Left Text Section */}
        <div style={{ maxWidth: 500 }}>
          <Title
            level={1}
            style={{
              fontWeight: "700",
              lineHeight: 1.1,
              backgroundColor: "#B7B7B7",
              display: "inline-block",
              padding: "0 8px",
              marginBottom: 24,
              color: "#242424",
            }}
          >
            Human
            <br />
            stories & ideas
          </Title>

          <Text
            style={{
              backgroundColor: "#B7B7B7",
              padding: "2px 6px",
              fontSize: 16,
              display: "inline-block",
              maxWidth: 350,
            }}
          >
            A place to read, write, and deepen your understanding
          </Text>

          <br />

          <Button
            type="primary"
            style={{
              marginTop: 24,
              borderRadius: 20,
              padding: "8px 30px",
              backgroundColor: "#121212",
              borderColor: "#121212",
              fontWeight: 600,
            }}
          >
            Start reading
          </Button>
        </div>

        {/* Right Illustration Placeholder */}
        <div style={{ maxWidth: 350, filter: "grayscale(40%)", opacity: 0.5 }}>
          {/* You can replace this SVG with your own illustration */}
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="300" height="300" fill="#B7C8B7" />
            <circle cx="150" cy="150" r="60" fill="#4E7C4E" />
            <path
              d="M110 160 L190 160 L150 100 Z"
              fill="#D9D9D9"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          borderTop: "1px solid #e2e2e2",
          padding: "15px 40px",
          color: "#8E8E8E",
          fontSize: 12,
          display: "flex",
          justifyContent: "center",
          gap: 15,
          flexWrap: "wrap",
          width:"100%"
        }}
      >
        {[
          "Help",
          "Status",
          "About",
          "Careers",
          "Press",
          "Blog",
          "Privacy",
          "Rules",
          "Terms",
          "Text to speech",
        ].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            style={{ color: "#8E8E8E" }}
          >
            {item}
          </Link>
        ))}
      </Footer>
    </Layout>
  );
};

export default Home;