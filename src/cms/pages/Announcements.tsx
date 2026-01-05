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
  const [searchText, setSearchText] = useState("");

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await core_services.getUser();
      setUsers(response || []);
    } catch {
      message.error("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredUsers = useMemo(() => {
    let data = users;

    // search
    if (searchText) {
      data = data.filter((u) =>
        [u.Username, u.Email, u.Location]
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // sort: notification enabled users first
    return [...data].sort((a, b) => {
      const aEnabled = a.pushToken && a.pushToken.length > 0 ? 1 : 0;
      const bEnabled = b.pushToken && b.pushToken.length > 0 ? 1 : 0;
      return bEnabled - aEnabled;
    });
  }, [users, searchText]);


  // ---------------- TABLE COLUMNS ----------------
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "Username",
        render: (_: any, record: any) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
              {record.Username?.split(" ")
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
        title: "Notifications",
        dataIndex: "pushToken",
        render: (pushToken: string | null) =>
          pushToken && pushToken.length > 0 ? (
            <Text style={{ color: "#16a34a", fontWeight: 600 }}>YES</Text>
          ) : (
            <Text style={{ color: "#dc2626" }}>NO</Text>
          ),
      },

    ],
    []
  );

  // ---------------- ROW SELECTION ----------------
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  // ---------------- SUBMIT ANNOUNCEMENT ----------------
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

      {/* ---------------- USERS SELECTION ---------------- */}
      <Card
        className="mb-6"
        title={
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <Text strong>Select Users</Text>
              <div className="text-xs text-gray-500">
                Choose recipients for this announcement
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={fetchUsers} loading={loadingUsers}>
                Refresh
              </Button>

              <Input
                placeholder="Search users..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 220 }}
              />
            </div>
          </div>
        }
      >
        <Table
          rowKey="UserId"
          columns={columns}
          dataSource={filteredUsers}
          loading={loadingUsers}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />

        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span>Showing {filteredUsers.length} users</span>
          <span>{selectedRowKeys.length} selected</span>
        </div>
      </Card>

      {/* ---------------- ANNOUNCEMENT CONTENT ---------------- */}
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
              { max: 300, message: "Body can be maximum 300 characters" },
            ]}
          >
            <Input.TextArea rows={4} maxLength={60} showCount />
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
