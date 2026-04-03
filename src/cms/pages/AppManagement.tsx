// ================= pages/AppManagement.tsx =================
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Grid,
  Space,
  Typography,
  Table,
  Select,
  message,
  Popconfirm,
  Upload,
  Image,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { core_services } from "../../utils/api";

const { useBreakpoint } = Grid;
const { Text } = Typography;

/* ================= PREVIEW COMPONENT ================= */
const BannerPreview = ({ form }: any) => {
  const values: any = Form.useWatch([], form);

  const image =
    values?.image?.[0]?.originFileObj
      ? URL.createObjectURL(values.image[0].originFileObj)
      : null;

  return (
    <div
      style={{
        background: "#0B1C2C",
        borderRadius: 24,
        padding: 16,
        height: "85vh",
        maxWidth: 320,
        margin: "auto",
        color: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center" }}>📱 Live Preview</h3>

      {/* 🔥 TOP BANNER */}
      {values?.type === "banner" && image && (
        <img
          src={image}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      )}

      {/* 🔥 EVENT CARD */}
      <div
        style={{
          background: "#122B44",
          borderRadius: 16,
          padding: 10,
          marginTop: 10,
          position: "relative",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
          style={{ width: "100%", borderRadius: 12 }}
        />

        {/* Sponsored badge */}
        {values?.type === "sponsored_event" && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "#FFD700",
              color: "#000",
              padding: "4px 8px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            Sponsored ⭐
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <Text style={{ color: "#fff", fontWeight: 600 }}>
            Events
          </Text>
        </div>
      </div>

      {/* 🔥 IN-FEED AD */}
      {values?.type === "in_feed_ad" && image && (
        <div style={{ marginTop: 16 }}>
          <img
            src={image}
            style={{
              width: "100%",
              borderRadius: 12,
            }}
          />
        </div>
      )}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
const AppManagement: React.FC = () => {
  const screens = useBreakpoint();
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // FETCH
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await core_services.getAllBanners();
      setBanners(res.banners || []);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // CREATE
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      if (values.link_url) formData.append("link_url", values.link_url);
      if (values.type) formData.append("type", values.type);
      if (values.sort_order)
        formData.append("sort_order", values.sort_order);

      formData.append("is_active", values.is_active ? "1" : "0");

      if (values.image?.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }

      await core_services.createBanner(formData);

      message.success("Banner created");
      form.resetFields();
      fetchBanners();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    await core_services.deleteBanner(id);
    fetchBanners();
  };

  // TOGGLE
  const handleToggle = async (id: string) => {
    await core_services.toggleBanner(id);
    fetchBanners();
  };

  // TABLE
  const columns = [
    {
      title: "Preview",
      render: (_: any, record: any) =>
        record.image_url ? (
          <Image
            src={`${record.image_url}`}
            width={80}
          />
        ) : (
          "No Image"
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Type", dataIndex: "type" },
    {
      title: "Active",
      render: (_: any, record: any) => (
        <Switch
          checked={record.is_active}
          onChange={() => handleToggle(record.id)}
        />
      ),
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete banner?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="App Management">
      <Row gutter={24}>
        {/* LEFT: FORM */}
        <Col xs={24} md={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Link URL" name="link_url">
              <Input />
            </Form.Item>

            <Form.Item name="type" initialValue="banner" label="Type">
              <Select>
                <Select.Option value="banner">Social Banner</Select.Option>
                <Select.Option value="sponsored_event">
                  Sponsored Event
                </Select.Option>
                <Select.Option value="in_feed_ad">
                  In Feed Ad
                </Select.Option>
                <Select.Option value="map_banner">
                  Map Banner
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="sort_order" label="Sort Order">
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="is_active"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch /> Active
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Create Banner
            </Button>
          </Form>
        </Col>

        {/* RIGHT: PREVIEW */}
        <Col xs={24} md={12}>
          <BannerPreview form={form} />
        </Col>
      </Row>

      {/* LIST */}
      <Table
        style={{ marginTop: 30 }}
        rowKey="id"
        dataSource={banners}
        columns={columns}
        loading={loading}
      />
    </Card>
  );
};

export default AppManagement;