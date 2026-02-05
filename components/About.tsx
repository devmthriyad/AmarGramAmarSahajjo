import React from 'react';
import { Users, Home, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            আমাদের লক্ষ্য
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            গ্রামের মানুষের পাশে, <span className="text-emerald-600">সব সময়</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
            "আমরা আমাদের গ্রামের মসজিদ, স্কুল, মাদ্রাসা নির্মাণ এবং গরিব অসহায়দের জন্য শীত বস্ত্র, খাবার, রোজার ইফতার-সেহরী সামগ্রী বিতরণ করছি। আপনার সাহায্যের অপেক্ষায় আছি।"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-emerald-500">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Home className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">অবকাঠামো উন্নয়ন</h3>
              <p className="text-gray-500 text-sm">মসজিদ ও বিদ্যালয় নির্মাণ</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-gold">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">সামাজিক সহায়তা</h3>
              <p className="text-gray-500 text-sm">খাবার ও বস্ত্র বিতরণ</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-emerald-500">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">শিক্ষা বিস্তার</h3>
              <p className="text-gray-500 text-sm">মাদ্রাসা ও এতিমখানা</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;