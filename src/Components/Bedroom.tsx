import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/bedroom/hero-section.jpg";
import {
  FeaturesBedroomData,
  Howwedesing,
  BedroomLightHouseData,
  AccordianBedroom,
} from "@Data/Bedroom";

export default function Bedroom() {
  return (
    <ServicePage
      path="/Bedroom"
      name="Bedroom"
      title="Where Dreams Take Shape"
      titleAccent="Take Shape"
      subtitle="Crafting comfort and elegance in your bedroom."
      heroImage={hero}
      subject="bedrooms"
      features={FeaturesBedroomData}
      process={Howwedesing}
      gallery={BedroomLightHouseData}
      faqs={AccordianBedroom}
    />
  );
}
