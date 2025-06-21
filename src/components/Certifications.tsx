
const Certifications = () => {
  const certifications = [
    {
      title: "Python (Zero to Hero)",
      organization: "GUVI Geek Networks (IITM Research Park)",
      date: ""
    },
    {
      title: "Web Development (HTML, CSS & JavaScript)",
      organization: "GUVI Geek Networks (IITM Research Park)",
      date: ""
    },
    {
      title: "Machine Learning (SaWiT AI Challenge)",
      organization: "GUVI Geek Networks (IITM Research Park)",
      date: ""
    },
    {
      title: "Software Engineering",
      organization: "HackerRank",
      date: "Oct 2024"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all duration-300 text-center">
              <h3 className="text-lg font-bold text-orange-500 mb-3">{cert.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{cert.organization}</p>
              {cert.date && <p className="text-gray-500 text-sm">{cert.date}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
