
const Skills = () => {
  const technicalSkills = {
    "Languages & Frameworks": ["C# 7.", "ASP.NET 4.8.2", "Python 13", "MVC Pattern","Node.js"],
    "Web Development": ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "jQuery", "AJAX", "React","Tailwind CSS","Ajaxpost","Vite"],
    "APIs & Tools": ["FastAPIs","RESTful APIs", "Postman","Swagger", "Web Client Http methods"],
    "Database": ["MS SQL Server 2019", "SQLite"],
    // "Backend": ["Node.js"]
  };

  const softSkills = [
    "Communication", "Teamwork", "Time Management", "Decision-Making",
    "Adaptability", "Leadership", "Resourcefulness","Active listening","Critical thinking","Problem analysis"
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-orange-500">Technical Skills</h3>
            
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-white">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm border border-slate-600 hover:border-orange-500 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-orange-500">Soft Skills</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="p-3 bg-slate-700/50 rounded-lg text-center border border-slate-600 hover:border-orange-500 transition-colors duration-300"
                >
                  <span className="text-gray-300 text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
