import React from "react";
import { Phone, Mail, Facebook, MessageCircle, MapPin } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form bên trái */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full name</label>
              <input
                type="text"
                placeholder="Nhập họ tên..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Nhập email..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Content</label>
              <textarea
                placeholder="Nhập nội dung..."
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
                <MessageCircle />
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
    </div>
  );
};

export default ContactUs;
