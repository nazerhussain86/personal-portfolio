
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nazerhussain1999@gmail.com",
      href: "mailto:nazerhussain1999@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8667753339",
      href: "tel:+918667753339"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: "#"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai 603202, India",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl border border-slate-700 text-center">
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              I'm always open to discussing new projects, 
              creative ideas, or opportunities to be part of your 
              visions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-3 sm:space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 group"
                >
                  <div className="p-2 sm:p-3 bg-orange-500 rounded-full group-hover:bg-orange-600 transition-colors duration-300 flex-shrink-0">
                    <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400">{info.label}</p>
                    <p className="text-sm sm:text-base text-white font-medium break-words">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700">
          <p className="text-sm sm:text-base text-gray-400">
            © 2025 Nazer Hussain Abdul Raheem. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
