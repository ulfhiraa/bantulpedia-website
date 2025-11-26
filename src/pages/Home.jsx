import React from 'react';
import Hero from '../components/Hero';
// import WeatherClock from '../components/WeatherClock';
import FeatureSection from '../components/FeatureSection';
import CategorySection from '../components/CategorySection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <WeatherClock /> */}
      <FeatureSection />
      <CategorySection />
      <div className="h-24"></div>
      <CTASection />
      <Footer />
    </>
  );
}
