import ServicePage from "@Components/ServicePage/ServicePage";
import {
  TerraceGardenFeaturesData,
  HowWeDesignTerraceGarden,
  TerraceGargenLightboxData,
  TerraceGardenAccordionData,
} from "@Data/TerraceGarden";

export default function TerraceGardern() {
  return (
    <ServicePage
      path="/TerraceGarden"
      name="Terrace garden"
      title="Elevate Your Urban Living with Tranquil Terrace Gardens"
      titleAccent="Tranquil"
      subtitle="Transform your rooftop into a verdant haven of serenity and style."
      heroImage="https://www.homelane.com/blog/wp-content/uploads/2021/03/terrace-garden-ideas.jpg"
      subject="terrace gardens"
      features={TerraceGardenFeaturesData}
      process={HowWeDesignTerraceGarden}
      gallery={TerraceGargenLightboxData}
      faqs={TerraceGardenAccordionData}
    />
  );
}
