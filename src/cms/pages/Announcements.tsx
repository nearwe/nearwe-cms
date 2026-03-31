import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Grid,
  Select,
  message,
  Spin,
} from "antd";
import { APP_ROUTE_OPTIONS } from "../../utils/constants";
import { core_services } from "../../utils/api";
import logo from "../../assets/images/logo2.png";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const Announcements: React.FC = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [titlePreview, setTitlePreview] = useState("");
  const [bodyPreview, setBodyPreview] = useState("");

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await core_services.getUser();

      const filtered = (response || []).filter(
        (u: any) => u.pushToken && u.pushToken.length > 0
      );

      setUsers(filtered);
    } catch {
      message.error("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- FILTER ----------------
  const filteredUsers = useMemo(() => {
    let data = users;

    if (searchText) {
      data = data.filter((u) =>
        [u.Username, u.Email]
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    return data;
  }, [users, searchText]);

  // ---------------- SELECT ----------------
  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.UserId));
    }
  };

  // ---------------- SUBMIT ----------------
  const onSubmit = async (values: any) => {
    if (!selectedUsers.length) {
      message.warning("Select at least one user");
      return;
    }

    const payload = {
      userIds: selectedUsers,
      title: values.title,
      body: values.body,
      data: { route: values.route },
    };

    try {
      setSending(true);
      await core_services.sendPushNotification(payload);
      message.success("Sent successfully");
      form.resetFields();
      setSelectedUsers([]);
      setTitlePreview("");
      setBodyPreview("");
    } catch (e: any) {
      message.error(e?.message || "Failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-2 md:p-4">
      <Title level={3}>New Announcement</Title>

      {/* ---------------- USERS GRID ---------------- */}
      <Card
        className="mb-6"
        title={
          <div className="flex flex-col md:flex-row gap-2 md:justify-between">
            <Text strong>Select Users</Text>

            <div className="flex gap-2">
              <Button onClick={handleSelectAll}>
                {selectedUsers.length === filteredUsers.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>

              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 180 }}
              />
            </div>
          </div>
        }
      >
        {loadingUsers ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <div
            className="
              grid gap-3
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              lg:grid-cols-5
            "
          >
            {filteredUsers.map((user) => {
              const isSelected = selectedUsers.includes(user.UserId);

              return (
                <div
                  key={user.UserId}
                  onClick={() => toggleUser(user.UserId)}
                  className={`cursor-pointer p-3 rounded-2xl border transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 scale-[1.02]"
                        : "border-gray-200 hover:shadow"
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                      {user.ProfileImageUrl ? (
                        <img
                          src={user.ProfileImageUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-700 font-semibold text-lg">
                          {user.Username?.[0]}
                        </span>
                      )}
                    </div>

                    <Text strong className="text-sm">
                      {user.Username}
                    </Text>

                    <Text className="text-xs text-gray-500 truncate w-full">
                      {user.Email}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-3">
          {selectedUsers.length} / {filteredUsers.length} selected
        </div>
      </Card>

      {/* ---------------- FORM + PREVIEW ---------------- */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          {/* Preview */}
          <div className="bg-black text-white rounded-2xl p-4 mb-4 shadow">
            <div className="flex items-center gap-3">
              <img src={logo} className="w-10 h-10 rounded-xl" />

              <div>
                <div className="text-sm font-semibold">Nearwe</div>
                <div className="text-xs text-gray-300">now</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-semibold">
                {titlePreview || "Title preview"}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {bodyPreview || "Message preview"}
              </div>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input
                placeholder="Enter title"
                onChange={(e) => setTitlePreview(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="body" label="Message" rules={[{ required: true }]}>
              <Input.TextArea
                rows={4}
                placeholder="Enter message"
                onChange={(e) => setBodyPreview(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="route" label="Route" rules={[{ required: true }]}>
              <Select options={APP_ROUTE_OPTIONS} />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={sending}
              disabled={!selectedUsers.length}
              block
            >
              Send Announcement
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Announcements;