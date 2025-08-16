import { useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchEmployees, removeEmployee } from "../redux/employeeSlice";
import { Employee } from "../types/Employee";

const { Column } = Table;

const ManageEmployees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.items);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(removeEmployee(id));
  };

  const handleEdit = (id: number) => {
    // TODO: mở modal hoặc điều hướng sang trang Edit Employee
    console.log("Edit employee:", id);
  };

  return (
    <Table<Employee> dataSource={employees} rowKey="id">
      <Column title="Code" dataIndex="employeeCode" key="employeeCode" />
      <Column title="Full Name" dataIndex="fullName" key="fullName" />
      <Column title="Phone" dataIndex="phone" key="phone" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Job Title" dataIndex="jobTitle" key="jobTitle" />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status: string) => (
          <Tag color={status === "active" ? "green" : status === "inactive" ? "orange" : "red"}>
            {status.toUpperCase()}
          </Tag>
        )}
      />
      <Column
        title="Actions"
        key="actions"
        render={(_, record: Employee) => (
          <Space size="middle">
            <Button type="link" onClick={() => handleEdit(record.id)}>
              Edit
            </Button>
            <Button danger type="link" onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default ManageEmployees;
