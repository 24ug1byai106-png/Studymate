import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-blue-500/30">
      <ScrollySection />
      <Projects />
      <Footer />
    </main>
  );
}
