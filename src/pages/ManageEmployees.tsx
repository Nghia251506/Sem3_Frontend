import { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchEmployees,
  removeEmployee,
  addEmployee,
  editEmployee,
} from "../redux/employeeSlice";
import { Employee } from "../types/Employee";
import CommonModal, { FieldType } from "../Common/Modal";
import { message } from "antd";

const { Column } = Table;

const ManageEmployees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.items);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalVisible(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    if (editingEmployee) {
      dispatch(editEmployee({ id: editingEmployee.id, employee: { ...editingEmployee, ...values } }));
    } else {
      dispatch(addEmployee(values));
    }
    setModalVisible(false);
  };

  // định nghĩa các field riêng cho Employee
  const employeeFields: FieldType[] = [
    { name: "firstName", label: "First Name", rules: [{ required: true }], type: "text" },
    { name: "lastName", label: "Last Name", rules: [{ required: true }], type: "text" },
    { name: "fullName", label: "Full Name", rules: [{ required: false }], type: "text", disabled:true},
    { name: "address", label: "Address", rules: [{ required: true }], type: "text" },
    { name: "phone", label: "Phone",rules: [{ required: true }], type: "text" },
    { name: "email", label: "Email",rules: [{ required: true }], type: "email" },
    { name: "education", label: "Education",rules: [{ required: false }], type: "text" },
    { name: "departmentId", label: "Department",rules: [{ required: false }], type: "text" },
    { name: "gradeId", label: "Grade",rules: [{ required: false }], type: "text" },
    { name: "jobTitle", label: "Job Title", type: "text" },
    { name: "dateOfJoin", label: "Date Of Join", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
      ],
    },
  ];

  const handleDelete = (id: number) => {
  dispatch(removeEmployee(id))
    .unwrap()
    .then(() => message.success("Employee deleted"))
    .catch(() => message.error("Delete failed"));
};

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Employee
      </Button>

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
              <Button type="link" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button danger type="link" onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* Modal dùng chung */}
      <CommonModal
        visible={modalVisible}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        okText={editingEmployee ? "Save" : "Create"}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        fields={employeeFields}
        initialValues={editingEmployee || undefined}
      />
    </>
  );
};

export default ManageEmployees;
