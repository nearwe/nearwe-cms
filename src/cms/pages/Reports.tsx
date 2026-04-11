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

interface Report {
  ReportId: string;
  ReporterUserId: string;
  ReporterUsername: string;
  ContentType: "post" | "comment" | "message";
  ContentId: string;
  Reason: string;
  Status: number; // 0=pending, 1=reviewed, 2=removed
  CreatedAt: string;
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
        r.ReporterUsername?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.Reason?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.ContentType?.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        filterStatus === "all" || r.Status === Number(filterStatus);

      const matchType =
        filterType === "all" || r.ContentType === filterType;

      return matchSearch && matchStatus && matchType;
    });
  }, [reports, searchText, filterStatus, filterType]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const pendingCount = reports.filter((r) => r.Status === 0).length;
  const reviewedCount = reports.filter((r) => r.Status === 1).length;
  const removedCount = reports.filter((r) => r.Status === 2).length;

  // ── Columns ────────────────────────────────────────────────────────────────
  const columns = [
    {
      title: "Reporter",
      dataIndex: "ReporterUsername",
      key: "reporter",
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Content Type",
      dataIndex: "ContentType",
      key: "contentType",
      render: (type: string) => (
        <Tag color={type === "post" ? "blue" : type === "comment" ? "cyan" : "geekblue"}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Content ID",
      dataIndex: "ContentId",
      key: "contentId",
      render: (id: string) => (
        <Text copyable style={{ fontSize: 12, color: "#888" }}>
          {id?.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "reason",
      render: (reason: string) => (
        <Tag color={REASON_COLOR[reason] || "default"}>
          {reason?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      render: (status: number) => (
        <Tag color={STATUS_MAP[status]?.color}>
          {STATUS_MAP[status]?.label}
        </Tag>
      ),
    },
    {
      title: "Reported At",
      dataIndex: "CreatedAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      sorter: (a: Report, b: Report) =>
        new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(),
      defaultSortOrder: "ascend" as const,
    },
  ];

  return (
    <div className="p-2 md:p-4">
      {/* ── Header ── */}
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

      {/* ── Stat Cards ── */}
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

      {/* ── Filters ── */}
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
              { label: "Comment", value: "comment" },
              { label: "Message", value: "message" },
            ]}
          />

          <Text type="secondary">
            Showing {filtered.length} of {reports.length} reports
          </Text>
        </Space>
      </Card>

      {/* ── Table ── */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="ReportId"
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} reports`,
            }}
            rowClassName={(record) =>
              record.Status === 0 ? "bg-orange-50" : ""
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