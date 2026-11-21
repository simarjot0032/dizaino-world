import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/Theater/hero.jpg";
import {
  ThreeDPlanningFeaturesData,
  HowWeDesignThreeDPlanning,
  ThreeDPlanningLightboxData,
  ThreeDPlanningAccordionData,
} from "@Data/ThreeDPlanning";

export default function ThreeDPlanning() {
  return (
    <ServicePage
      path="/3D-Planning"
      name="3D planning"
      title="Immersive 3D Planning Solutions"
      titleAccent="Immersive"
      subtitle="Transforming visions into virtual reality."
      heroImage={hero}
      subject="3D plans"
      features={ThreeDPlanningFeaturesData}
      process={HowWeDesignThreeDPlanning}
      gallery={ThreeDPlanningLightboxData}
      faqs={ThreeDPlanningAccordionData}
    />
  );
}
