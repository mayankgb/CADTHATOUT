import { FeaturesCard } from './_components/landing/features';
import { Hero } from './_components/landing/HeroSection';
import { WhatWeDo } from './_components/landing/whatwedosection';
import { PricingSection } from './_components/landing/PricingSection';
import TestimonialSection from './_components/landing/Testimonials';
import { CTA } from './_components/landing/CTA';
import Footer from './_components/landing/footer';

export default function CADThatOut() {

  return (
    <>
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