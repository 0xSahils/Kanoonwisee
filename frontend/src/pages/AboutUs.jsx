import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const AboutUs = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "[Founder Name]",
      role: "Founder & CEO",
      image: "/team-founder.jpg",
      description:
        "Legal tech entrepreneur with 10+ years of experience in business law and startup ecosystem.",
      linkedin: "#",
    },
    {
      name: "[CTO Name]",
      role: "Chief Technology Officer",
      image: "/team-cto.jpg",
      description:
        "Technology leader with expertise in building scalable platforms and legal tech solutions.",
      linkedin: "#",
    },
    {
      name: "[Legal Head Name]",
      role: "Head of Legal Operations",
      image: "/team-legal-head.jpg",
      description:
        "Senior advocate with 15+ years of experience in corporate law and regulatory compliance.",
      linkedin: "#",
    },
  ];

  const values = [
    {
      icon: "fas fa-shield-alt",
      title: "Trust & Transparency",
      description:
        "We believe in complete transparency in our processes, pricing, and lawyer verification.",
    },
    {
      icon: "fas fa-users",
      title: "Client-Centric Approach",
      description:
        "Every decision we make is focused on providing the best possible experience for our clients.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation",
      description:
        "We continuously innovate to make legal services more accessible and efficient.",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in lawyer verification and service delivery.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Kanoonwise Founded",
      description:
        "Started with a vision to connect businesses with verified legal experts",
    },
    {
      year: "2023",
      title: "First 100 Lawyers",
      description:
        "Onboarded our first 100 verified lawyers across business and tech law",
    },
    {
      year: "2024",
      title: "Business Services Launch",
      description:
        "Launched comprehensive business setup and compliance services",
    },
    {
      year: "2024",
      title: "Kanoonwise Academy",
      description:
        "Introduced educational platform for legal knowledge and insights",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-primary-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-heart text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  💡 Our Story
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  About
                  <span className="text-yellow-400"> Kanoonwise</span>
                  <br />
                  <span className="text-orange-400">Trusted Platform</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Building the trusted platform for vetted legal experts in
                  India. Our mission is to connect businesses and startups with
                  the right legal experts.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-gray-300">Verified Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    1000+
                  </div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">2024</div>
                  <div className="text-sm text-gray-300">Founded</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join Our Mission
                </h3>
                <p className="text-gray-300">
                  Be part of India's most trusted legal platform
                </p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/search-lawyers")}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Find Legal Experts
                </button>
                <button
                  onClick={() => navigate("/join-as-lawyer")}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-white/30"
                >
                  Join as Lawyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                  Our <span className="text-yellow-600">Story</span>
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Kanoonwise was born from a simple observation: too many
                  businesses and startups struggle to find reliable legal
                  counsel who truly understand their needs.
                </p>
                <p>
                  After witnessing countless entrepreneurs navigate legal
                  challenges without proper guidance, our founder realized there
                  had to be a better way. The legal industry needed a platform
                  that prioritized quality over quantity, trust over
                  transactions.
                </p>
                <p>
                  That's why we created the Kanoonwise Verified™ process - a
                  rigorous 3-step verification system that ensures every lawyer
                  on our platform meets the highest standards of expertise and
                  professionalism.
                </p>
                <p>
                  Today, we're not just another legal marketplace. We're your
                  trusted partner in building a legally sound business
                  foundation, connecting you with experts who specialize in
                  business, startup, and tech law.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-yellow-100 rounded-2xl p-8">
                <img
                  src="/about-story.jpg"
                  alt="Kanoonwise Story"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-600 font-semibold">
                  Verified Legal Experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-bullseye text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To democratize access to high-quality legal expertise by
                connecting businesses and startups with verified legal
                professionals who understand their unique challenges and growth
                aspirations.
              </p>
            </div>
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-eye text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become India's most trusted legal platform where every
                business, regardless of size, can access expert legal guidance
                that empowers them to grow with confidence and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="text-yellow-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Kanoonwise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                  <i className={`${value.icon} text-yellow-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Meet Our <span className="text-yellow-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals building the future of legal services
              in India
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-yellow-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    <i className="fab fa-linkedin mr-2"></i>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="text-yellow-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform legal services
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Ready to Work with Verified Legal Experts?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust Kanoonwise for their legal
            needs. Find the right legal expert for your business today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/search-lawyers")}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Find Legal Experts
            </button>
            <button
              onClick={() => navigate("/business-setup")}
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Explore Business Services
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
