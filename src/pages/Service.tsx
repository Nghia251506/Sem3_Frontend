import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import 
{
  fetchServices,
  fetchServiceById,
  addService,
  editService,
  removeEService
} from "../redux/serviceSlice";
import { Service } from "../types/Service";
import CommonModal, { FieldType } from "../Common/Modal";
import { message } from "antd";

const {Column} = Table;

const ServicePage:React.FC = ()=> {
    const dispatch = useDispatch<AppDispatch>();
    const services = useSelector((state:RootState) => state.services.items);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        dispatch(fetchServices())
    },[dispatch]);
    
    const handleAdd = () => {
    setEditingService(null);
    setModalVisible(true);
  };

    const handleEdit = async (service: Service) => {
        try {
        // gọi API để lấy detail từ backend
        const fullService = await dispatch(fetchServiceById(service.id)).unwrap();
    
        // lưu vào state local để hiển thị trong form
        setEditingService(fullService);
    
        // mở modal
        setModalVisible(true);
      } catch (error) {
        console.error("Failed to fetch employee detail:", error);
      }
      };

    const handleSubmit = (values: any) => {
        if (editingService) {
          dispatch(editService({ id: editingService.id, service: { ...editingService, ...values } }));
        } else {
          dispatch(addService(values));
        }
        setModalVisible(false);
      };

      const handleDelete = (id: number) => {
  dispatch(removeEService(id))
    .unwrap()
    .then(() => message.success("Employee deleted"))
    .catch(() => message.error("Delete failed"));
};

     const serviceFields: FieldType[] = [
    { name: "code", label: "Code", rules: [{ required: true }], type: "text" },
    { name: "name", label: "Name", rules: [{ required: true }], type: "text" },
    { name: "division", label: "Division", rules: [{ required: false }], type: "select",
      options: [
        { label: "Manned Guarding", value: "MannedGuarding" },
        { label: "Cash Services", value: "CashServices" },
        { label: "Recruitment & Training", value: "RecruitmentTraining" },
        { label: "Electronic Security Systems", value: "ElectronicSecurity" }
      ],},
    { name: "description", label: "Description", rules: [{ required: true }], type: "text" },
  ];
    return (
        <>
            <h1 className="text-center text-2xl font-bold">List Service</h1>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
              Add Service
            </Button>
            <Table<Service> dataSource={services} rowKey="id" pagination={{ pageSize: 5 }}>
                    <Column title="Code" dataIndex="code" key="code" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Division" dataIndex="division" key="division" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column
                      title="Actions"
                      key="actions"
                      render={(_, record: Service) => (
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
                  <CommonModal
                    visible={modalVisible}
                    title={editingService ? "Edit Service" : "Add Service"}
                    okText={editingService ? "Save" : "Create"}
                    onCancel={() => setModalVisible(false)}
                    onSubmit={handleSubmit}
                    fields={serviceFields}
                    initialValues={editingService || undefined}
                  />
        </>
    )
}

export default ServicePage;