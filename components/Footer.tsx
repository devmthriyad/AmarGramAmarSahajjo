import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube, Heart, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  // Helper to prevent default jump for placeholder links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#' || !href) {
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t-4 border-gold relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
              <Globe size={24} className="text-emerald-500" />
              <span>আমার গ্রাম <span className="text-gold">আমার সহযোগিতা</span></span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              গ্রামের সুবিধাবঞ্চিত মানুষের জীবনমান উন্নয়নে একটি অলাভজনক উদ্যোগ। আপনার সহযোগিতা আমাদের শক্তি।
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" onClick={handleLinkClick} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-110" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" onClick={handleLinkClick} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all transform hover:scale-110" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-2 inline-block">যোগাযোগ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <MapPin className="text-emerald-500 flex-shrink-0" size={20} />
                    <span className="text-sm">চট্টগ্রাম, বাংলাদেশ</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <Phone className="text-emerald-500 flex-shrink-0" size={20} />
                    <span className="text-sm">+880 1XXX-XXXXXX</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors md:col-span-2">
                    <Mail className="text-emerald-500 flex-shrink-0" size={20} />
                    <span className="text-sm">support@myvillagehelp.com</span>
                </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-2 inline-block">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block">আমাদের সম্পর্কে</a></li>
              <li><a href="#projects" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block">প্রকল্পসমূহ</a></li>
              <li><a href="#donate" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block">অনুদান করুন</a></li>
              <li><a href="#" onClick={handleLinkClick} className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block">গোপনীয়তা নীতি</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} আমার গ্রাম আমার সহযোগিতা। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1 mt-4 md:mt-0 bg-gray-800 px-4 py-1 rounded-full">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-current animate-pulse" />
            <span>for Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;