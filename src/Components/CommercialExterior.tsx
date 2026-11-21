import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/CommercialExterior/hero.jpeg";
import {
  CommercialExteriorFeaturesData,
  HowWeDesignCommercialExterior,
  CommercialExteriorLightboxData,
  CommercialExteriorAccordionData,
} from "@Data/CommercialExterior";

export default function CommercialExterior() {
  return (
    <ServicePage
      path="/Commercial-Exterior"
      name="Commercial exterior"
      title="Striking Commercial Exteriors"
      titleAccent="Striking"
      subtitle="Transform your business landscape with design excellence."
      heroImage={hero}
      subject="commercial exteriors"
      features={CommercialExteriorFeaturesData}
      process={HowWeDesignCommercialExterior}
      gallery={CommercialExteriorLightboxData}
      faqs={CommercialExteriorAccordionData}
    />
  );
}
