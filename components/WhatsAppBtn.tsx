import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBtn: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={32} fill="white" />
    </a>
  );
};

export default WhatsAppBtn;