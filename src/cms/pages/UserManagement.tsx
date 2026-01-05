import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Table,
  Button,
  Grid,
  List,
  Typography,
  Space,
  message,
  Tag,
  Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  UserOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { core_services } from "../../utils/api";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const UserManagement: React.FC = () => {
  const screens = useBreakpoint();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await core_services.getUser();
      setUsers(response || []);
    } catch {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let data = users;

    // search filter
    if (searchText) {
      data = data.filter((u) =>
        [u.Username, u.Email, u.Location]
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    // sort: push enabled first
    return [...data].sort((a, b) => {
      const aEnabled = a.pushToken && a.pushToken.length > 0 ? 1 : 0;
      const bEnabled = b.pushToken && b.pushToken.length > 0 ? 1 : 0;
      return bEnabled - aEnabled;
    });
  }, [users, searchText]);

  // ---------------- ACTION ----------------
  const toggleBlock = (userId: string) => {
    message.info(`Block / Unblock clicked for ${userId}`);
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "User",
        render: (_: any, record: any) => (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserOutlined />
            </div>
            <div>
              <Text strong>{record.Username}</Text>
              <div className="text-xs text-gray-500">{record.Email}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Location",
        dataIndex: "Location",
      },
      {
        title: "Notifications",
        dataIndex: "pushToken",
        render: (pushToken: string | null) =>
          pushToken && pushToken.length > 0 ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          ),
      },

      {
        title: "Status",
        render: () => <Tag color="green">Active</Tag>,
      },
      {
        title: "Action",
        render: (_: any, record: any) => (
          <Button
            size="small"
            danger
            icon={<StopOutlined />}
            onClick={() => toggleBlock(record.UserId)}
          >
            Block
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Card
      title="User Management"
      extra={
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button onClick={fetchUsers} loading={loading}>
            Refresh
          </Button>

          <Input
            placeholder="Search users..."
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />

          <Button type="primary" block={!screens.md}>
            Add User
          </Button>
        </div>
      }
    >
      {screens.md ? (
        <Table
          rowKey="UserId"
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      ) : (
        <List
          dataSource={filteredUsers}
          loading={loading}
          renderItem={(user: any) => (
            <Card key={user.UserId} style={{ marginBottom: 12 }}>
              <Space direction="vertical" size={6} style={{ width: "100%" }}>
                <Space>
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <UserOutlined />
                  </div>
                  <div>
                    <Text strong>{user.Username}</Text>
                    <div className="text-xs text-gray-500">{user.Email}</div>
                  </div>
                </Space>

                <Text>
                  <Text strong>Location:</Text> {user.Location}
                </Text>

                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Active
                </Tag>

                <Button
                  danger
                  icon={<StopOutlined />}
                  onClick={() => toggleBlock(user.UserId)}
                >
                  Block
                </Button>
              </Space>
            </Card>
          )}
        />
      )}

      <div className="text-xs text-gray-500 mt-3">
        Showing {filteredUsers.length} users
      </div>
    </Card>
  );
};

export default UserManagement;
