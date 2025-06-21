
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
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-orange-500/10 rounded-full animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>
      
      {/* Floating Tech Stack with enhanced styling - hidden on mobile */}
      {techStack.map((tech, index) => (
        <div
          key={tech.name}
          className="absolute hidden xl:block animate-bounce"
          style={{
            ...tech.position,
            animationDelay: `${index * 1}s`,
            animationDuration: '10s'
          }}
        >
          <div className="bg-gradient-to-r from-slate-700/70 to-slate-600/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-200 border border-orange-500/30 shadow-lg hover:border-orange-500/60 transition-all duration-300 hover:scale-110">
            {tech.name}
          </div>
        </div>
      ))}

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* Enhanced Profile Picture */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="relative group">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 p-2 animate-pulse shadow-2xl shadow-orange-500/25">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10">
                <img 
                  src="pic.png" 
                  alt="Nazer Hussain Raheem"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-gray-200 to-orange-200 bg-clip-text text-transparent leading-tight">
          Nazer Hussain
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Abdul Raheem
          </span>
        </h1>
        
        <div className="relative mb-8 sm:mb-12">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 sm:mb-4 font-light">
            Full Stack Developer
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Crafting scalable solutions with modern technologies and innovative approaches
          </p>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8 mb-12 sm:mb-16">
          <a
            href="mailto:nazerhussain1999@gmail.com"
            className="group p-3 sm:p-4 bg-slate-700/30 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25 border border-slate-600 hover:border-orange-500"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors duration-300" />
          </a>
          <a
            href="#"
            className="group p-3 sm:p-4 bg-slate-700/30 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25 border border-slate-600 hover:border-orange-500"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors duration-300" />
          </a>
          <a
            href="tel:+918667753339"
            className="group p-3 sm:p-4 bg-slate-700/30 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25 border border-slate-600 hover:border-orange-500"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        {/* Enhanced CTA Button */}
        <div className="relative">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 border border-orange-400/20"
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
