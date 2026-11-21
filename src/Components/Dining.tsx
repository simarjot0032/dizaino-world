import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/Dining/hero.jpg";
import {
  DiningFeaturesData,
  HowWeDesignDining,
  DiningLightboxData,
  DiningAccordionData,
} from "@Data/Dining";

export default function Dining() {
  return (
    <ServicePage
      path="/Dining"
      name="Dining"
      title="Elevate Every Mealtime Experience"
      titleAccent="Mealtime"
      subtitle="Crafting memories, one bite at a time."
      heroImage={hero}
      subject="dining spaces"
      features={DiningFeaturesData}
      process={HowWeDesignDining}
      gallery={DiningLightboxData}
      faqs={DiningAccordionData}
    />
  );
}
