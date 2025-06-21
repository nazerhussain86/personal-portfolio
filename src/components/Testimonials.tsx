
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp Solutions",
      text: "Nazer delivered exceptional full-stack development work. His attention to detail and problem-solving skills are outstanding."
    },
    {
      name: "Michael Chen",
      role: "Senior Developer",
      company: "InnovateLab",
      text: "Working with Nazer was a pleasure. His expertise in C# and React helped us deliver our project ahead of schedule."
    },
    {
      name: "Emily Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      text: "Nazer's database optimization skills significantly improved our application performance. Highly recommended!"
    },
    {
      name: "David Kumar",
      role: "Tech Lead",
      company: "Digital Dynamics",
      text: "His knowledge of modern web technologies and clean coding practices make him an invaluable team member."
    },
    {
      name: "Lisa Thompson",
      role: "Product Owner",
      company: "CloudTech Inc",
      text: "Nazer consistently delivers high-quality code and communicates effectively throughout the development process."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-800/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What People Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        {/* Running testimonials container */}
        <div className="relative">
          <div className="flex animate-scroll">
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 mx-4 bg-slate-700/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-600"
              >
                <div className="mb-4">
                  <div className="flex text-orange-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-orange-500 text-sm">{testimonial.role}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 mx-4 bg-slate-700/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-600"
              >
                <div className="mb-4">
                  <div className="flex text-orange-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-orange-500 text-sm">{testimonial.role}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
