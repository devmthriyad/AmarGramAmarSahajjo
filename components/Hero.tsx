import React, { useState, useEffect, useRef } from 'react';
import { HeartHandshake } from 'lucide-react';

const BACKGROUND_IMAGES = [
  // Beautiful Mosque - High quality, reliable link
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1920&auto=format&fit=crop",
  // Rural/Village Nature - Green scenery
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop",
  // Hands/Charity Concept
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1920&auto=format&fit=crop", 
  // Islamic Pattern/Architecture detail
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1920&auto=format&fit=crop"
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Preload images to prevent flickering
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Particle Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      growth: number;
    }> = [];

    let animationFrameId: number;

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 120); // Responsive count
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.5 + 0.1, // Upward speed
          speedX: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
          opacity: Math.random() * 0.5 + 0.1,
          growth: Math.random() * 0.02 - 0.01 // Pulsing effect
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Move particle
        p.y -= p.speedY;
        p.x += p.speedX;

        // Pulse size
        p.size += p.growth;
        if (p.size > 3 || p.size < 0.5) p.growth *= -1;

        // Reset if out of bounds (wrap around to bottom)
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background Slider */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
           {/* Image with overlay */}
           <div 
             className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
             style={{ backgroundImage: `url(${img})` }}
           ></div>
           {/* Dark Gradient Overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-emerald-900/80"></div>
        </div>
      ))}

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none opacity-60" 
      />

      {/* Islamic Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Content - Fixed and Centered */}
      <div className="container mx-auto px-4 relative z-20 text-center text-white mt-16">
        <div className="animate-fade-in-up flex flex-col items-center">
          
          <div className="mb-8 p-5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-2xl animate-bounce-slow">
            <HeartHandshake size={64} className="text-gold drop-shadow-lg" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-xl leading-tight font-serif tracking-wide">
            আমার গ্রাম <span className="text-gold">আমার সাহায্য</span>
          </h1>
          
          <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light text-emerald-50 opacity-95 leading-relaxed drop-shadow-md">
            আমাদের গ্রামের উন্নয়নের জন্য একসাথে হাত মিলিয়ে কাজ করি। <br className="hidden md:block"/>
            আপনার দান, আমাদের গ্রামের হাসি।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <a 
              href="#donate" 
              className="group relative px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">অনুদান করুন</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            
            <a 
              href="#projects" 
              className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              প্রকল্প দেখুন
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
