import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      location: "Mumbai",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "Kanoonwise helped me find an excellent lawyer for my property dispute. The process was smooth, and the lawyer was very professional. The platform made it easy to connect with the right expert, and I got the resolution I needed.",
      service: "Property Legal",
    },
    {
      name: "Priya Sharma",
      role: "Entrepreneur",
      location: "Delhi",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "The company registration service was excellent. Everything was handled professionally, and I received all documents on time. The team guided me through every step and made the entire process hassle-free.",
      service: "Business Setup",
    },
    {
      name: "Amit Patel",
      role: "Software Engineer",
      location: "Bangalore",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "I needed urgent legal advice for a family matter. Kanoonwise connected me with a specialist lawyer within minutes. The consultation was very helpful, and the lawyer provided clear guidance on my options.",
      service: "Family Legal",
    },
    {
      name: "Sneha Reddy",
      role: "Startup Founder",
      location: "Hyderabad",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "Outstanding service for trademark registration! The legal team was knowledgeable and efficient. They handled all the paperwork and kept me updated throughout the process. Highly recommend their IP services.",
      service: "Intellectual Property",
    },
    {
      name: "Vikram Singh",
      role: "Restaurant Owner",
      location: "Pune",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content:
        "Kanoonwise made GST registration and compliance so easy for my restaurant business. The tax experts were very helpful and explained everything clearly. Now I can focus on my business without worrying about compliance.",
      service: "Tax & Compliance",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-quote-left text-primary-600"></i>
            <span className="text-primary-600 font-semibold">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from satisfied clients who found the perfect legal
            solutions through our platform.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 lg:p-12 mx-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Content */}
                      <div className="space-y-6">
                        {/* Service Badge */}
                        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className="text-primary-600 font-semibold text-sm">
                            {testimonial.service}
                          </span>
                        </div>

                        {/* Quote */}
                        <div className="relative">
                          <i className="fas fa-quote-left text-4xl text-primary-200 absolute -top-2 -left-2"></i>
                          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed pl-8">
                            {testimonial.content}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i
                              key={i}
                              className="fas fa-star text-yellow-400 text-lg"
                            ></i>
                          ))}
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="text-center lg:text-left">
                        <div className="relative inline-block mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg mx-auto lg:mx-0"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-check text-white text-sm"></i>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 mb-1">
                            {testimonial.role}
                          </p>
                          <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500">
                            <i className="fas fa-map-marker-alt text-sm"></i>
                            <span className="text-sm">
                              {testimonial.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-primary-600 z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-primary-600 z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
              4.9/5
            </div>
            <div className="text-gray-600">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
              10,000+
            </div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
              98%
            </div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
              24/7
            </div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
