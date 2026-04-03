// ================= pages/AppManagement.tsx =================
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Grid,
  Typography,
  Table,
  Select,
  message,
  Popconfirm,
  Upload,
  Image,
  Row,
  Col,
  Tag,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { core_services } from "../../utils/api";

const { useBreakpoint } = Grid;
const { Text } = Typography;

/* ================= PREVIEW ================= */
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

      {/* SOCIAL BANNER */}
      {values?.type === "social_banner" && image && (
        <img
          src={image}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      )}

      {/* EVENT */}
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

      {/* IN FEED */}
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

/* ================= MAIN ================= */
const AppManagement: React.FC = () => {
  const screens = useBreakpoint();
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [form] = Form.useForm();

  /* ================= FETCH ================= */
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await core_services.getAllBanners();

      // 🔥 SORT BY sort_order ASC
      const sorted = (res.banners || []).sort(
        (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
      );

      setBanners(sorted);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ================= CREATE ================= */
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("type", values.type || "social_banner");
      formData.append("sort_order", values.sort_order || "0");
      formData.append("is_active", values.is_active ? "1" : "0");

      if (values.link_url) {
        formData.append("link_url", values.link_url);
      }

      if (values.image?.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }

      await core_services.createBanner(formData);

      message.success("Banner created 🚀");
      form.resetFields();
      fetchBanners();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  /* ================= ACTIONS ================= */
  const handleDelete = async (id: string) => {
    await core_services.deleteBanner(id);
    fetchBanners();
    setSelectedRowKeys((prev) => prev.filter((key) => key !== id));
  };

  const handleDeleteSelected = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("No banners selected for deletion.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        selectedRowKeys.map((key) =>
          core_services.deleteBanner(String(key))
        )
      );
      message.success("Selected banners deleted.");
      setSelectedRowKeys([]);
      fetchBanners();
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const handleToggle = async (id: string) => {
    await core_services.toggleBanner(id);
    fetchBanners();
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Preview",
      render: (_: any, record: any) =>
        record.image_url ? (
          <Image src={record.image_url} width={70} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      ),
      filters: [
        { text: "Social Banner", value: "social_banner" },
        { text: "Sponsored Event", value: "sponsored_event" },
        { text: "In Feed Ad", value: "in_feed_ad" },
        { text: "Map Banner", value: "map_banner" },
      ],
      onFilter: (value: any, record: any) =>
        record.type === value,
    },
    {
      title: "Sort Order",
      dataIndex: "sort_order",
      sorter: (a: any, b: any) =>
        (a.sort_order || 0) - (b.sort_order || 0),
    },
    {
      title: "Status",
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
    <Card title="🚀 App Management">
      <Row gutter={24}>
        {/* FORM */}
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

            <Form.Item
              name="type"
              initialValue="social_banner"
              label="Type"
            >
              <Select>
                <Select.Option value="social_banner">
                  Social Banner
                </Select.Option>
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

            <Button type="primary" htmlType="submit" block>
              Create Banner
            </Button>
          </Form>
        </Col>

        {/* PREVIEW */}
        <Col xs={24} md={12}>
          <BannerPreview form={form} />
        </Col>
      </Row>

      {/* TABLE */}
      <Table
        style={{ marginTop: 30 }}
        rowKey="id"
        rowSelection={rowSelection}
        dataSource={banners}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 6 }}
      />

      {/* SELECTED ACTIONS */}
      <Row style={{ marginTop: 16 }}>
        <Col>
          <Button
            danger
            onClick={handleDeleteSelected}
            disabled={selectedRowKeys.length === 0 || loading}
          >
            Delete Selected
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default AppManagement;