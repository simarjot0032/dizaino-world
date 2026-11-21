import ServicePage from "@Components/ServicePage/ServicePage";
import ServiceTabs from "@Components/ServicePage/ServiceTabs";
import {
  CommercialInteriorAccordionData,
  CommercialInteriorFeaturesData,
  CommercialInteriorLightBoxData,
  HowWeDesignCommercialInterior,
  Whatwecandesigntabcontent,
} from "@Data/CommercialInterior";

const HERO =
  "https://www.litchfieldbuilders.com/hubfs/Design%20Tips%20To%20Get%20The%20Most%20Out%20Of%20Your%20Commercial%20Interior%20Construction.jpg";

export default function CommercialInterior() {
  return (
    <ServicePage
      path="/CommercialInterior"
      name="Commercial interior"
      title="Reimagine Your Business Interiors"
      titleAccent="Reimagine"
      subtitle="Crafting dynamic environments for success."
      heroImage={HERO}
      subject="commercial interiors"
      features={CommercialInteriorFeaturesData}
      process={HowWeDesignCommercialInterior}
      gallery={CommercialInteriorLightBoxData}
      faqs={CommercialInteriorAccordionData}
    >
      <ServiceTabs
        eyebrow="Sectors"
        title="What more"
        titleAccent="we can design."
        tabs={Whatwecandesigntabcontent}
      />
    </ServicePage>
  );
}
