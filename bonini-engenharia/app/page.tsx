import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main style={{ background: "var(--forest-dark)", overflowX: "hidden" }}>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
