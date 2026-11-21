import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/ClassicalExterior/hero.jpg";
import {
  ClassicalExteriorFeatures,
  HowWeDesignClassicalExterior,
  ClassicalExteriorLightboxData,
  ClassicalExteriorAccordionData,
} from "@Data/ClassicalExterior";

export default function ClassicalExterior() {
  return (
    <ServicePage
      path="/Classical-Exterior"
      name="Classical exterior"
      title="Timeless Elegance in Every Detail"
      titleAccent="Timeless Elegance"
      subtitle="Crafting architectural masterpieces inspired by classical design."
      heroImage={hero}
      subject="classical exteriors"
      features={ClassicalExteriorFeatures}
      process={HowWeDesignClassicalExterior}
      gallery={ClassicalExteriorLightboxData}
      faqs={ClassicalExteriorAccordionData}
    />
  );
}
