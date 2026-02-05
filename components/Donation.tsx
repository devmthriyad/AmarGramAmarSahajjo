import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { PROJECTS } from '../constants';
import { CheckCircle, ShieldCheck, AlertCircle, ChevronDown, CreditCard, Lock, X } from 'lucide-react';

type PaymentStatus = 'IDLE' | 'LOADING_GATEWAY' | 'GATEWAY_OPEN' | 'VERIFYING' | 'SUCCESS';

const Donation: React.FC = () => {
  // Donation Amount State
  const [amount, setAmount] = useState<number | string>('1000');
  const [customAmount, setCustomAmount] = useState('');
  
  // User Info State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProject, setSelectedProject] = useState('general');
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.BKASH);
  
  // Logic State
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [errors, setErrors] = useState<{name?: string; phone?: string; amount?: string}>({});

  // Validation Logic
  const validate = () => {
    const newErrors: {name?: string; phone?: string; amount?: string} = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "আপনার নাম আবশ্যক";
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = "নাম অন্তত ৩ অক্ষরের হতে হবে";
      isValid = false;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phone.trim()) {
      newErrors.phone = "মোবাইল নম্বর আবশ্যক";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন";
      isValid = false;
    }

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
    const val = e.target.value.replace(/\D/g, ''); 
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
      // Step 1: Show Skeleton loading for Gateway
      setStatus('LOADING_GATEWAY');
      
      // Simulate Network Request to Gateway
      setTimeout(() => {
        setStatus('GATEWAY_OPEN');
      }, 1500);
    }
  };

  const handleGatewayPayment = () => {
    // Step 2: Show Skeleton loading for Verification
    setStatus('VERIFYING');

    // Simulate Payment Processing
    setTimeout(() => {
        setStatus('SUCCESS');
        
        // Reset logic handled after viewing success
        setTimeout(() => {
            // Optional auto-reset or keep success state
        }, 8000);
    }, 2000);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAmount('1000');
    setCustomAmount('');
    setSelectedProject('general');
    setStatus('IDLE');
  };

  const getFinalAmount = () => {
    return amount === 'custom' ? Number(customAmount) : Number(amount);
  };

  const getMethodColor = (m: PaymentMethod) => {
      switch(m) {
          case PaymentMethod.BKASH: return "bg-pink-600";
          case PaymentMethod.NAGAD: return "bg-orange-600";
          case PaymentMethod.ROCKET: return "bg-purple-600";
          default: return "bg-gray-500";
      }
  };

  // --- SUB-COMPONENTS ---

  // 1. Skeleton Loader
  const PaymentSkeleton = () => (
    <div className="space-y-6 w-full animate-pulse p-4">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>

      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
      
      <div className="flex gap-4 mt-6">
        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
      </div>

      <div className="h-14 bg-gray-300 rounded-xl w-full mt-8"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-4"></div>
    </div>
  );

  // 2. Mock UddoktaPay Gateway
  const MockGateway = () => (
    <div className="w-full h-full min-h-[500px] bg-white flex flex-col animate-fade-in-up">
        {/* Gateway Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-lg">U</div>
                <span className="font-bold tracking-wide">UddoktaPay</span>
            </div>
            <button onClick={() => setStatus('IDLE')} className="text-gray-400 hover:text-white">
                <X size={20} />
            </button>
        </div>

        {/* Sandbox Badge */}
        <div className="bg-orange-100 text-orange-800 text-xs font-bold text-center py-1 border-b border-orange-200">
            SANDBOX MODE - TEST PAYMENT
        </div>

        {/* Gateway Body */}
        <div className="flex-grow p-6 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 text-center bg-gray-50">
                    <p className="text-gray-500 text-sm mb-1">Total Payable</p>
                    <h3 className="text-3xl font-bold text-gray-800">৳{getFinalAmount()}</h3>
                    <p className="text-xs text-blue-600 mt-2 bg-blue-50 inline-block px-2 py-1 rounded">Invoice: INV-{Date.now().toString().slice(-6)}</p>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer bg-emerald-50 border-emerald-500 relative">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getMethodColor(method)}`}>
                                {method.toString().charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm">{method}</p>
                                <p className="text-xs text-gray-500">Personal Account</p>
                            </div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <button 
                        onClick={handleGatewayPayment}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Lock size={16} /> Pay Now
                    </button>
                    <div className="text-center mt-3 flex items-center justify-center gap-1 text-xs text-gray-400">
                        <ShieldCheck size={12} /> Secured by UddoktaPay
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  // 3. Success View
  const SuccessView = () => (
    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in p-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
        <CheckCircle className="text-green-600 w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">জাজাকাল্লাহ খাইরান!</h3>
      <p className="text-gray-600 mb-6">আপনার ৳{getFinalAmount()} অনুদান সফলভাবে গৃহীত হয়েছে।</p>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full max-w-xs mb-8">
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">তারিখ:</span>
            <span className="font-medium text-gray-800">{new Date().toLocaleDateString('bn-BD')}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">ট্রানজেকশন আইডি:</span>
            <span className="font-mono font-bold text-gray-800">TXN{Date.now().toString().slice(-8)}</span>
        </div>
      </div>

      <button 
        onClick={resetForm}
        className="text-emerald-600 font-bold hover:underline flex items-center gap-2"
      >
        <ChevronDown className="rotate-90" size={16} /> ফিরে যান
      </button>
    </div>
  );

  return (
    <section id="donate" className="py-20 bg-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Info Panel */}
          <div className="md:w-5/12 bg-emerald-600 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
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
                  <CreditCard className="text-gold" size={24} />
                  <span className="font-medium">UddoktaPay গেটওয়ে</span>
                </li>
              </ul>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 mt-12 p-4 bg-emerald-700/50 rounded-xl border border-emerald-500 backdrop-blur-sm">
               <p className="text-sm opacity-80 mb-2">হেল্পলাইন (২৪/৭):</p>
               <p className="text-xl font-mono font-bold">018XX-XXXXXX</p>
            </div>
          </div>

          {/* Right Panel (Form / Loading / Gateway / Success) */}
          <div className="md:w-7/12 p-8 md:p-12 bg-white relative">
            
            {/* 1. Loading Skeleton View */}
            {(status === 'LOADING_GATEWAY' || status === 'VERIFYING') && <PaymentSkeleton />}

            {/* 2. Mock Gateway View */}
            {status === 'GATEWAY_OPEN' && <MockGateway />}

            {/* 3. Success View */}
            {status === 'SUCCESS' && <SuccessView />}

            {/* 4. Default Form View */}
            {status === 'IDLE' && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">পেমেন্ট মেথড (UddoktaPay)</label>
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
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  এখনই অনুদান করুন
                </button>
                <p className="text-xs text-center text-gray-400">
                  By clicking Donate, you agree to our Terms. Secured by UddoktaPay Sandbox.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;