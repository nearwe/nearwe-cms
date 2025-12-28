import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Typography,
  Grid,
  Select,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { APP_ROUTE_OPTIONS } from "../../utils/constants";
import { core_services } from "../../utils/api";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const Announcements: React.FC = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await core_services.getUser();
        setUsers(response);
      } catch (e) {
        message.error("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

const columns: ColumnsType<any> = useMemo(
  () => [
    {
      title: "Name",
      dataIndex: "Username",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
            {record.Username
              ?.split(" ")
              ?.map((n: string) => n[0])
              ?.join("")}
          </div>
          <Text>{record.Username}</Text>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Location",
      dataIndex: "Location",
    },
  ],
  []
);


  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const onSubmit = async (values: any) => {
    if (!selectedRowKeys.length) {
      message.warning("Please select at least one user");
      return;
    }

    const payload = {
      userIds: selectedRowKeys as string[],
      title: values.title,
      body: values.body,
      data: {
        route: values.route,
      },
    };

    try {
      setSending(true);
      await core_services.sendPushNotification(payload);
      message.success("Announcement sent successfully");
      form.resetFields();
      setSelectedRowKeys([]);
    } catch (e: any) {
      message.error(e?.message || "Failed to send announcement");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Title level={3} className="mb-4">
        New Announcement
      </Title>

      <Card
        className="mb-6"
        title={
          <div className="flex items-center justify-between">
            <div>
              <Text strong>Select Users</Text>
              <div className="text-xs text-gray-500">
                Choose recipients for this announcement
              </div>
            </div>
            <Input.Search
              placeholder="Search users..."
              style={{ width: 220 }}
              allowClear
            />
          </div>
        }
      >
        <Table
          rowKey="UserId"
          columns={columns}
          dataSource={users}
          loading={loadingUsers}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />


        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span>Showing {users.length} users</span>
        </div>
      </Card>

      <Card
        title={
          <div>
            <Text strong>Content Details</Text>
            <div className="text-xs text-gray-500">
              Fill in the information below to create the notification
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          style={{ maxWidth: screens.md ? 500 : "100%" }}
        >
          <Form.Item
            label="Announcement Title"
            name="title"
            rules={[
              { required: true, message: "Enter title" },
              { max: 20, message: "Title can be maximum 20 characters" },
            ]}
          >
            <Input maxLength={20} showCount />
          </Form.Item>

          <Form.Item
            label="Body Content"
            name="body"
            rules={[
              { required: true, message: "Enter message body" },
              { max: 60, message: "Body can be maximum 60 characters" },
            ]}
          >
            <Input.TextArea rows={4} maxLength={40} showCount />
          </Form.Item>

          <Form.Item
            label="Where should user land?"
            name="route"
            rules={[{ required: true, message: "Select a destination" }]}
          >
            <Select options={APP_ROUTE_OPTIONS} allowClear />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={sending}
            disabled={!selectedRowKeys.length}
          >
            Send Announcement
          </Button>

          {!selectedRowKeys.length && (
            <Text type="secondary" className="block mt-2">
              Select at least one user
            </Text>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Announcements;
