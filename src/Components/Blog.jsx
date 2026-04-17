import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Flex,
  Image,
  message,
  Modal,
  Input,
  Upload,
  Tag,
  Select,
  Divider,
} from "antd";
import {
  ArrowRightOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";

const { Title, Paragraph } = Typography;

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [hashTag, setHashTag] = useState([]);

  const BASE_URL = "http://localhost:8003/"; // 🔁 change if needed

  const getBlogImage = (blog) => {
    if (!blog?.coverImage) return "";
    return blog.coverImage.startsWith("http")
      ? blog.coverImage
      : BASE_URL + blog.coverImage;
  };

  // ✅ Fetch blogs
  const allBlogs = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/blogs/getAllBlog");

      const formattedBlogs = (res.data.data || []).map((blog) => ({
        ...blog,
        hashTag:
          typeof blog.hashTag === "string"
            ? blog.hashTag.split(",")
            : blog.hashTag || [],
      }));

      setBlogs(formattedBlogs);
    } catch {
      message.error("Failed to fetch blogs");
    }
  }, []);

  useEffect(() => {
    allBlogs();
  }, [allBlogs]);

  // ✅ Reset form
  const resetForm = () => {
    setTitle("");
    setContent("");
    setCoverImage(null);
    setImagePreview("");
    setEditingBlogId(null);
    setHashTag([]);
    setIsModalOpen(false);
  };

  // ✅ Build form data
  const buildFormData = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 🔥 Important fix
    formData.append("hashTag", JSON.stringify(hashTag));

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    return formData;
  };

  // ✅ Create
  const createBlog = async () => {
    if (!title || !content || !coverImage) {
      return message.warning("All fields required");
    }

    try {
      await axiosInstance.post("/blogs", buildFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Blog created");
      resetForm();
      allBlogs();
    } catch {
      message.error("Create failed");
    }
  };

  // ✅ Update
  const updateBlog = async () => {
    if (!title || !content) {
      return message.warning("Title & content required");
    }

    try {
      await axiosInstance.patch(`/blogs/${editingBlogId}`, buildFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Blog updated");
      resetForm();
      allBlogs();
    } catch {
      message.error("Update failed");
    }
  };

  // ✅ Delete
  const deleteBlog = async (id) => {
    const prevBlogs = blogs;

    setBlogs((prev) => prev.filter((b) => b._id !== id));

    try {
      await axiosInstance.delete(`/blogs/${id}`);
      message.success("Deleted");
    } catch {
      setBlogs(prevBlogs);
      message.error("Delete failed");
    }
  };

  const handleOk = async () => {
    if (editingBlogId) {
      await updateBlog();
    } else {
      await createBlog();
    }
  };

  // ✅ Upload validation
  const beforeUpload = (file) => {
    const isValid =
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size / 1024 / 1024 < 2;

    if (!isValid) {
      message.error("Only JPG/PNG under 2MB");
    }

    return isValid;
  };

  // ✅ Handle upload
  const handleUpload = (file) => {
    setCoverImage(file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    return false;
  };

  // ✅ Edit blog
  const handleEdit = (blog) => {
    setEditingBlogId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setHashTag(blog.hashTag || []);

    setImagePreview(
      blog.coverImage?.startsWith("http")
        ? blog.coverImage
        : BASE_URL + blog.coverImage,
    );

    setIsModalOpen(true);
  };

  return (
    <Flex
      vertical
      gap={28}
      style={{
        padding: "28px 24px 36px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <Card
        bordered={false}
        style={{ borderRadius: 18, background: "#f8fafc" }}
        styles={{ body: { padding: "22px 24px" } }}
      >
        <Flex align="center" justify="space-between" wrap gap={16}>
          <Flex vertical gap={6}>
            <Title level={2} style={{ margin: 0 }}>
              Blog Studio
            </Title>
            <Typography.Text type="secondary">
              Create, edit, and manage your stories in one place.
            </Typography.Text>
          </Flex>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ background: "#4f46e5", borderColor: "#4f46e5" }}
          >
            Create Blog
          </Button>
        </Flex>
      </Card>

      <Row gutter={[20, 20]}>
        {blogs.map((blog) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={8} key={blog._id}>
            <Card
              hoverable
              style={{ borderRadius: 16, height: "100%" }}
              styles={{ body: { padding: 16 } }}
              cover={
                <Image
                  src={getBlogImage(blog)}
                  preview={false}
                  style={{ height: 210, objectFit: "cover" }}
                />
              }
            >
              <Flex vertical gap={12} style={{ height: "100%" }}>
                <Title level={4} style={{ margin: 0 }}>
                  {blog.title}
                </Title>

                <Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0 }}>
                  {blog.content}
                </Paragraph>

                <Flex wrap gap={6}>
                  {blog.hashTag?.map((tag, index) => (
                    <Tag color="blue" key={index}>
                      #{tag}
                    </Tag>
                  ))}
                </Flex>

                <Divider style={{ margin: "2px 0 0" }} />

                <Flex wrap gap={10}>
                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    style={{ background: "#4f46e5", borderColor: "#4f46e5" }}
                    onClick={() =>
                      navigate(`/explore/${blog._id}`, { state: { blog } })
                    }
                  >
                    Open
                  </Button>

                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Modal */}
      <Modal
        title={editingBlogId ? "Edit Blog" : "Create Blog"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={resetForm}
        okButtonProps={{
          disabled: !title || !content || (!editingBlogId && !coverImage),
        }}
      >
        <Flex vertical gap={16}>
          <Input
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 🔥 Better hashtag input */}
          <Select
            mode="tags"
            placeholder="Enter hashtags"
            value={hashTag}
            onChange={setHashTag}
            style={{ width: "100%" }}
          />

          <Input.TextArea
            rows={4}
            placeholder="Enter blog description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Upload
            beforeUpload={(file) => {
              if (beforeUpload(file)) handleUpload(file);
              return false;
            }}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
          </Upload>

          {imagePreview && (
            <Image
              src={imagePreview}
              alt="preview"
              style={
                editingBlogId
                  ? {
                      width: 400,
                      height: 400,
                      objectFit: "cover",
                      borderRadius: 8,
                      display: "block",
                      margin: "0 auto",
                    }
                  : { width: "100%", borderRadius: 8 }
              }
            />
          )}
        </Flex>
      </Modal>
    </Flex>
  );
};

export default Blog;
