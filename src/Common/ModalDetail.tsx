// ModalDetail.tsx
import { Modal } from "antd";
import { ReactNode } from "react";

interface ModalDetailProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode; // 👈 cho phép truyền nội dung tuỳ ý
}

const ModalDetail: React.FC<ModalDetailProps> = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      title={title || "Detail"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {children}
    </Modal>
  );
};

export default ModalDetail;



// import { Modal, Table } from "antd";

// interface ModalDetailProps {
//   visible: boolean;
//   onClose: () => void;
//   data?: any; // hoặc định nghĩa type ServiceDetail
// }

// const ModalDetail: React.FC<ModalDetailProps> = ({ visible, onClose, data }) => {
//   const columns = [
//     { title: "Gói dịch vụ", dataIndex: "packageName", key: "packageName" },
//     { title: "Nhân sự", dataIndex: "staffRange", key: "staffRange" },
//     { title: "Giá", dataIndex: "price", key: "price" },
//     { title: "Ghi chú", dataIndex: "note", key: "note" },
//   ];

//   return (
//     <Modal
//       title={data?.name || "Service Detail"}
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={800}
//     >
//       <p><b>Mã dịch vụ:</b> {data?.code}</p>
//       <p><b>Mô tả:</b> {data?.description}</p>
//       <p><b>Division:</b> {data?.division}</p>

//       <h3 className="mt-4 mb-2 font-semibold">Bảng giá</h3>
//       <Table
//         dataSource={data?.servicesPackages || []}
//         columns={columns}
//         rowKey="id"
//         pagination={false}
//       />
//     </Modal>
//   );
// };

// export default ModalDetail;
