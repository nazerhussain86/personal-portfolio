
const Education = () => {
  const educationData = [
    {
      title: "B.E. Computer Science & Engineering",
      institution: "SRM Valliammai Engineering College (SRM_VEC)",
      grade: "7.096 CGPA",
      period: "2018 - 2021"
    },
    {
      title: "Diploma in Computer Engineering",
      institution: "SRM Polytechnic College (SRM_VPC)",
      grade: "72%",
      period: "2015 - 2018"
    },
    {
      title: "10th Standard",
      institution: "SSLC Board",
      grade: "71.8%",
      period: "2015"
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all duration-300">
              <h3 className="text-lg font-bold text-orange-500 mb-3">{edu.title}</h3>
              <h4 className="text-gray-300 mb-2 text-sm">{edu.institution}</h4>
              <p className="text-gray-400 mb-2">{edu.grade}</p>
              <p className="text-gray-500 text-sm">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
