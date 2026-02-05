import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { PROJECTS } from '../constants';
import { CheckCircle, ShieldCheck, AlertCircle, ChevronDown } from 'lucide-react';

const Donation: React.FC = () => {
  // Donation Amount State
  const [amount, setAmount] = useState<number | string>('1000');
  const [customAmount, setCustomAmount] = useState('');
  
  // User Info State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProject, setSelectedProject] = useState('general');
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.BKASH);
  
  // UI State
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string; phone?: string; amount?: string}>({});

  // Validation Logic
  const validate = () => {
    const newErrors: {name?: string; phone?: string; amount?: string} = {};
    let isValid = true;

    // Name Validation
    if (!name.trim()) {
      newErrors.name = "আপনার নাম আবশ্যক";
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "নাম অন্তত ৩ অক্ষরের হতে হবে";
      isValid = false;
    }

    // Phone Validation (Bangladesh Format: 01xxxxxxxxx)
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phone.trim()) {
      newErrors.phone = "মোবাইল নম্বর আবশ্যক";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017...)";
      isValid = false;
    }

    // Amount Validation
    const finalAmount = amount === 'custom' ? Number(customAmount) : Number(amount);
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 10) {
      newErrors.amount = "অনুদান ন্যূনতম ১০ টাকা হতে হবে";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) setErrors({ ...errors, name: undefined });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
    setPhone(val);
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleAmountSelect = (amt: number | string) => {
    setAmount(amt);
    if (amt !== 'custom') setCustomAmount('');
    if (errors.amount) setErrors({ ...errors, amount: undefined });
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
    if (errors.amount) setErrors({ ...errors, amount: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        
        // Reset Form
        setName('');
        setPhone('');
        setAmount('1000');
        setCustomAmount('');
        setSelectedProject('general');
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const getPaymentNumber = (method: PaymentMethod) => {
    switch(method) {
        case PaymentMethod.BKASH: return "017XX-XXXXXX";
        case PaymentMethod.NAGAD: return "018XX-XXXXXX";
        case PaymentMethod.ROCKET: return "019XX-XXXXXX";
    }
  };

  const getMethodColor = (m: PaymentMethod) => {
      switch(m) {
          case PaymentMethod.BKASH: return "bg-pink-600";
          case PaymentMethod.NAGAD: return "bg-orange-600";
          case PaymentMethod.ROCKET: return "bg-purple-600";
      }
  }

  return (
    <section id="donate" className="py-20 bg-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Info Panel */}
          <div className="md:w-5/12 bg-emerald-600 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">আপনার দান, তাদের হাসি</h2>
              <p className="opacity-90 mb-8">
                আপনার সামান্য অনুদান একজন মানুষের জীবন পরিবর্তন করতে পারে। আল্লাহর সন্তুষ্টির উদ্দেশ্যে দান করুন।
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-gold" size={24} />
                  <span className="font-medium">১০০% ট্রান্সপারেন্ট</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-gold" size={24} />
                  <span className="font-medium">সরাসরি প্রকল্পে ব্যবহার</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-gold" size={24} />
                  <span className="font-medium">নিরাপদ পেমেন্ট</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 p-4 bg-emerald-700/50 rounded-xl border border-emerald-500">
               <p className="text-sm opacity-80 mb-2">সাহায্যের জন্য যোগাযোগ করুন:</p>
               <p className="text-xl font-mono font-bold">018XX-XXXXXX</p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:w-7/12 p-8 md:p-12 bg-white">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-green-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">জাজাকাল্লাহ খাইরান!</h3>
                <p className="text-gray-600">আপনার অনুদান সফলভাবে গৃহীত হয়েছে। আল্লাহ আপনার দান কবুল করুন।</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-emerald-600 font-semibold hover:underline"
                >
                  ফিরে যান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">পরিমাণ নির্বাচন করুন (BDT)</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[500, 1000, 2000, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-2 rounded-lg border text-sm font-semibold transition-all ${
                          amount === amt 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                            : 'border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-500'
                        }`}
                      >
                        ৳{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="অন্যান্য পরিমাণ লিখুন"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full p-3 rounded-lg border ${
                        errors.amount ? 'border-red-500 ring-1 ring-red-500' : 
                        amount === 'custom' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-300'
                    } focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.amount}
                    </p>
                  )}
                </div>

                {/* Project Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">প্রকল্প নির্বাচন করুন</label>
                    <div className="relative">
                      <select
                          value={selectedProject}
                          onChange={(e) => setSelectedProject(e.target.value)}
                          className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white appearance-none cursor-pointer"
                      >
                          <option value="general">সাধারণ তহবিল (General Fund)</option>
                          {PROJECTS.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                        <ChevronDown size={20} />
                      </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={handleNameChange}
                        className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500`}
                        placeholder="নাম" 
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.name}
                        </p>
                    )}
                   </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">মোবাইল নম্বর</label>
                    <input 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500`}
                        placeholder="017XXXXXXXX"
                        maxLength={11} 
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.phone}
                        </p>
                    )}
                   </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">পেমেন্ট মেথড</label>
                  <div className="flex gap-4">
                    {Object.values(PaymentMethod).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMethod(m)}
                        className={`flex-1 py-3 px-2 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                          method === m 
                            ? `${getMethodColor(m)} text-white border-transparent shadow-lg transform scale-105` 
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                         <span className="font-bold">{m}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center animate-fade-in">
                    <p className="text-sm text-gray-600">নিচের নাম্বারে সেন্ড মানি করুন:</p>
                    <p className="text-lg font-bold text-gray-800 font-mono mt-1 select-all">{getPaymentNumber(method)}</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      প্রক্রিয়াধীন...
                    </>
                  ) : 'এখনই অনুদান করুন'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;