import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  MailOutlined,
  ReloadOutlined,
  StarOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Progress,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { core_services } from "../../utils/api";

const { Title, Text } = Typography;

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserInterest {
  categoryId: number;
  categoryName: string;
  categoryDesc: string;
  joinCount: number;
}

interface UserStats {
  eventsHosted: number;
  eventsJoined: number;
  totalPosts: number;
  totalReportsFiled: number;
}

interface UserDetail {
  userId: string;
  username: string;
  email: string;
  avatar: string | null;
  location: string;
  accountStatus: number;
  stats: UserStats;
  interests: UserInterest[];
}

interface Report {
  reportId: string;
  contentType: string;
  contentId: string;
  reason: string;
  reportStatus: number;
  reportedAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCOUNT_STATUS_MAP: Record<number, { label: string; color: string }> = {
  0: { label: "Active", color: "green" },
  1: { label: "Restricted (No Events)", color: "orange" },
  2: { label: "Restricted (No Join)", color: "gold" },
  3: { label: "Banned", color: "red" },
};

const REPORT_STATUS_MAP: Record<number, { label: string; color: string }> = {
  0: { label: "Pending", color: "orange" },
  1: { label: "Reviewed", color: "blue" },
  2: { label: "Removed", color: "red" },
};

const CONTENT_TYPE_COLOR: Record<string, string> = {
  post: "blue",
  comment: "cyan",
  message: "geekblue",
  event: "purple",
};

const REASON_COLOR: Record<string, string> = {
  spam: "volcano",
  harassment: "red",
  inappropriate: "purple",
};

// ─── Component ────────────────────────────────────────────────────────────────

const UserInterestDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!userId) return;
    try {
      setLoading(true);

      // Fetch all reports and filter for this user
      const allReports: Report[] = await core_services.getReports();
      // NOTE: swap this for a dedicated endpoint if available:
      // const allReports = await core_services.getReportsByUser(userId);

      const userReports = allReports.filter(
        // @ts-ignore — reporter field on enriched response
        (r: any) => r?.reporter?.userId === userId || r?.ReporterUserId === userId
      );
      setReports(userReports);

      // Build user object from the enriched report response
      // @ts-ignore
      const enriched = allReports.find((r: any) => r?.reporter?.userId === userId);
      // @ts-ignore
      if (enriched?.reporter) setUser(enriched.reporter as UserDetail);

    } catch {
      message.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // ── Max join count (for progress bar scaling) ─────────────────────────────
  const maxJoinCount = user?.interests?.length
    ? Math.max(...user.interests.map((i) => i.joinCount))
    : 1;

  // ── Report columns ────────────────────────────────────────────────────────
  const reportColumns = [
    {
      title: "Content Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (type: string) => (
        <Tag color={CONTENT_TYPE_COLOR[type] || "default"}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Content ID",
      dataIndex: "contentId",
      key: "contentId",
      render: (id: string) => (
        <Text copyable style={{ fontSize: 12, color: "#888" }}>
          {id?.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason: string) => (
        <Tag color={REASON_COLOR[reason?.toLowerCase()] || "default"}>
          {reason?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "reportStatus",
      key: "reportStatus",
      render: (status: number) => (
        <Tag color={REPORT_STATUS_MAP[status]?.color}>
          {REPORT_STATUS_MAP[status]?.label}
        </Tag>
      ),
    },
    {
      title: "Reported At",
      dataIndex: "reportedAt",
      key: "reportedAt",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      sorter: (a: Report, b: Report) =>
        new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime(),
      defaultSortOrder: "ascend" as const,
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            type="text"
          />
          <UserOutlined style={{ fontSize: 24, color: "#1677ff" }} />
          <Title level={3} style={{ margin: 0 }}>
            User Interest Detail
          </Title>
        </div>
        <Button icon={<ReloadOutlined />} onClick={fetchData} loading={loading}>
          Refresh
        </Button>
      </div>

      {!user ? (
        <Card>
          <Empty description="User not found" />
        </Card>
      ) : (
        <>
          {/* ── Top: Profile + Stats ── */}
          <Row gutter={[16, 16]} className="mb-4">

            {/* Profile Card */}
            <Col xs={24} md={10}>
              <Card style={{ height: "100%" }}>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar
                    size={72}
                    src={user.avatar}
                    icon={!user.avatar ? <UserOutlined /> : undefined}
                    style={{ background: "#1677ff" }}
                  />
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      {user.username}
                    </Title>
                    <Tag
                      color={ACCOUNT_STATUS_MAP[user.accountStatus]?.color}
                      style={{ marginTop: 4 }}
                    >
                      {ACCOUNT_STATUS_MAP[user.accountStatus]?.label}
                    </Tag>
                  </div>
                </div>

                <Descriptions column={1} size="small">
                  <Descriptions.Item
                    label={<Space><MailOutlined /> Email</Space>}
                  >
                    <Text copyable>{user.email}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Space><EnvironmentOutlined /> Location</Space>}
                  >
                    {user.location || "—"}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Space><UserOutlined /> User ID</Space>}
                  >
                    <Text copyable style={{ fontSize: 11, color: "#aaa" }}>
                      {user.userId}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* Stats Cards */}
            <Col xs={24} md={14}>
              <Row gutter={[12, 12]}>
                <Col xs={12}>
                  <Card className="text-center">
                    <CalendarOutlined style={{ fontSize: 24, color: "#1677ff" }} />
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#1677ff" }}>
                      {user.stats.eventsHosted}
                    </div>
                    <Text type="secondary">Events Hosted</Text>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card className="text-center">
                    <TeamOutlined style={{ fontSize: 24, color: "#52c41a" }} />
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#52c41a" }}>
                      {user.stats.eventsJoined}
                    </div>
                    <Text type="secondary">Events Joined</Text>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card className="text-center">
                    <TrophyOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#fa8c16" }}>
                      {user.stats.totalPosts}
                    </div>
                    <Text type="secondary">Total Posts</Text>
                  </Card>
                </Col>
                <Col xs={12}>
                  <Card className="text-center">
                    <Badge count={user.stats.totalReportsFiled} overflowCount={99} color="red">
                      <FlagOutlined style={{ fontSize: 24, color: "#f5222d" }} />
                    </Badge>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#f5222d" }}>
                      {user.stats.totalReportsFiled}
                    </div>
                    <Text type="secondary">Reports Filed</Text>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* ── Interests Section ── */}
          <Card
            className="mb-4"
            title={
              <Space>
                <StarOutlined style={{ color: "#faad14" }} />
                <span>
                  Category Interests
                  <Tag color="gold" style={{ marginLeft: 8 }}>
                    {user.interests.length} categories
                  </Tag>
                </span>
              </Space>
            }
          >
            {user.interests.length === 0 ? (
              <Empty
                description="No interests tracked yet — user hasn't joined 4+ events in any category"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <Row gutter={[12, 12]}>
                {user.interests.map((interest) => (
                  <Col xs={24} sm={12} md={8} key={interest.categoryId}>
                    <Card
                      size="small"
                      style={{ borderLeft: "4px solid #faad14" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Text strong>{interest.categoryName}</Text>
                        <Tag color="gold">{interest.joinCount} joins</Tag>
                      </div>
                      {interest.categoryDesc && (
                        <Text
                          type="secondary"
                          style={{ fontSize: 12, display: "block", marginBottom: 8 }}
                        >
                          {interest.categoryDesc}
                        </Text>
                      )}
                      <Progress
                        percent={Math.round((interest.joinCount / maxJoinCount) * 100)}
                        size="small"
                        strokeColor="#faad14"
                        showInfo={false}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>

          {/* ── Reports Filed by this User ── */}
          <Card
            title={
              <Space>
                <FlagOutlined style={{ color: "#f5222d" }} />
                <span>
                  Reports Filed by User
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    {reports.length}
                  </Tag>
                </span>
              </Space>
            }
          >
            <Table
              dataSource={reports}
              columns={reportColumns}
              rowKey="reportId"
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} reports`,
              }}
              locale={{
                emptyText: (
                  <div className="py-8 text-center text-gray-400">
                    <FlagOutlined style={{ fontSize: 28 }} />
                    <div className="mt-2">No reports filed by this user</div>
                  </div>
                ),
              }}
              rowClassName={(record) =>
                record.reportStatus === 0 ? "bg-orange-50" : ""
              }
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default UserInterestDetail;