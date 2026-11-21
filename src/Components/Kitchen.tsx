import ServicePage from "@Components/ServicePage/ServicePage";
import hero from "@Assets/stock/kitchen-modern.jpg";
import {
  FeaturesKitchenData,
  HowWeDesignKitchen,
  KitchenProjectData,
  AccordianKitchen,
} from "@Data/Kitchen";

export default function Kitchen() {
  return (
    <ServicePage
      path="/Kitchen"
      name="Kitchen"
      title="Where Culinary Dreams Come True"
      titleAccent="Come True"
      subtitle="Where kitchens become the heart of your home."
      heroImage={hero}
      subject="kitchens"
      features={FeaturesKitchenData}
      process={HowWeDesignKitchen}
      gallery={KitchenProjectData}
      faqs={AccordianKitchen}
    />
  );
}
