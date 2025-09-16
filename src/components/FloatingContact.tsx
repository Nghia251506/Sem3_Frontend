import React from "react";
import { Phone, Facebook, MessageCircle } from "lucide-react";

const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Zalo */}
      <a
        href="https://zalo.me/0862273012"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:scale-110 transition"
      >
        <img src="/zalo-icon.svg" alt="Zalo" className="w-6 h-6" />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full shadow-lg hover:scale-110 transition"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-blue-700 rounded-full shadow-lg hover:scale-110 transition"
      >
        <Facebook className="text-white w-6 h-6" />
      </a>

      {/* Gọi điện */}
      <a
        href="tel:0862273012"
        className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:scale-110 transition"
      >
        <Phone className="text-white w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingContact;
