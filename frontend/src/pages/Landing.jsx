import React, { useEffect } from "react";
import Header from "../components/landing/Header.jsx";
import Hero from "../components/landing/Hero.jsx";
import WhyChooseUs from "../components/landing/WhyChooseUs.jsx";
import JoinAsAdvocate from "../components/landing/JoinAsAdvocate.jsx";
import LawyersByCity from "../components/landing/LawyersByCity.jsx";
import Testimonials from "../components/landing/Testimonials.jsx";
import CTA from "../components/landing/CTA.jsx";
import Footer from "../components/landing/Footer.jsx";

const Landing = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <JoinAsAdvocate />
      <WhyChooseUs />
      <LawyersByCity />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
