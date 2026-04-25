import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FlagOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { core_services } from "../../utils/api";

const { Title, Text } = Typography;

interface Reporter {
  userId: string;
  username: string;
  email: string;
  avatar: string | null;
  location: string;
  accountStatus: number;
  stats: {
    eventsHosted: number;
    eventsJoined: number;
    totalPosts: number;
    totalReportsFiled: number;
  };
  interests: string[];
}

interface Report {
  reportId: string;
  contentType: "post" | "event" | "comment" | "message";
  contentId: string;
  reason: string;
  reportStatus: number; // 0=pending, 1=reviewed, 2=removed
  reportedAt: string;
  reporter: Reporter;
}

const STATUS_MAP: Record<number, { label: string; color: string }> = {
  0: { label: "Pending", color: "orange" },
  1: { label: "Reviewed", color: "blue" },
  2: { label: "Removed", color: "red" },
};

const REASON_COLOR: Record<string, string> = {
  spam: "volcano",
  harassment: "red",
  inappropriate: "purple",
};

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await core_services.getReports();
      setReports(data || []);
    } catch {
      message.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        !searchText ||
        r.reporter?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.reason?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.contentType?.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        filterStatus === "all" || r.reportStatus === Number(filterStatus);

      const matchType =
        filterType === "all" || r.contentType === filterType;

      return matchSearch && matchStatus && matchType;
    });
  }, [reports, searchText, filterStatus, filterType]);

  const pendingCount = reports.filter((r) => r.reportStatus === 0).length;
  const reviewedCount = reports.filter((r) => r.reportStatus === 1).length;
  const removedCount = reports.filter((r) => r.reportStatus === 2).length;

  const columns = [
    {
      title: "Reporter",
      key: "reporter",
      render: (_: unknown, record: Report) => (
        <div>
          <Text strong>{record.reporter?.username}</Text>
          <div style={{ fontSize: 11, color: "#888" }}>{record.reporter?.email}</div>
        </div>
      ),
    },
    {
      title: "Content Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (type: string) => (
        <Tag color={type === "post" ? "blue" : type === "event" ? "green" : type === "comment" ? "cyan" : "geekblue"}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Content ID",
      dataIndex: "contentId",
      key: "contentId",
      render: (id: string) => (
        <Text copyable={{ text: id }} style={{ fontSize: 12, color: "#888" }}>
          {id?.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason: string) => (
        <Tag color={REASON_COLOR[reason] || "default"}>
          {reason?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "reportStatus",
      key: "reportStatus",
      render: (status: number) => (
        <Tag color={STATUS_MAP[status]?.color}>
          {STATUS_MAP[status]?.label}
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

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FlagOutlined style={{ fontSize: 24, color: "#f5222d" }} />
          <Title level={3} style={{ margin: 0 }}>
            Content Reports
          </Title>
        </div>
        <Button icon={<ReloadOutlined />} onClick={fetchReports} loading={loading}>
          Refresh
        </Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Badge count={pendingCount} overflowCount={999} color="orange">
              <ExclamationCircleOutlined style={{ fontSize: 28, color: "orange" }} />
            </Badge>
            <div className="mt-2">
              <Text type="secondary">Pending Review</Text>
              <div style={{ fontSize: 28, fontWeight: 700, color: "orange" }}>
                {pendingCount}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="text-center">
            <CheckCircleOutlined style={{ fontSize: 28, color: "#1677ff" }} />
            <div className="mt-2">
              <Text type="secondary">Reviewed</Text>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#1677ff" }}>
                {reviewedCount}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="text-center">
            <FlagOutlined style={{ fontSize: 28, color: "#f5222d" }} />
            <div className="mt-2">
              <Text type="secondary">Removed</Text>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#f5222d" }}>
                {removedCount}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Space wrap>
          <Input.Search
            placeholder="Search reporter, reason..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
            allowClear
          />

          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 150 }}
            options={[
              { label: "All Status", value: "all" },
              { label: "Pending", value: "0" },
              { label: "Reviewed", value: "1" },
              { label: "Removed", value: "2" },
            ]}
          />

          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 160 }}
            options={[
              { label: "All Types", value: "all" },
              { label: "Post", value: "post" },
              { label: "Event", value: "event" },
              { label: "Comment", value: "comment" },
              { label: "Message", value: "message" },
            ]}
          />

          <Text type="secondary">
            Showing {filtered.length} of {reports.length} reports
          </Text>
        </Space>
      </Card>

      <Card>
        {loading ? (
          <div className="flex justify-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="reportId"
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} reports`,
            }}
            rowClassName={(record) =>
              record.reportStatus === 0 ? "bg-orange-50" : ""
            }
            locale={{
              emptyText: (
                <div className="py-10 text-center text-gray-400">
                  <FlagOutlined style={{ fontSize: 32 }} />
                  <div className="mt-2">No reports found</div>
                </div>
              ),
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default Reports;