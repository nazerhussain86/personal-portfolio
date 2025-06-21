
const Interests = () => {
  const interests = [
    "Web Application Development",
    "Artificial Intelligence and ML",
    "Database Design and Optimization",
    "MVC Frameworks and Patterns",
    "API Integration and Microservices"
  ];

  return (
    <section id="interests" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Areas of Interest</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {interest}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
