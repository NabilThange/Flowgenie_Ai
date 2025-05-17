import Header from "@/components/header"
import HeroGeometric from "@/components/kokonutui/hero-geometric"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import UseCaseSection from "@/components/use-case-section"
import FeaturesSectionDemo from "@/components/features-section-demo-3"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Header />
      <HeroGeometric badge="FlowGenie" title1="FlowGenie makes" title2="n8n easy" />
      <UseCaseSection />
      <FeaturesSectionDemo />
      <div className="px-4 md:px-6 mx-auto max-w-7xl">
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
      </div>
      <Footer />
    </div>
  )
}
