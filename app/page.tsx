import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import StatsSection from "./components/StatsSection";

import ServicesSection from "./components/ServicesSection";
import ProceduresSection from "./components/ProceduresSection";
import FounderSection from "./components/FounderSection";
import TeamSection from "./components/TeamSection";
import EquipmentSection from "./components/EquipmentSection";
import TeamStarsSection from "./components/TeamStarsSection";
import CTAFormSection from "./components/CTAFormSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <ProceduresSection />
      <FounderSection />
      <TeamSection />
      <EquipmentSection />
      <TeamStarsSection />
      <CTAFormSection />
      <Footer />
    </div>
  );
}
