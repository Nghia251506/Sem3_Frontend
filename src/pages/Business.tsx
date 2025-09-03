import React, { useEffect, useState } from "react";
import { Shield, DollarSign, Users, Monitor } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, fetchServiceById } from "../redux/serviceSlice";
import type { RootState, AppDispatch } from "../redux/store";
import ModalDetail from "../Common/ModalDetail";
import { Table } from "antd";

const serviceIcons = {
  "Manned Guarding": Shield,
  "Cash Services": DollarSign,
  "Electronic Security": Monitor,
  "Recruitment & Training": Users,
};

const Business = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.services.items);
  const selectedService = useSelector(
    (state: RootState) => state.services.selected
  );

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleOpenModal = (id: number) => {
    dispatch(fetchServiceById(id)); // gọi API lấy detail
    setModalVisible(true);
  };

  // console.log(selectedService);
  const columns = [
  {
    title: "Service Package",
    dataIndex: "packageName",
    key: "packageName",
    render: (text: string) => {
      let colorClass = "text-gray-800"; // màu mặc định

      if (text.toLowerCase().includes("bạc")) colorClass = "text-gray-400"; // bạc
      else if (text.toLowerCase().includes("vàng")) colorClass = "text-yellow-500"; // vàng
      else if (text.toLowerCase().includes("kim cương")) colorClass = "text-blue-600"; // kim cương

      return <span className={`${colorClass} font-bold`}>{text}</span>;
    },
  },
  { title: "Personnel", dataIndex: "staffRange", key: "staffRange" },
  { title: "Price", dataIndex: "price", key: "price",  render: (price: number) => `${price}$` },
  { title: "Note", dataIndex: "note", key: "note" },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        // onClick={}
      >
        Apply
      </button>
    ),
  },
];

// console.log(selectedService)
  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Business</h1>
          <p className="text-xl text-blue-100">
            Comprehensive security solutions across multiple divisions
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Service Divisions
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Star Securities operates through specialized divisions, each
              delivering excellence in their respective domains.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent =
                serviceIcons[service.name as keyof typeof serviceIcons] ??
                Shield;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleOpenModal(service.id)} // 👈 click service
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {service.code}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        Description
                      </h4>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal detail */}
      <ModalDetail
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedService?.name}
      >
        <p><b>Description:</b> {selectedService?.description}</p>

        <h3 className="mt-4 mb-2 font-semibold">Price list</h3>
        <Table
          dataSource={selectedService?.packages || []}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </ModalDetail>
    </div>
  );
};

export default Business;
