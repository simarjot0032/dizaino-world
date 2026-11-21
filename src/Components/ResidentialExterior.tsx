import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/ResidentialExterior/hero.jpg";
import {
  ResidentialExteriorFeaturesData,
  HowWeDesignResidentialExterior,
  ResidentialExteriorLightboxData,
  ResidentialExteriorAccordionData,
} from "@Data/ResidentialExterior";

export default function ResidentialExterior() {
  return (
    <ServicePage
      path="/Residential-Exterior"
      name="Residential exterior"
      title="Elevate Your Home's Curb Appeal"
      titleAccent="Curb Appeal"
      subtitle="Transform your exterior into a stunning oasis."
      heroImage={hero}
      subject="home exteriors"
      features={ResidentialExteriorFeaturesData}
      process={HowWeDesignResidentialExterior}
      gallery={ResidentialExteriorLightboxData}
      faqs={ResidentialExteriorAccordionData}
    />
  );
}
