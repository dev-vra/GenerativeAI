import PageBackground  from "@/components/PageBackground";
import Nav             from "@/components/Nav";
import HeroSection     from "@/components/HeroSection";
import AboutSection    from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection  from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      {/* Fixed full-page background with global zoom-out */}
      <PageBackground />

      {/* Page content — sits above the fixed bg */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
