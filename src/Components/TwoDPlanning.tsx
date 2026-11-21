import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/2Dplanning/hero2.jpg";
import {
  TwoDPlanningFeaturesData,
  HowWeDesignTwoDPlanning,
  TwoDPlanningLightboxData,
  TwoDPlanningAccordionData,
} from "@Data/TwoDPlanning";

export default function TwoDPlanning() {
  return (
    <ServicePage
      path="/2d-Planning"
      name="2D planning"
      title="Unlock Your Vision with Precision 2D Planning"
      titleAccent="Precision"
      subtitle="Crafting spatial blueprints for seamless execution."
      heroImage={hero}
      subject="2D plans"
      features={TwoDPlanningFeaturesData}
      process={HowWeDesignTwoDPlanning}
      gallery={TwoDPlanningLightboxData}
      faqs={TwoDPlanningAccordionData}
    />
  );
}
