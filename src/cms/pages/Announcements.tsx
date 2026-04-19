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

  // Only the notification preview card has this toggle
  const [notifDark, setNotifDark] = useState(true);

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

  // Colors that apply ONLY to the notification preview card
  const notif = {
    bg: notifDark ? "#111111" : "#f2f2f7",
    border: notifDark ? "#2a2a2a" : "#d1d1d6",
    appName: notifDark ? "#ffffff" : "#000000",
    timeColor: notifDark ? "#888888" : "#8e8e93",
    titleColor: notifDark ? "#ffffff" : "#000000",
    bodyColor: notifDark ? "#bbbbbb" : "#3c3c43",
    divider: notifDark ? "#2a2a2a" : "#d1d1d6",
  };

  const inlineInputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
    padding: 0,
    caretColor: "#3b82f6",
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
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
                          alt={user.Username}
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
        <Card>

          {/* ===== NOTIFICATION PREVIEW CARD — has its own dark/light toggle ===== */}
          <div
            style={{
              background: notif.bg,
              borderRadius: 18,
              padding: "14px 16px",
              marginBottom: 16,
              border: `1px solid ${notif.border}`,
              transition: "background 0.25s, border-color 0.25s",
            }}
          >
            {/* Header row: app info + toggle button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              {/* App info */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={logo}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                  alt="logo"
                />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: notif.appName,
                      transition: "color 0.25s",
                    }}
                  >
                    Nearwe
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: notif.timeColor,
                      transition: "color 0.25s",
                    }}
                  >
                    now
                  </div>
                </div>
              </div>

              {/* Toggle — ONLY for this notification card */}
              <button
                onClick={() => setNotifDark(!notifDark)}
                title={notifDark ? "Switch to light preview" : "Switch to dark preview"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: notifDark ? "#1c1c1e" : "#e5e5ea",
                  border: `1px solid ${notif.border}`,
                  borderRadius: 999,
                  padding: "4px 10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* Sun icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={notifDark ? "#555555" : "#f59e0b"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>

                {/* Sliding track */}
                <div
                  style={{
                    width: 30,
                    height: 17,
                    borderRadius: 999,
                    background: notifDark ? "#3b82f6" : "#c7c7cc",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: "#ffffff",
                      position: "absolute",
                      top: 3,
                      left: notifDark ? 15 : 3,
                      transition: "left 0.2s",
                    }}
                  />
                </div>

                {/* Moon icon */}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill={notifDark ? "#a78bfa" : "none"}
                  stroke={notifDark ? "#a78bfa" : "#aaaaaa"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>

            {/* Inline title input */}
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Title required" }]}
              style={{ margin: 0, marginBottom: 6 }}
            >
              <Input
                placeholder="Title preview..."
                onChange={(e) => setTitlePreview(e.target.value)}
                style={{
                  ...inlineInputStyle,
                  fontWeight: 600,
                  fontSize: 15,
                  color: notif.titleColor,
                }}
              />
            </Form.Item>

            {/* Thin divider */}
            <div
              style={{
                height: 1,
                background: notif.divider,
                margin: "4px 0 8px",
                transition: "background 0.25s",
              }}
            />

            {/* Inline message input */}
            <Form.Item
              name="body"
              rules={[{ required: true, message: "Message required" }]}
              style={{ margin: 0 }}
            >
              <Input.TextArea
                placeholder="Message preview..."
                autoSize={{ minRows: 2 }}
                onChange={(e) => setBodyPreview(e.target.value)}
                style={{
                  ...inlineInputStyle,
                  fontSize: 13,
                  color: notif.bodyColor,
                  resize: "none",
                }}
              />
            </Form.Item>
          </div>
          {/* ===== END NOTIFICATION CARD ===== */}

          {/* Route and submit — completely normal, unchanged */}
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
        </Card>
      </div>
    </div>
  );
};

export default Announcements;