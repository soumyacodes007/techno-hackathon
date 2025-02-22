import React from "react";
import HeroSection from "@/components/hero";
import FeatureCards from "@/components/feature-cards";
import HowItWorks from "@/components/how-it-works";
import CTASection from "@/components/cta-section";
import AnimatedTestimonials from "@/components/animated-testimonials";
import AnimatedGridBackground from "@/components/ui/animated-grid-background";
import AnimatedFAQ from "@/components/faq/AnimatedFAQ";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";

export default function LandingPage() {
  return (
    <AnimatedGridBackground containerClassName="min-h-screen">
      <main className="relative">
        {/* Hero Section */}
        <section className="relative">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <HeroSection />
          </AnimatedGridBackground>
        </section>

        {/* Feature Cards Section */}
        <section className="relative py-20">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <div className="container mx-auto px-4 md:px-6 relative">
              <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Experience AI-Powered Career Guidance
              </h2>
              <FeatureCards />
            </div>
          </AnimatedGridBackground>
        </section>

        {/* How It Works Section */}
        <section className="relative py-20">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <HowItWorks />
          </AnimatedGridBackground>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-20">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <AnimatedTestimonials testimonials={testimonials} />
          </AnimatedGridBackground>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <AnimatedFAQ faqs={faqs} />
          </AnimatedGridBackground>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <AnimatedGridBackground
            gridClassName="bg-black/50"
            className="py-10"
          >
            <CTASection />
          </AnimatedGridBackground>
        </section>
      </main>
    </AnimatedGridBackground>
  );
}