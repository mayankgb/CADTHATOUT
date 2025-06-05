import { FeaturesCard } from './_components/landing/features';
import { Hero } from './_components/landing/HeroSection';
import { WhatWeDo } from './_components/landing/whatwedosection';
import { PricingSection } from './_components/landing/PricingSection';
import TestimonialSection from './_components/landing/Testimonials';
import { CTA } from './_components/landing/CTA';
import Footer from './_components/landing/footer';

// Custom color palette as CSS variables
const colorStyles = `
  :root {
    --cta-primary: #6315e3;
    --cta-hover: #5214c4;
    --secondary-primary: #9d88b2;
    --light-accent: #fff6ff;
    --dark-primary: #1f1926;
    --white: #ffffff;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --gradient-start: #6315e3;
    --gradient-end: #9d88b2;
  }
`;

export default function CADThatOut() {

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: colorStyles }} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <Hero/>
        {/* Features Section */}
        <WhatWeDo/>
        {/* What We Do Section */}
        <FeaturesCard/>

        {/* Pricing Section */}
        <PricingSection/>
        {/* Testimonials */}
        <TestimonialSection/>
        {/* CTA Section */}
        <CTA/>
        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
};