
import { Mail, Linkedin, Phone } from 'lucide-react';

const Hero = () => {
  const techStack = [
    { name: 'C#', position: { top: '20%', left: '10%' } },
    { name: 'ASP.NET', position: { top: '15%', right: '15%' } },
    { name: 'Python', position: { top: '65%', left: '8%' } },
    { name: 'React', position: { bottom: '25%', right: '12%' } },
    { name: 'JavaScript', position: { bottom: '40%', left: '15%' } },
    { name: 'SQL', position: { bottom: '20%', right: '20%' } },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Floating Tech Stack */}
      {techStack.map((tech, index) => (
        <div
          key={tech.name}
          className="absolute hidden lg:block animate-pulse"
          style={tech.position}
        >
          <div className="bg-slate-700/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-300 border border-slate-600">
            {tech.name}
          </div>
        </div>
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Profile Circle */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-white">Nazer Hussain</div>
                <div className="text-sm text-gray-300">Raheem</div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Nazer Hussain Abdul Raheem
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Full Stack Developer
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="mailto:nazerhussain1999@gmail.com"
            className="p-3 bg-slate-700/50 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="p-3 bg-slate-700/50 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="tel:+918667753339"
            className="p-3 bg-slate-700/50 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <Phone className="w-6 h-6" />
          </a>
        </div>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
        >
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default Hero;
