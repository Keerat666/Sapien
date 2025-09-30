import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrendingSection from "@/components/TrendingSection";
import PersonalManagerSection from "@/components/PersonalManagerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main>
        <HeroSection />
        <TrendingSection />
        <PersonalManagerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;