import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Phone, Mail, Facebook, MessageCircle, MapPin, MessageCircleCode } from "lucide-react";
import { RootState, AppDispatch } from "../redux/store";
import ModalDetail from "../Common/ModalDetail";
import { addRequest } from "../redux/serviceRequestSlice";

const ContactUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const selectedPackage = useSelector((state: RootState) => state.servicePackage.selectedPackage);
  // console.log(selectedPackage.id)
  const [modalVisible, setModalVisible] = useState(false);
  const [formRequest, setFormRequest] = useState<any>({});
  const { items: services } = useSelector((state: RootState) => state.services);
  // const { items: packages } = useSelector((state: RootState) => state.packages);
  const { items: employees } = useSelector((state: RootState) => state.employees);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    serviceId: null,
    status: "pending",
    detail: ""
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log('vào đây rồi')
    console.log(formData);
    setFormRequest(formData)
    setModalVisible(true);
    event.preventDefault();
  }

  const handleCreate = () => {
    console.log("--------------------")
    console.log(formRequest);
    dispatch(addRequest(formRequest))
    setModalVisible(false);
  }

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
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700">Service</label>
              <select
                value={selectedService ?? ""}
                onChange={(e) => {
                  const serviceId = Number(e.target.value);
                  setSelectedService(serviceId);
                  setSelectedPackage(null); // reset package
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

            {/* Package (chỉ hiện khi đã chọn service) */}
            {selectedService && (
              <div>
                <label className="block text-gray-700">Package</label>
                {/* <select
                  value={selectedPackage ?? ""}
                  onChange={(e) => setSelectedPackage(Number(e.target.value))}
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select package --</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select> */}
              </div>
            )}

            {/* Employee */}
            <div>
              <label className="block text-gray-700">Choose your guard</label>
              <select
                value={selectedEmployee ?? ""}
                onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select employee --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Content</label>
              <textarea
                name="detail"
                value={formData.detail}
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
              {/* <li><a href="/products" className="hover:underline">Sản phẩm</a></li>
              <li><a href="/news" className="hover:underline">Tin tức</a></li>
              <li><a href="/contact" className="hover:underline">Liên hệ</a></li> */}
            </ul>
          </div>
        </div>
      </div>
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
