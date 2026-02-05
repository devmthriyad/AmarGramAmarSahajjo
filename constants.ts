import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "মসজিদ পূর্ণ নির্মাণ প্রকল্প",
    description: "গ্রামের প্রধান মসজিদটি সংস্কার ও সম্প্রসারণের কাজ চলছে।",
    fullDescription: "আমাদের গ্রামের পুরনো মসজিদটি মুসল্লিদের স্থান সংকুলানের জন্য যথেষ্ট নয়। তাই আমরা এটিকে ৩ তলা বিশিষ্ট একটি আধুনিক মসজিদ হিসেবে গড়ে তোলার উদ্যোগ নিয়েছি। বর্তমানে ভিত্তিপ্রস্তর স্থাপন ও প্রথম তলার ছাদ ঢালাইয়ের কাজ চলছে। আপনার দান আমাদের আখেরাতের পাথেয় হবে।",
    image: "https://media.licdn.com/dms/image/v2/D5622AQGslKbuT6gOCQ/feedshare-shrink_800/feedshare-shrink_800/0/1702389545076?e=2147483647&v=beta&t=wySHO3JqOdipnfjrCmhppeyJpUHZh1Q0aQUUGKiAWF4",
    progress: 60,
    target: 5000000,
    raised: 3000000
  },
  {
    id: 2,
    title: "স্কুল নির্মাণ",
    description: "শিশুদের উজ্জ্বল ভবিষ্যতের জন্য একটি আধুনিক প্রাথমিক বিদ্যালয়।",
    fullDescription: "শিক্ষাই জাতির মেরুদণ্ড। গ্রামের সুবিধাবঞ্চিত শিশুদের জন্য আমরা একটি বিনামূল্যে পাঠদান কেন্দ্র ও প্রাথমিক বিদ্যালয় স্থাপন করছি। এখানে আধুনিক কম্পিউটার ল্যাব ও লাইব্রেরি থাকবে।",
    image: "https://omrania.com/wp-content/uploads/BB06CAD4-1200x628-Cover.jpg",
    progress: 45,
    target: 2000000,
    raised: 900000
  },
  {
    id: 3,
    title: "মাদ্রাসা নির্মাণ",
    description: "ধর্মীয় শিক্ষার প্রসারে এতিমখানা ও হাফিজিয়া মাদ্রাসা।",
    fullDescription: "দ্বীনি শিক্ষা প্রসারে ও এতিম শিশুদের আশ্রয়ের জন্য একটি সুপরিসর মাদ্রাসা ভবন ও এতিমখানা নির্মাণ করা হচ্ছে। এখানে ১০০ জন এতিম শিশুর থাকা-খাওয়ার ব্যবস্থা থাকবে।",
    image: "https://pmedia.launchgood.com/72547/building_a_madrasah_and_orphanage_in_bangladesh_6897C715-F95F-46A7-8B0B-1BF44993C38E-670x525.jpeg",
    progress: 30,
    target: 3500000,
    raised: 1050000
  },
  {
    id: 4,
    title: "শীত বস্ত্র বিতরণ",
    description: "গরিব ও অসহায় মানুষের জন্য উষ্ণতার উপহার।",
    fullDescription: "প্রতি বছর শীতে গ্রামের অনেক মানুষ কষ্টে দিনাতিপাত করে। আমরা উদ্যোগ নিয়েছি ১০০০ পরিবারের মাঝে কম্বল ও শীতের কাপড় বিতরণ করার।",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    progress: 80,
    target: 500000,
    raised: 400000
  },
  {
    id: 5,
    title: "বিনামূল্যে খাবার বিতরণ",
    description: "ক্ষুধার্ত মানুষের মুখে অন্ন তুলে দেয়ার ক্ষুদ্র প্রয়াস।",
    fullDescription: "সপ্তাহে একদিন, শুক্রবার জুমার নামাজের পর আমরা গরিব ও দুস্থদের মাঝে রান্না করা খাবার বিতরণ করি। এছাড়া চাল, ডাল ও তেলের প্যাকেট মাসিক ভিত্তিতে প্রদান করা হয়।",
    image: "https://www.actionagainsthunger.org/app/uploads/2022/09/IMG_8881.jpg",
    progress: 90,
    target: 200000,
    raised: 180000
  },
  {
    id: 6,
    title: "ইফতার ও সেহরী সামগ্রী",
    description: "পবিত্র রমজানে রোজাদারদের খেদমতে ইফতার ও সেহরী।",
    fullDescription: "আসন্ন পবিত্র রমজান মাসে গ্রামের ৫০০টি দরিদ্র পরিবারের মাঝে আমরা পুরো মাসের ইফতার ও সেহরী সামগ্রী (ছোলা, মুড়ি, চিনি, খেজুর, তেল) পৌঁছে দিতে চাই।",
    image: "https://pbs.twimg.com/media/Fs34BC-XwAAwOUb.jpg",
    progress: 20,
    target: 800000,
    raised: 160000
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "মোহাম্মদ আব্দুল করিম",
    role: "গ্রামবাসী",
    quote: "এই উদ্যোগের ফলে আমাদের গ্রামের চেহারা পাল্টে যাচ্ছে। আল্লাহ তাদের মঙ্গল করুন।"
  },
  {
    id: 2,
    name: "সালমা বেগম",
    role: "শিক্ষিকা",
    quote: "স্কুল নির্মাণের উদ্যোগটি আমাদের ছেলেমেয়েদের জন্য আশীর্বাদস্বরূপ।"
  },
  {
    id: 3,
    name: "হাজী রফিকুল ইসলাম",
    role: "দাতা",
    quote: "আমি নিজে দেখেছি তারা কতটা সততার সাথে কাজ করছে। ১০০% স্বচ্ছতা বজায় রাখে।"
  }
];