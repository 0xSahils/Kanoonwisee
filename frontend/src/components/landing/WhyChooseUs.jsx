import React from "react";

const WhyChooseUs = () => {
  const stats = [
    { number: "15,000+", label: "Verified Lawyers", icon: "fas fa-certificate" },
    { number: "50,000+", label: "Cases Resolved", icon: "fas fa-gavel" },
    { number: "98%", label: "Client Satisfaction", icon: "fas fa-heart" },
    { number: "500+", label: "Cities Covered", icon: "fas fa-map-marker-alt" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Kanoonwise?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            India's most trusted legal platform connecting you with verified lawyers and legal experts
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <i className={`${stat.icon} text-primary-600 text-xl`}></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
