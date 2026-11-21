import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@Styles/Home.css";
import Navbar from "@Components/Navbar";
import Footer from "@Components/Footer";
import Hero from "@Components/HomeSections/Hero";
import SpecPanel from "@Components/HomeSections/SpecPanel";
import MissionVision from "@Components/HomeSections/MissionVision";
import Featured from "@Components/HomeSections/Featured";
import Services from "@Components/HomeSections/Services";
import WhyUs from "@Components/HomeSections/WhyUs";
import Gallery from "@Components/HomeSections/Gallery";
import Faq from "@Components/HomeSections/Faq";
import CtaBand from "@Components/HomeSections/CtaBand";

export default function Home() {
  const location = useLocation();

  // Navbar links to "/#about" etc.; scroll to the matching section once rendered.
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <main className="hm">
        <Hero />
        <SpecPanel />
        <MissionVision />
        <Featured />
        <Services />
        <WhyUs />
        <Gallery />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
