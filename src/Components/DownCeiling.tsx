import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/DownCelling/hero.jpg";
import {
  FeaturesDownCeiling,
  HowWeDesignDownCeiling,
  DownCeilingLightboxData,
  DownCeilingAccordianData,
} from "@Data/DownCeiling";

export default function DownCeiling() {
  return (
    <ServicePage
      path="/Down-Ceiling"
      name="False ceiling"
      title="Illuminate Your Space with Down Ceiling Designs"
      titleAccent="Illuminate"
      subtitle="Elevate your ambiance with stylish and functional down ceiling solutions."
      heroImage={hero}
      heroPosition="top"
      subject="ceilings"
      features={FeaturesDownCeiling}
      process={HowWeDesignDownCeiling}
      gallery={DownCeilingLightboxData}
      faqs={DownCeilingAccordianData}
    />
  );
}
