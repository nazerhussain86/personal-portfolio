
const Experience = () => {
  const experiences = [
    {
      title: "Software Developer",
      company: "SCM Cube Technologies - Chennai",
      period: "November 2023 - PRESENT",
      type: "Overseas Clients - Web Application Development",
      achievements: [
        "Developed scalable back-end logic and database interactions using C# and ASP.NET MVC with MS SQL Server, ensuring security and handling a significant number of concurrent users.",
        "Integrated Python executable (.exe) using EasyOCR for accurate document processing, increasing efficiency by 80% and maintaining over 90% data accuracy.",
        "Established seamless data exchange between platforms by linking Python application and C# Web API, reducing manual data entry by 50% and enabling real-time data processing.",
        "Developed custom import/export modules within an ASP.NET MVC application tailored for ERP workflows, achieving a 15% reduction in data processing time for the client's operations.",
        "Developed and implemented an automated email management system to enhance communication efficiency. The system was designed to read incoming emails from a specified mailbox, extract relevant information, and store it in a SQL Server database. Leveraging content analysis, the system processed the sender's query to generate tailored responses. Automated the entire workflow to ensure accurate and timely replies, significantly improving response time and streamlining email handling processes."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-orange-500 mb-2">{exp.title}</h3>
                  <h4 className="text-xl text-gray-300 mb-2">{exp.company}</h4>
                  <p className="text-gray-400 italic mb-4">{exp.type}</p>
                </div>
                <div className="text-gray-400 font-semibold md:text-right">
                  {exp.period}
                </div>
              </div>

              <div className="space-y-3">
                {exp.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
