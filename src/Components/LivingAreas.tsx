import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/generated/home-about.jpg";
import {
  FeaturesLivingAreaData,
  HowWeDesignLivingAreas,
  LivingProjectData,
  AccordianLivingArea,
} from "@Data/Livingarea";

export default function LivingAreas() {
  return (
    <ServicePage
      path="/Living-area"
      name="Living areas"
      title="Elevate Your Living Space"
      titleAccent="Living Space"
      subtitle="Where comfort meets style: redefining living areas with elegance."
      heroImage={hero}
      subject="living areas"
      features={FeaturesLivingAreaData}
      process={HowWeDesignLivingAreas}
      gallery={LivingProjectData}
      faqs={AccordianLivingArea}
    />
  );
}
