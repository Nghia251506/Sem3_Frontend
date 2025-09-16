import React, { useEffect, useState } from "react";
import { Table, Space, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchServiceRequests,
  removeRequest,
  editRequest,
} from "../redux/serviceRequestSlice";
import { ServiceRequest } from "../types/ServiceRequest";
import CommonModal, { FieldType } from "../Common/Modal"; // import modal

const JobListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector(
    (state: RootState) => state.servicerequests
  );

  // state modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  console.log("service:",dispatch)

  const handleDelete = (id: number) => {
    dispatch(removeRequest(id));
  };

  const handleEdit = (job: ServiceRequest) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (editingJob) {
      dispatch(editRequest({ id: editingJob.id, request: { ...editingJob, ...values } }));
    }
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const fields: FieldType[] = [
    { name: "clientName", label: "Client Name", type: "text", rules: [{ required: true }] },
    { name: "contactPhone", label: "Phone", type: "text" },
    { name: "contactEmail", label: "Email", type: "email" },
    { name: "address", label: "Address", type: "text" },
    { name: "serviceId", label: "Service", type: "text" },
    { name: "requestDetails", label: "Request Details", type: "text" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Assigned", value: "assigned" },
        { label: "Completed", value: "completed" },
      ],
    },
    { name: "assignedEmployeeId", label: "Assigned Employee", type: "text" },
  ];

  const columns: ColumnsType<ServiceRequest> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Client", dataIndex: "clientName", key: "clientName" },
    { title: "Phone", dataIndex: "contactPhone", key: "contactPhone" },
    { title: "Email", dataIndex: "contactEmail", key: "contactEmail" },
    { title: "Service", dataIndex: "serviceName", key: "serviceId" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "pending") color = "orange";
        else if (status === "accepted") color = "cyan";
        else if (status === "assigned") color = "purple";
        else if (status === "completed") color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Service Requests</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={items}
        loading={loading}
        bordered
      />

      <CommonModal
        visible={isModalOpen}
        title="Edit Job"
        okText="Update"
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
        initialValues={editingJob || {}}
      />
    </div>
  );
};

export default JobListPage;
