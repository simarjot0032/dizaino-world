import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/Washroom/hero.webp";
import {
  FeaturesWashroomData,
  HowwedesingWashroomData,
  WashroomProjects,
  AccordianWashroom,
} from "@Data/Washroom";

export default function Washroom() {
  return (
    <ServicePage
      path="/Washroom"
      name="Washroom"
      title="Elevate Your Daily Rituals"
      titleAccent="Daily Rituals"
      subtitle="Transform your washroom into a sanctuary of refreshment and renewal."
      heroImage={hero}
      subject="washrooms"
      features={FeaturesWashroomData}
      process={HowwedesingWashroomData}
      gallery={WashroomProjects}
      faqs={AccordianWashroom}
    />
  );
}
