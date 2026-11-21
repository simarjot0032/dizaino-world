import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/Theater/hero.webp";
import {
  TheaterFeaturesData,
  HowWeDesignTheater,
  TheaterLightboxData,
  TheaterAccordionData,
} from "@Data/Theater";

export default function Theater() {
  return (
    <ServicePage
      path="/Theater"
      name="Home theater"
      title="Immerse Yourself in Entertainment"
      titleAccent="Entertainment"
      subtitle="Where every scene comes to life."
      heroImage={hero}
      subject="home theaters"
      features={TheaterFeaturesData}
      process={HowWeDesignTheater}
      gallery={TheaterLightboxData}
      faqs={TheaterAccordionData}
    />
  );
}
