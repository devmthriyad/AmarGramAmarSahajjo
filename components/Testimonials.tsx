import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            মানুষের <span className="text-emerald-600">অনুভূতি</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-xl relative hover:shadow-lg transition-shadow">
              <Quote className="absolute top-6 left-6 text-emerald-200 w-10 h-10" />
              <div className="relative z-10 pt-6">
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <span className="text-xs text-emerald-600 font-medium uppercase">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;