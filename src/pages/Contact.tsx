import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Phone, Mail, Facebook, MessageCircle, MapPin, MessageCircleCode } from "lucide-react";
import { RootState, AppDispatch } from "../redux/store";
import ModalDetail from "../Common/ModalDetail";
import { addRequest } from "../redux/serviceRequestSlice";
import { fetchServices } from "../redux/serviceSlice"; // ✅ import thunk lấy service từ DB
import { fetchEmployees } from "../redux/employeeSlice"; // ✅ import thunk lấy employee từ DB

const ContactUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [modalVisible, setModalVisible] = useState(false);
  const [formRequest, setFormRequest] = useState<any>({});
  const { items: services } = useSelector((state: RootState) => state.services);
  const employees = useSelector((state: RootState) => state.employees.items);

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    contactEmail: "",
    address: "",
    contactPhone: "",
    serviceId: null,
    assignedEmployeeId: null,
    status: "pending",
    requestDetails: "",
    startDate: "",
    endDate: "",
  });

  // ✅ Gọi API lấy services + employees khi component mount
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormRequest({
      ...formData,
      serviceId: selectedService,
      assignedEmployeeId: selectedEmployee
    });
    setModalVisible(true);
  };

  const handleCreate = () => {
    dispatch(addRequest(formRequest));
    setModalVisible(false);
  };

  // ✅ Lọc nhân viên theo service đã chọn
  const filteredEmployees = selectedService
    ? employees.filter((emp) => emp.serviceId === selectedService)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form bên trái */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact us</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Full name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Your email..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Address ✅ */}
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Start Date ✅ */}
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* End Date ✅ */}
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-gray-700">Service</label>
              <select
                value={selectedService ?? ""}
                onChange={(e) => {
                  const serviceId = Number(e.target.value);
                  setSelectedService(serviceId);
                  setSelectedEmployee(null); // reset employee khi đổi service
                }}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select service --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label className="block text-gray-700">Choose your guard</label>
              <select
                value={selectedEmployee ?? ""}
                onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
                disabled={!selectedService} // disable nếu chưa chọn service
              >
                <option value="">-- Select employee --</option>
                {filteredEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Content</label>
              <textarea
                name="requestDetails"
                value={formData.requestDetails}
                onChange={handleChange}
                placeholder="Description"
                rows={4}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Thông tin liên hệ bên phải */}
        <div className="bg-blue-600 text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact information</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" /> <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" /> <span>contact@company.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5" /> <span>Plot No. 123 Sector 44, Gurgaon Haryana - 122003</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex gap-4">
              <a href="tel:0123456789" className="bg-white text-blue-600 p-3 rounded-full hover:bg-gray-200">
                <Phone />
              </a>
              <a href="https://zalo.me/" className="bg-white text-blue-600 p-3 rounded-full hover:bg-gray-200">
                <MessageCircleCode />
              </a>
              <a href="https://m.me/yourpage" className="bg-white text-blue-600 p-3 rounded-full hover:bg-gray-200">
                <MessageCircle />
              </a>
              <a href="https://facebook.com/yourpage" className="bg-white text-blue-600 p-3 rounded-full hover:bg-gray-200">
                <Facebook />
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal xác nhận */}
      <ModalDetail
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Payment"
      >
        <img src="/payment.jpg" alt="" />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Accept
        </button>
      </ModalDetail>
    </div>
  );
};

export default ContactUs;
