
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
} from "antd";
import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../Utils/axiosInstance";

const { Title, Paragraph } = Typography;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const allBlogs = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/blogs/getAllBlog");
      setBlogs(res.data.data || []);
    } catch {
      message.error("Failed to fetch blogs");
    }
  }, []);

  useEffect(() => {
    allBlogs();
  }, [allBlogs]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCoverImage(null);
    setImagePreview("");
    setEditingBlogId(null);
    setIsModalOpen(false);
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    return formData;
  };

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

  const updateBlog = async () => {
    if (!title || !content) {
      return message.warning("Title & content required");
    }
    try {
      await axiosInstance.patch(
        `/blogs/${editingBlogId}`,
        buildFormData(),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Blog updated");
      resetForm();
      allBlogs();
    } catch {
      message.error("Update failed");
    }
  };

  const deleteBlog = async (id) => {
    const prevBlogs = blogs;
    setBlogs((prev) => prev.filter((b) => b._id !== id));
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      message.success("Deleted");
    } catch {
      setBlogs(prevBlogs); // rollback
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

  const beforeUpload = (file) => {
    const isValid =
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size / 1024 / 1024 < 2;
    if (!isValid) {
      message.error("Only JPG/PNG under 2MB");
    }
    return isValid;
  };

  const handleUpload = (file) => {
    setCoverImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    return false;
  };

  const handleEdit = (blog) => {
    setEditingBlogId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setImagePreview(`http://localhost:8003/${blog.coverImage}`);
    setIsModalOpen(true);
  };

  return (
    <Flex vertical gap={40} style={{ padding: 40 }}>
      <Title style={{ textAlign: "center", margin: 0 }}>
        Trending news
      </Title>

      <Row justify="center">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Blog
        </Button>
      </Row>

      <Row gutter={[24, 24]} justify="center">
        {blogs.map((blog) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={8} key={blog._id}>
            <Card
              hoverable
              style={{ height: 420, borderRadius: 12 }}
              cover={
                <Image
                  src={`http://localhost:8003/${blog.coverImage}`}
                  preview={false}
                  style={{ height: 220, objectFit: "cover" }}
                />
              }
            >
              <Flex vertical gap={12}>
                <Title level={3} style={{ margin: 0 }}>
                  {blog.title}
                </Title>

                <Paragraph ellipsis={{ rows: 3 }}>
                  {blog.content}
                </Paragraph>

                <Button type="primary">
                  Learn more <ArrowRightOutlined />
                </Button>

                <Button onClick={() => handleEdit(blog)}>
                  Edit
                </Button>

                <Button danger onClick={() => deleteBlog(blog._id)}>
                  Delete
                </Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

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
            <Button icon={<UploadOutlined />}>
              Upload Cover Image
            </Button>
          </Upload>

          {imagePreview && (
            <Image
              src={imagePreview}
              alt="preview"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}
        </Flex>
      </Modal>
    </Flex>
  );
};

export default Blog;