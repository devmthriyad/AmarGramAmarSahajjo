import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ChevronRight, TrendingUp, Target } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Handle scroll animation for grid
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle modal progress animation
  useEffect(() => {
    if (selectedProject) {
        setModalProgress(0);
        // Small delay to ensure render at 0 before transitioning
        const timer = setTimeout(() => {
            setModalProgress(selectedProject.progress);
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-3">
            আমাদের কার্যক্রম
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            চলমান <span className="text-emerald-600">প্রকল্পসমূহ</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/90 text-emerald-800 font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-emerald-600 hover:text-white flex items-center gap-2"
                    >
                        বিস্তারিত দেখুন <ChevronRight size={16} />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 border border-emerald-400">
                  চলমান
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow relative">
                <h3 
                  className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-1"
                  title={project.title}
                >
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                            <TrendingUp size={12} /> সংগৃহীত
                        </div>
                        <div className="text-emerald-600 font-bold text-lg">
                            ৳{(project.raised / 1000).toLocaleString()}k
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                             লক্ষ্য <Target size={12} />
                        </div>
                        <div className="text-gray-700 font-bold text-lg">
                            ৳{(project.target / 1000).toLocaleString()}k
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{project.progress}% সম্পন্ন</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out relative" 
                          style={{ width: `${isVisible ? project.progress : 0}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors z-20 backdrop-blur"
            >
              <X size={24} />
            </button>
            
            <div className="relative h-64 sm:h-80">
                <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">চলমান প্রকল্প</span>
                    <h3 className="text-2xl sm:text-3xl font-bold">{selectedProject.title}</h3>
                </div>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-semibold">অগ্রগতি</span>
                  <span className="font-bold text-emerald-600">{selectedProject.progress}% সম্পন্ন</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-emerald-500 h-4 rounded-full relative overflow-hidden transition-all duration-1000 ease-out" 
                    style={{ width: `${modalProgress}%` }}
                  >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">সংগৃহীত: <span className="font-bold text-gray-800">৳{selectedProject.raised.toLocaleString()}</span></p>
                  <p className="text-gray-500">মোট লক্ষ্য: <span className="font-bold text-gray-800">৳{selectedProject.target.toLocaleString()}</span></p>
                </div>
              </div>

              <div className="prose prose-emerald max-w-none text-gray-600 mb-8 leading-relaxed">
                <h4 className="text-lg font-bold text-gray-800 mb-2">প্রকল্প সম্পর্কে বিস্তারিত</h4>
                <p>{selectedProject.fullDescription}</p>
              </div>

              <a 
                href="#donate" 
                onClick={() => setSelectedProject(null)}
                className="block w-full text-center bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform active:scale-[0.99]"
              >
                এই প্রকল্পে অনুদান করুন
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;