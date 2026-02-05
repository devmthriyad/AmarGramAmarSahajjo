import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Donation from './components/Donation';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* Navigation - Simple Header */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold text-emerald-600">
            আমার গ্রাম <span className="text-gold">আমার সাহায্য</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#home" className="hover:text-emerald-600 transition-colors">হোম</a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">আমাদের সম্পর্কে</a>
            <a href="#projects" className="hover:text-emerald-600 transition-colors">প্রকল্প</a>
          </div>
          <a href="#donate" className="px-5 py-2 bg-emerald-600 text-white rounded-full font-bold text-sm shadow hover:bg-emerald-700 transition-colors">
            দান করুন
          </a>
        </div>
      </nav>

      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Donation />
        <Testimonials />
      </main>

      <Footer />
      <WhatsAppBtn />
    </div>
  );
}

export default App;